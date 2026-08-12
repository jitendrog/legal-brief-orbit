/**
 * legal-nlp.ts — client-side prototype NLP pipeline.
 *
 * IMPORTANT (academic honesty): the extractive stage below is a real,
 * deterministic statistical algorithm (TF-ISF + legal cue weighting +
 * positional prior). The "abstractive" stage is a RULE-BASED PROTOTYPE
 * compressor, NOT a Transformer. It exists so the interface is ready for a
 * real fine-tuned model (e.g. LegalPegasus / IndicBART) to be plugged into
 * `runPipeline` via an API call. Every surface that renders abstractive or
 * hybrid output must label it as a prototype.
 */

export type Sentence = {
  index: number;
  text: string;
  score: number; // 0..1 relevance
  rank: number; // 1 = most relevant
  selected: boolean;
};

export type LegalMetadata = {
  caseTitle: string | null;
  court: string | null;
  judgmentDate: string | null;
  caseNumber: string | null;
  judges: string[];
  parties: string[];
  sections: string[];
  acts: string[];
};

export type PipelineStats = {
  originalWords: number;
  summaryWords: number;
  originalSentences: number;
  summarySentences: number;
  compressionRatio: number; // 0..1 (summary / original)
  processingMs: number;
};

export type AnalysisResult = {
  sentences: Sentence[];
  extractive: Sentence[];
  abstractive: string;
  hybrid: string;
  metadata: LegalMetadata;
  stats: PipelineStats;
  mode: "prototype";
};

const STOPWORDS = new Set(
  `a an the and or but if then than that this these those of in on at to for with by from as is are was were be been being it its it's he she they them his her their we our you your i not no nor so such shall may can will would could should have has had do does did which who whom whose what when where why how any all each other more most some only own same also into upon under over out up down about against between during before after above below further once here there both few many much very s t don now`.split(
    /\s+/,
  ),
);

/** Terms that carry legal weight in Indian judgments. */
const LEGAL_CUES = [
  "held",
  "holding",
  "judgment",
  "judgement",
  "appeal",
  "appellant",
  "respondent",
  "petitioner",
  "accused",
  "conviction",
  "acquittal",
  "sentence",
  "section",
  "article",
  "act",
  "court",
  "tribunal",
  "high court",
  "supreme court",
  "bench",
  "learned counsel",
  "evidence",
  "witness",
  "trial",
  "order",
  "decree",
  "writ",
  "bail",
  "ipc",
  "crpc",
  "constitution",
  "precedent",
  "ratio",
  "liability",
  "damages",
  "jurisdiction",
  "impugned",
  "allowed",
  "dismissed",
  "set aside",
  "remand",
];

export function segmentSentences(raw: string): string[] {
  const text = raw
    .replace(/\r/g, " ")
    .replace(/\u00a0/g, " ")
    .replace(/\s*\n\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
  if (!text) return [];

  // Protect common legal abbreviations from being treated as sentence ends.
  const protectedText = text.replace(
    /\b(No|Nos|Vs|vs|v|Hon|Hon'ble|Mr|Mrs|Ms|Dr|Smt|Sri|Shri|Ors|Anr|Sec|Art|Cri|Crl|Ltd|Pvt|Govt|Addl|Retd|J|JJ)\./g,
    (m) => m.replace(".", "§DOT§"),
  );

  return protectedText
    .split(/(?<=[.?!])\s+(?=[A-Z0-9"“(])/)
    .map((s) => s.replace(/§DOT§/g, ".").trim())
    .filter((s) => s.split(/\s+/).length >= 5);
}

function tokenize(sentence: string): string[] {
  return sentence
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

function countLegalCues(sentence: string): number {
  const lower = sentence.toLowerCase();
  return LEGAL_CUES.reduce((n, cue) => (lower.includes(cue) ? n + 1 : n), 0);
}

/** TF-ISF scoring with legal-cue and positional priors. */
export function scoreSentences(sentences: string[]): Sentence[] {
  const tokenised = sentences.map(tokenize);
  const df = new Map<string, number>();
  tokenised.forEach((tokens) => {
    new Set(tokens).forEach((t) => df.set(t, (df.get(t) ?? 0) + 1));
  });
  const n = Math.max(sentences.length, 1);

  const raw = tokenised.map((tokens, i) => {
    const tf = new Map<string, number>();
    tokens.forEach((t) => tf.set(t, (tf.get(t) ?? 0) + 1));
    let tfisf = 0;
    tf.forEach((count, term) => {
      const isf = Math.log(n / (1 + (df.get(term) ?? 0)));
      tfisf += (count / Math.max(tokens.length, 1)) * isf;
    });

    const sentence = sentences[i] ?? "";
    const words = sentence.split(/\s+/).length;
    const lengthFactor = words < 10 ? 0.6 : words > 60 ? 0.75 : 1;
    const positional = 1 + 0.25 * Math.exp(-i / Math.max(n * 0.18, 1));
    const closing = i > n * 0.85 ? 1.15 : 1; // operative/ordering paragraphs
    const cueFactor = 1 + Math.min(countLegalCues(sentence), 6) * 0.12;
    const numeric = /\b(19|20)\d{2}\b|section\s+\d+|article\s+\d+/i.test(sentence) ? 1.08 : 1;

    return tfisf * lengthFactor * positional * closing * cueFactor * numeric;
  });

  const max = Math.max(...raw, 0.0001);
  const min = Math.min(...raw, 0);
  const scored = raw.map((value, index) => ({
    index,
    text: sentences[index] ?? "",
    score: Number(((value - min) / Math.max(max - min, 0.0001)).toFixed(4)),
    rank: 0,
    selected: false,
  }));

  [...scored]
    .sort((a, b) => b.score - a.score)
    .forEach((s, i) => {
      const target = scored[s.index];
      if (target) target.rank = i + 1;
    });

  return scored;
}

/** Prototype compressor: trims boilerplate and citation noise from a sentence. */
function compress(sentence: string): string {
  return sentence
    .replace(/\((?:[^()]*?(?:AIR|SCC|SCR|Cri\.?\s?LJ|supra)[^()]*?)\)/gi, "")
    .replace(
      /\b(?:it is (?:pertinent|relevant|important) to (?:note|mention) that|it may be noted that|in view of the (?:aforesaid|above)|as (?:already )?(?:stated|observed) (?:herein)?above|learned counsel (?:for the [a-z]+ )?(?:submitted|contended) that)\b/gi,
      "",
    )
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,;])/g, "$1")
    .replace(/^[,;\s]+/, "")
    .trim();
}

function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Rule-based abstractive-style generation (prototype stand-in for a Transformer). */
export function generateAbstractive(selected: Sentence[]): string {
  if (!selected.length) return "";
  const connectives = [
    "",
    "Further, ",
    "The record further indicates that ",
    "Consequently, ",
    "On the merits, ",
    "In conclusion, ",
  ];
  const parts = selected.slice(0, 6).map((s, i) => {
    const body = compress(s.text);
    const lead = connectives[i] ?? "";
    return lead ? lead + body.charAt(0).toLowerCase() + body.slice(1) : capitalise(body);
  });
  return parts.join(" ").replace(/\s{2,}/g, " ").trim();
}

export function buildHybrid(abstractive: string, selected: Sentence[]): string {
  const anchors = selected.slice(0, 4).map((s) => compress(s.text));
  const narrative = abstractive;
  const preserved = anchors
    .map((a, i) => `${i + 1}. ${a.endsWith(".") ? a : a + "."}`)
    .join("\n");
  return `${narrative}\n\nKey factual and legal anchors preserved from the source document:\n${preserved}`;
}

const RX = {
  court:
    /\b(?:in the )?(supreme court of india|high court of [a-z\s&]+(?: at [a-z\s]+)?|[a-z\s]+high court(?: at [a-z\s]+)?|district (?:and sessions )?court[a-z\s,]*|national company law (?:appellate )?tribunal|[a-z\s]*tribunal)\b/i,
  caseNumber:
    /\b((?:civil|criminal|crl|cri|c\.?a|s\.?l\.?p|w\.?p|writ petition|special leave petition|first appeal|second appeal)[^.\n]{0,40}?no\.?\s*[\d]+\s*(?:of|\/)\s*(?:19|20)\d{2})/i,
  date: /\b(\d{1,2}(?:st|nd|rd|th)?\s+(?:January|February|March|April|May|June|July|August|September|October|November|December),?\s+(?:19|20)\d{2}|\d{1,2}[./-]\d{1,2}[./-](?:19|20)\d{2})\b/,
  title: /([A-Z][A-Za-z.\s&']{2,60}?)\s+(?:vs?\.?|versus)\s+([A-Z][A-Za-z.\s&']{2,60})/,
  judge: /\b(?:Hon'?ble\s+)?(?:Mr\.?|Ms\.?|Mrs\.?)?\s*Justice\s+([A-Z][A-Za-z.\s]{2,40}?)(?=[,.\n]|\s+J\b)/g,
  section: /\bsections?\s+([0-9]+[A-Za-z]?(?:\s*\([0-9a-z]+\))?)/gi,
  article: /\barticles?\s+([0-9]+[A-Za-z]?)/gi,
  act: /\b((?:[A-Z][A-Za-z]+\s+){1,6}Act,?\s*(?:19|20)\d{2})/g,
};

export function extractMetadata(text: string): LegalMetadata {
  const head = text.slice(0, 4000);
  const uniq = (arr: string[]) => Array.from(new Set(arr.map((s) => s.trim()))).filter(Boolean);

  const titleMatch = head.match(RX.title);
  const judges = uniq(Array.from(text.matchAll(RX.judge)).map((m) => m[1] ?? ""));
  const sections = uniq(
    Array.from(text.matchAll(RX.section)).map((m) => `Section ${m[1]}`),
  ).slice(0, 12);
  const articles = uniq(
    Array.from(text.matchAll(RX.article)).map((m) => `Article ${m[1]}`),
  ).slice(0, 8);
  const acts = uniq(Array.from(text.matchAll(RX.act)).map((m) => m[1] ?? "")).slice(0, 8);

  return {
    caseTitle: titleMatch ? `${titleMatch[1]?.trim()} v. ${titleMatch[2]?.trim()}` : null,
    court: head.match(RX.court)?.[1]?.replace(/\s{2,}/g, " ").trim() ?? null,
    judgmentDate: head.match(RX.date)?.[1] ?? text.match(RX.date)?.[1] ?? null,
    caseNumber: text.match(RX.caseNumber)?.[1]?.replace(/\s{2,}/g, " ").trim() ?? null,
    judges: judges.slice(0, 6),
    parties: titleMatch
      ? [titleMatch[1]?.trim() ?? "", titleMatch[2]?.trim() ?? ""].filter(Boolean)
      : [],
    sections: [...sections, ...articles],
    acts,
  };
}

const countWords = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);

export function runPipeline(text: string, ratio = 0.22): AnalysisResult {
  const started = typeof performance !== "undefined" ? performance.now() : Date.now();

  const sentences = segmentSentences(text);
  const scored = scoreSentences(sentences);
  const keep = Math.max(3, Math.min(12, Math.round(sentences.length * ratio)));

  const topRanked = [...scored].sort((a, b) => b.score - a.score).slice(0, keep);
  const selectedIndices = new Set(topRanked.map((s) => s.index));
  scored.forEach((s) => {
    s.selected = selectedIndices.has(s.index);
  });

  const extractive = scored
    .filter((s) => s.selected)
    .sort((a, b) => a.index - b.index)
    .map((s) => ({ ...s }));

  const abstractive = generateAbstractive([...extractive].sort((a, b) => a.rank - b.rank));
  const hybrid = buildHybrid(abstractive, [...extractive].sort((a, b) => a.rank - b.rank));

  const ended = typeof performance !== "undefined" ? performance.now() : Date.now();
  const originalWords = countWords(text);
  const summaryWords = countWords(hybrid);

  return {
    sentences: scored,
    extractive,
    abstractive,
    hybrid,
    metadata: extractMetadata(text),
    stats: {
      originalWords,
      summaryWords,
      originalSentences: sentences.length,
      summarySentences: extractive.length,
      compressionRatio: originalWords ? summaryWords / originalWords : 0,
      processingMs: Math.round(ended - started),
    },
    mode: "prototype",
  };
}

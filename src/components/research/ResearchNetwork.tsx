import { Reveal } from "@/components/shared/Section";
import { Badge } from "@/components/ui/badge";
import {
  BrainCircuit,
  FileSearch,
  Gavel,
  Layers,
  Network,
  ScrollText,
} from "lucide-react";

const TOPICS = [
  {
    icon: Gavel,
    title: "Legal NLP",
    tag: "Domain",
    body: "Judicial text differs sharply from news corpora: long sentences, nested citations, archaic connectives and statutory cross-references that must survive summarization.",
  },
  {
    icon: BrainCircuit,
    title: "Transformer Models",
    tag: "Architecture",
    body: "Self-attention encoder–decoder models (BART, PEGASUS, IndicBART) provide the generative backbone for domain-adapted abstractive summarization.",
  },
  {
    icon: FileSearch,
    title: "Extractive Summarization",
    tag: "Stage I",
    body: "Statistical and graph-based ranking (TF-ISF, TextRank, LexRank) selects sentences verbatim, guaranteeing factual and citational fidelity.",
  },
  {
    icon: ScrollText,
    title: "Abstractive Summarization",
    tag: "Stage II",
    body: "Generation produces novel phrasing with far better readability, at the risk of hallucination — unacceptable on its own in a legal setting.",
  },
  {
    icon: Layers,
    title: "Hybrid Summarization",
    tag: "Proposed",
    body: "Extractive selection constrains the generator's input, bounding hallucination while retaining fluency. This is the contribution of the project.",
  },
  {
    icon: Network,
    title: "Indian Legal Documents",
    tag: "Corpus",
    body: "Supreme Court and High Court judgments, with Indian-English legal register, IPC/CrPC sections and Hon'ble-style honorifics requiring custom tokenisation.",
  },
];

export function ResearchNetwork() {
  return (
    <div className="relative mt-12">
      <div aria-hidden className="hairline absolute inset-x-0 top-0" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TOPICS.map((topic, i) => (
          <Reveal key={topic.title} delay={i * 0.05}>
            <article className="panel h-full p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-10 place-items-center rounded-lg border border-border bg-surface-2">
                  <topic.icon className="size-4 text-primary" aria-hidden />
                </span>
                <Badge variant="outline" className="font-mono text-[10px] tracking-widest">
                  {topic.tag.toUpperCase()}
                </Badge>
              </div>
              <h3 className="mt-5 font-display text-base font-semibold">{topic.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{topic.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

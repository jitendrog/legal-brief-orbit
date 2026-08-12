import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import type { AnalysisResult } from "@/lib/legal-nlp";
import { cn } from "@/lib/utils";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="panel-inset px-4 py-3">
      <p className="text-eyebrow">{label}</p>
      <p className="mt-1 font-display text-lg font-semibold">{value}</p>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)] gap-3 border-b border-border py-2.5 text-sm last:border-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn("min-w-0", value ? "" : "text-muted-foreground/60")}>
        {value || "Not detected in document"}
      </dd>
    </div>
  );
}

export function ResultsPanel({
  result,
  documentName,
  pages,
  onRegenerate,
}: {
  result: AnalysisResult;
  documentName: string;
  pages: number | null;
  onRegenerate: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const { stats, metadata } = result;

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success("Summary copied to clipboard");
  };

  const download = (text: string) => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${documentName.replace(/\.[^.]+$/, "")}-summary.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Summary downloaded");
  };

  return (
    <div className="space-y-6">
      <section className="panel p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-eyebrow">Document overview</p>
            <h2 className="mt-1 truncate font-display text-lg font-semibold">
              {documentName}
            </h2>
          </div>
          <Badge variant="outline" className="font-mono text-[10px] tracking-widest">
            DEMO / PROTOTYPE OUTPUT
          </Badge>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Stat label="Pages" value={pages ? String(pages) : "—"} />
          <Stat label="Original words" value={stats.originalWords.toLocaleString()} />
          <Stat label="Summary words" value={stats.summaryWords.toLocaleString()} />
          <Stat label="Sentences" value={String(stats.originalSentences)} />
          <Stat
            label="Compression"
            value={`${(stats.compressionRatio * 100).toFixed(1)}%`}
          />
          <Stat label="Processing time" value={`${stats.processingMs} ms`} />
        </div>
      </section>

      <Tabs defaultValue="hybrid" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
          <TabsTrigger value="hybrid">Hybrid</TabsTrigger>
          <TabsTrigger value="extractive">Extractive</TabsTrigger>
          <TabsTrigger value="abstractive">Abstractive</TabsTrigger>
          <TabsTrigger value="legal">Legal Info</TabsTrigger>
          <TabsTrigger value="why">Why?</TabsTrigger>
        </TabsList>

        <TabsContent value="hybrid" className="mt-4">
          <section className="panel border-primary/30 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-eyebrow">Primary output</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-primary">
                  Hybrid Legal Summary
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => copy(result.hybrid)}>
                  <Copy className="size-4" aria-hidden /> Copy
                </Button>
                <Button variant="outline" size="sm" onClick={() => download(result.hybrid)}>
                  <Download className="size-4" aria-hidden /> Download
                </Button>
                <Button variant="outline" size="sm" onClick={onRegenerate}>
                  <RefreshCw className="size-4" aria-hidden /> Regenerate
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setExpanded((v) => !v)}>
                  {expanded ? (
                    <>
                      <ChevronUp className="size-4" aria-hidden /> Collapse
                    </>
                  ) : (
                    <>
                      <ChevronDown className="size-4" aria-hidden /> Expand
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["Extractive stage", "Preserves factual and legal content verbatim"],
                ["Abstractive stage", "Produces concise, readable prose"],
                ["Hybrid stage", "Combines preservation with readability"],
              ].map(([t, d]) => (
                <div key={t} className="panel-inset px-4 py-3">
                  <p className="font-display text-sm font-semibold">{t}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>

            <motion.article
              initial={false}
              animate={{ height: expanded ? "auto" : 180 }}
              className="relative mt-5 overflow-hidden rounded-lg border border-border bg-background/60 p-6"
            >
              <p className="whitespace-pre-line text-[15px] leading-[1.85] text-foreground/90">
                {result.hybrid}
              </p>
              {!expanded && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
              )}
            </motion.article>
          </section>
        </TabsContent>

        <TabsContent value="extractive" className="mt-4">
          <section className="panel p-6">
            <p className="text-eyebrow">Stage I</p>
            <h3 className="mt-1 font-display text-lg font-semibold">
              Important Extracted Sentences
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Relevance scores are computed by the statistical ranker in your browser
              (TF-ISF × legal-cue density × positional prior), normalised to 0–100%.
            </p>
            <ol className="mt-6 space-y-3">
              {[...result.extractive]
                .sort((a, b) => a.rank - b.rank)
                .map((s) => (
                  <li key={s.index} className="panel-inset p-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge className="font-mono text-[10px]">RANK {s.rank}</Badge>
                      <span className="font-mono text-[11px] tracking-wider text-muted-foreground">
                        SENTENCE #{s.index + 1}
                      </span>
                      <span className="ml-auto font-mono text-xs text-primary">
                        Relevance: {(s.score * 100).toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={s.score * 100} className="mt-3 h-1" />
                    <p className="mt-3 text-sm leading-relaxed text-foreground/85">{s.text}</p>
                  </li>
                ))}
            </ol>
          </section>
        </TabsContent>

        <TabsContent value="abstractive" className="mt-4">
          <section className="panel p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-eyebrow">Stage II</p>
                <h3 className="mt-1 font-display text-lg font-semibold">
                  AI Generated Summary
                </h3>
              </div>
              <Badge variant="outline" className="font-mono text-[10px] tracking-widest">
                PROTOTYPE GENERATOR
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              This stage is designed to produce a concise representation of the judgment
              using a Transformer-based abstractive model. In this build the generator is a
              deterministic rule-based compressor standing in for the fine-tuned model, so
              the interface can be evaluated before the model service is connected.
            </p>
            <div className="mt-5 flex items-start gap-3 rounded-lg border border-gold/40 bg-gold/5 p-4 text-sm text-muted-foreground">
              <ShieldAlert className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <p>
                Output below is not produced by a trained neural model and must not be cited
                as model output in evaluation.
              </p>
            </div>
            <article className="mt-5 rounded-lg border border-border bg-background/60 p-6">
              <p className="text-[15px] leading-[1.85] text-foreground/90">
                {result.abstractive}
              </p>
            </article>
          </section>
        </TabsContent>

        <TabsContent value="legal" className="mt-4">
          <section className="panel p-6">
            <p className="text-eyebrow">Structured extraction</p>
            <h3 className="mt-1 font-display text-lg font-semibold">Legal Information</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Fields are recovered by pattern matching over the document text. Anything not
              found is reported as missing rather than inferred.
            </p>
            <dl className="mt-5">
              <MetaRow label="Case title" value={metadata.caseTitle} />
              <MetaRow label="Court" value={metadata.court} />
              <MetaRow label="Judgment date" value={metadata.judgmentDate} />
              <MetaRow label="Case number" value={metadata.caseNumber} />
              <MetaRow label="Judges" value={metadata.judges.join(", ")} />
              <MetaRow label="Parties" value={metadata.parties.join("  v.  ")} />
              <MetaRow label="Sections / Articles" value={metadata.sections.join(", ")} />
              <MetaRow label="Acts mentioned" value={metadata.acts.join(", ")} />
            </dl>
          </section>
        </TabsContent>

        <TabsContent value="why" className="mt-4">
          <section className="panel p-6">
            <p className="text-eyebrow">Explainable AI</p>
            <h3 className="mt-1 font-display text-lg font-semibold">Why This Summary?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The document below is shown in full. Highlighted sentences were selected by the
              extractive ranker, passed to the generation stage, and are reflected in the
              final hybrid summary.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px] tracking-widest">
              <Badge className="bg-primary/20 text-primary">SELECTED BY EXTRACTIVE MODEL</Badge>
              <Badge className="bg-chart-3/20 text-chart-3">USED BY ABSTRACTIVE MODEL</Badge>
              <Badge className="bg-gold/20 text-gold">INCLUDED IN FINAL SUMMARY</Badge>
            </div>
            <div className="mt-5 max-h-[32rem] overflow-y-auto rounded-lg border border-border bg-background/60 p-6 text-sm leading-[1.9]">
              {result.sentences.map((s) => (
                <span
                  key={s.index}
                  className={cn(
                    "transition-colors",
                    s.selected
                      ? "rounded bg-primary/15 px-1 py-0.5 text-foreground ring-1 ring-primary/30"
                      : "text-muted-foreground",
                  )}
                  title={s.selected ? `Rank ${s.rank} · relevance ${(s.score * 100).toFixed(0)}%` : undefined}
                >
                  {s.text}{" "}
                </span>
              ))}
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}

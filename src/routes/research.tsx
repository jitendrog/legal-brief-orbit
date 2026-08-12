import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ResearchNetwork } from "@/components/research/ResearchNetwork";
import { Reveal, SectionHeader } from "@/components/shared/Section";
import { Badge } from "@/components/ui/badge";
import { runPipeline } from "@/lib/legal-nlp";
import { SAMPLE_JUDGMENT } from "@/lib/sample-judgment";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research & Evaluation — Legal Summarization Metrics" },
      {
        name: "description",
        content:
          "Evaluation framework for the hybrid legal summarization model: ROUGE-1/2/L, BERTScore, compression ratio and processing time.",
      },
      { property: "og:title", content: "Research & Evaluation — Legal Summarization Metrics" },
      {
        property: "og:description",
        content:
          "ROUGE, BERTScore, compression ratio and runtime — the evaluation plan for the hybrid model.",
      },
    ],
  }),
  component: ResearchPage,
});

const AWAITING = [
  {
    name: "ROUGE-1",
    note: "Unigram overlap with human reference summaries",
  },
  { name: "ROUGE-2", note: "Bigram overlap — measures local fluency retention" },
  { name: "ROUGE-L", note: "Longest common subsequence — structural similarity" },
  { name: "BERTScore", note: "Contextual embedding similarity to the reference" },
];

function MetricCard({ name, note }: { name: string; note: string }) {
  return (
    <article className="panel p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-base font-semibold">{name}</h3>
        <Badge variant="outline" className="shrink-0 font-mono text-[10px] tracking-widest">
          AWAITING DATA
        </Badge>
      </div>
      <p className="mt-4 font-display text-3xl font-semibold text-muted-foreground/50">—</p>
      <p className="mt-3 text-sm text-muted-foreground">{note}</p>
      <p className="mt-4 font-mono text-[11px] tracking-wider text-muted-foreground/70">
        AWAITING EXPERIMENTAL DATA
      </p>
    </article>
  );
}

function ResearchPage() {
  const run = useMemo(() => runPipeline(SAMPLE_JUDGMENT), []);

  const chartData = [
    { label: "Original words", value: run.stats.originalWords },
    { label: "Summary words", value: run.stats.summaryWords },
    { label: "Original sentences", value: run.stats.originalSentences },
    { label: "Selected sentences", value: run.stats.summarySentences },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-eyebrow">Research & Evaluation</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
          Evaluating a hybrid legal summarizer
        </h1>
        <p className="mt-4 text-muted-foreground">
          No experimental results are claimed here. Reference-based metrics require a human
          annotated Indian judgment corpus; until that evaluation is run, these panels stay
          explicitly empty. Measurements that the prototype can compute honestly — compression
          and runtime — are shown as prototype metrics.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="sr-only">Reference-based metrics</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AWAITING.map((m) => (
            <Reveal key={m.name}>
              <MetricCard {...m} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <div className="panel h-full p-6">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-base font-semibold">Measured on sample run</h2>
              <Badge variant="outline" className="font-mono text-[10px] tracking-widest">
                PROTOTYPE METRIC
              </Badge>
            </div>
            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-eyebrow">Compression ratio</dt>
                <dd className="mt-1 font-display text-3xl font-semibold text-primary">
                  {(run.stats.compressionRatio * 100).toFixed(1)}%
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow">Processing time</dt>
                <dd className="mt-1 font-display text-3xl font-semibold">
                  {run.stats.processingMs} ms
                </dd>
              </div>
            </dl>
            <p className="mt-6 text-xs text-muted-foreground">
              Computed live in your browser on the bundled demonstration judgment, using the
              statistical extractive ranker and the rule-based prototype generator.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="panel h-full p-6">
            <h2 className="font-display text-base font-semibold">Sample run composition</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Document volume before and after the hybrid pipeline.
            </p>
            <div className="mt-6 h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ left: -18, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="label"
                    stroke="var(--muted-foreground)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    tickFormatter={(v: string) => v.split(" ")[0] ?? v}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--secondary)" }}
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={i % 2 === 0 ? "var(--chart-1)" : "var(--chart-2)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mt-24">
        <SectionHeader
          eyebrow="Knowledge network"
          title="Foundations of the study"
          align="center"
        />
        <ResearchNetwork />
      </section>
    </div>
  );
}

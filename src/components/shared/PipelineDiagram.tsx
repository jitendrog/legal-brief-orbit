import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type PipelineNode = {
  id: string;
  label: string;
  detail: string;
  stage: "input" | "extract" | "abstract" | "hybrid" | "output";
};

export const PIPELINE_NODES: PipelineNode[] = [
  { id: "pdf", label: "Legal PDF", detail: "Court judgment uploaded by the user", stage: "input" },
  { id: "extract", label: "Text Extraction", detail: "pdf.js layout-aware text layer parsing", stage: "input" },
  { id: "pre", label: "Preprocessing", detail: "Normalisation, de-hyphenation, noise removal", stage: "input" },
  { id: "seg", label: "Sentence Segmentation", detail: "Abbreviation-safe legal sentence splitting", stage: "extract" },
  { id: "ext", label: "Extractive Summarization", detail: "TF-ISF + legal-cue + positional scoring", stage: "extract" },
  { id: "imp", label: "Important Sentences", detail: "Top-ranked, order-restored sentence set", stage: "extract" },
  { id: "abs", label: "Abstractive Transformer", detail: "Sequence-to-sequence generation stage", stage: "abstract" },
  { id: "hyb", label: "Hybrid Integration", detail: "Fluency merged with preserved legal facts", stage: "hybrid" },
  { id: "final", label: "Final Legal Summary", detail: "Validated, readable judicial summary", stage: "output" },
];

const stageColor: Record<PipelineNode["stage"], string> = {
  input: "text-muted-foreground",
  extract: "text-primary",
  abstract: "text-chart-3",
  hybrid: "text-gold",
  output: "text-foreground",
};

export function PipelineDiagram({
  activeIndex = -1,
  className,
}: {
  activeIndex?: number;
  className?: string;
}) {
  return (
    <ol className={cn("relative flex flex-col gap-2", className)}>
      {PIPELINE_NODES.map((node, i) => {
        const done = activeIndex > i;
        const active = activeIndex === i;
        return (
          <li key={node.id} className="relative pl-10">
            {i < PIPELINE_NODES.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "absolute left-[15px] top-9 h-[calc(100%-1rem)] w-px",
                  done || active ? "bg-primary/60" : "bg-border",
                )}
              />
            )}
            <span
              aria-hidden
              className={cn(
                "absolute left-0 top-2.5 grid size-8 place-items-center rounded-md border font-mono text-[11px] transition-colors",
                active
                  ? "border-primary bg-primary/15 text-primary glow-ring"
                  : done
                    ? "border-primary/50 bg-surface-2 text-primary"
                    : "border-border bg-surface-2 text-muted-foreground",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <motion.div
              initial={false}
              animate={{ opacity: activeIndex === -1 || done || active ? 1 : 0.5 }}
              className="rounded-lg px-1 py-2"
            >
              <p className={cn("font-display text-sm font-semibold", stageColor[node.stage])}>
                {node.label}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{node.detail}</p>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}

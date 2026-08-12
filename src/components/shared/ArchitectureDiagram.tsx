import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LAYERS = [
  { label: "User", tone: "muted" },
  { label: "React Frontend", tone: "muted" },
  { label: "Document Upload", tone: "muted" },
  { label: "Text Extraction", tone: "primary" },
  { label: "Preprocessing", tone: "primary" },
  { label: "NLP Pipeline", tone: "primary" },
  { label: "Extractive Model", tone: "primary" },
  { label: "Abstractive Transformer", tone: "violet" },
  { label: "Hybrid Summarization", tone: "gold" },
  { label: "Evaluation", tone: "gold" },
  { label: "Summary Interface", tone: "foreground" },
] as const;

const toneClass: Record<string, string> = {
  muted: "border-border text-muted-foreground",
  primary: "border-primary/40 text-primary",
  violet: "border-chart-3/50 text-chart-3",
  gold: "border-gold/50 text-gold",
  foreground: "border-foreground/40 text-foreground",
};

export function ArchitectureDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("panel p-6 sm:p-8", className)}>
      <p className="text-eyebrow">System architecture</p>
      <ol className="mt-6 flex flex-col items-center">
        {LAYERS.map((layer, i) => (
          <li key={layer.label} className="flex w-full max-w-md flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className={cn(
                "w-full rounded-lg border bg-surface-2 px-4 py-3 text-center font-mono text-xs tracking-wide",
                toneClass[layer.tone],
              )}
            >
              {layer.label.toUpperCase()}
            </motion.div>
            {i < LAYERS.length - 1 && (
              <svg width="2" height="26" aria-hidden className="my-1 overflow-visible">
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="26"
                  stroke="currentColor"
                  className="flow-line text-primary/60"
                  strokeWidth="2"
                />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

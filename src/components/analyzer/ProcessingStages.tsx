import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const STAGES = [
  "Document ingestion",
  "Text extraction",
  "Text preprocessing",
  "Sentence segmentation",
  "Legal content identification",
  "Extractive ranking",
  "Important sentence selection",
  "Abstractive generation",
  "Hybrid integration",
  "Summary validation",
  "Final summary",
] as const;

export function ProcessingStages({ current }: { current: number }) {
  const progress = Math.min(100, Math.round(((current + 1) / STAGES.length) * 100));

  return (
    <section className="panel p-6" aria-live="polite">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-eyebrow">Pipeline running</p>
          <h2 className="mt-1 font-display text-lg font-semibold">
            {STAGES[Math.min(current, STAGES.length - 1)]}
          </h2>
        </div>
        <p className="font-mono text-2xl text-primary">{progress}%</p>
      </div>

      <div className="mt-4 h-1 overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut", duration: 0.4 }}
        />
      </div>

      <ol className="mt-6 space-y-1.5">
        {STAGES.map((stage, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li
              key={stage}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active ? "bg-primary/10 text-foreground" : "text-muted-foreground",
              )}
            >
              <span className="grid size-5 shrink-0 place-items-center">
                {done ? (
                  <Check className="size-4 text-primary" aria-hidden />
                ) : active ? (
                  <Loader2 className="size-4 animate-spin text-primary" aria-hidden />
                ) : (
                  <span className="size-1.5 rounded-full bg-border" aria-hidden />
                )}
              </span>
              <span className="font-mono text-[11px] tracking-wider text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 truncate">{stage}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { Suspense, lazy } from "react";
import { ClientOnly } from "@/components/ClientOnly";
import { Button } from "@/components/ui/button";
import { useLowPower, useReducedMotion } from "@/hooks/use-motion-prefs";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

function SceneFallback() {
  return (
    <div className="absolute inset-0 depth-bg grid-lines" aria-hidden />
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const low = useLowPower();

  return (
    <section className="relative isolate min-h-[92dvh] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <ClientOnly fallback={<SceneFallback />}>
          <Suspense fallback={<SceneFallback />}>
            <HeroScene
              quality={low ? "low" : "high"}
              reducedMotion={reduced}
              offsetX={low ? 0 : 1.5}
            />
          </Suspense>
        </ClientOnly>
      </div>
      {/* Readability scrims: vertical on small screens, left-weighted on desktop. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/75 via-background/55 to-background lg:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden bg-gradient-to-r from-background via-background/85 to-background/10 lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 hidden h-40 bg-gradient-to-t from-background to-transparent lg:block"
      />

      <div className="mx-auto flex min-h-[92dvh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] text-muted-foreground backdrop-blur">
            <Sparkles className="size-3 text-primary" aria-hidden />
            AI • NLP • LEGAL TECHNOLOGY
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.08] text-balance sm:text-5xl lg:text-6xl">
            Transforming Complex Legal Documents into{" "}
            <span className="text-primary">Clear, Intelligent Summaries</span>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            LEXIS·IN applies a hybrid extractive–abstractive Transformer approach to lengthy
            Indian court judgments — ranking the sentences that carry legal weight, then
            generating a concise, readable summary that preserves citations, statutory
            references and the operative order.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link to="/summarize">
                Analyze Legal Document
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/how-it-works">Explore How It Works</Link>
            </Button>
          </div>

          <dl className="mt-14 grid max-w-xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
            {[
              ["Pipeline stages", "11"],
              ["Summarization modes", "3"],
              ["Runs in browser", "Client-side"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-eyebrow">{label}</dt>
                <dd className="mt-1 font-display text-xl font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1 }, y: { repeat: Infinity, duration: 2.4 } }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <ChevronDown className="size-5" />
      </motion.div>
    </section>
  );
}

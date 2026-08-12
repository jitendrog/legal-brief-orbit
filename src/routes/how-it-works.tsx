import { createFileRoute } from "@tanstack/react-router";
import { HowItWorksSteps } from "@/components/home/HowItWorksSteps";
import { PipelineDiagram } from "@/components/shared/PipelineDiagram";
import { ArchitectureDiagram } from "@/components/shared/ArchitectureDiagram";
import { Reveal, SectionHeader } from "@/components/shared/Section";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Hybrid Legal Summarization Pipeline" },
      {
        name: "description",
        content:
          "A stage-by-stage walkthrough of the extractive–abstractive hybrid pipeline: extraction, preprocessing, ranking, generation, integration and validation.",
      },
      { property: "og:title", content: "How It Works — Hybrid Legal Summarization Pipeline" },
      {
        property: "og:description",
        content:
          "Extraction, preprocessing, sentence ranking, Transformer generation, hybrid integration and validation — explained.",
      },
    ],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-eyebrow">Process</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
          How the hybrid summarization pipeline works
        </h1>
        <p className="mt-4 text-muted-foreground">
          Each stage is deterministic, inspectable and independently replaceable — the
          extractive ranker and the generation service can evolve without touching the
          interface contract.
        </p>
      </header>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <HowItWorksSteps />
        <Reveal className="lg:sticky lg:top-24">
          <div className="panel p-6 sm:p-8">
            <p className="text-eyebrow">Data flow</p>
            <PipelineDiagram className="mt-6" />
          </div>
        </Reveal>
      </div>

      <section className="mt-24">
        <SectionHeader
          eyebrow="Architecture"
          title="Layered system design"
          description="The frontend never assumes where inference happens. Swapping the prototype generator for a hosted Transformer service is a single boundary change."
          align="center"
        />
        <Reveal className="mt-12">
          <ArchitectureDiagram />
        </Reveal>
      </section>
    </div>
  );
}

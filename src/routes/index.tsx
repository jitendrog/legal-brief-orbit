import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { HowItWorksSection } from "@/components/home/HowItWorksSteps";
import { PipelineDiagram } from "@/components/shared/PipelineDiagram";
import { ArchitectureDiagram } from "@/components/shared/ArchitectureDiagram";
import { ResearchNetwork } from "@/components/research/ResearchNetwork";
import { Reveal, SectionHeader } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LEXIS·IN — Legal Document Summarization for Indian Courts" },
      {
        name: "description",
        content:
          "A hybrid extractive–abstractive Transformer research platform that turns lengthy Indian court judgments into clear, verifiable legal summaries.",
      },
      {
        property: "og:title",
        content: "LEXIS·IN — Legal Document Summarization for Indian Courts",
      },
      {
        property: "og:description",
        content:
          "Hybrid extractive–abstractive summarization of Indian court judgments, with ranked sentences, legal metadata and explainability.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeader
              eyebrow="AI pipeline"
              title="From a 40-page judgment to a summary you can defend"
              description="Extractive ranking guarantees that facts, citations and statutory references survive. Abstractive generation makes the result readable. The hybrid stage keeps both."
            />
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/summarize">
                    Open the analyzer
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/research">Research & evaluation</Link>
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="panel p-6 sm:p-8">
              <p className="text-eyebrow">Processing graph</p>
              <PipelineDiagram className="mt-6" />
            </div>
          </Reveal>
        </div>
      </section>

      <HowItWorksSection />

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeader
          eyebrow="Academic foundation"
          title="The research behind the system"
          description="Six pillars define the problem space of legal document summarization for Indian courts."
          align="center"
        />
        <ResearchNetwork />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6">
        <SectionHeader
          eyebrow="Architecture"
          title="How the layers fit together"
          align="center"
        />
        <Reveal className="mt-12">
          <ArchitectureDiagram />
        </Reveal>
      </section>
    </>
  );
}

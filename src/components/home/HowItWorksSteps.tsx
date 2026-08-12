import { Reveal, SectionHeader } from "@/components/shared/Section";
import { cn } from "@/lib/utils";

export const STEPS = [
  {
    id: "01",
    title: "Upload",
    body: "A user submits an Indian court judgment as a PDF. File metadata, size and page count are recorded before any processing begins.",
  },
  {
    id: "02",
    title: "Extract",
    body: "The document's text layer is parsed page by page, reconstructing reading order and stripping headers, footers and page furniture.",
  },
  {
    id: "03",
    title: "Understand",
    body: "Legal text is normalised: citation formats, abbreviations such as 'Hon'ble' and 'Crl.', and statutory references are protected from naive tokenisation.",
  },
  {
    id: "04",
    title: "Rank",
    body: "Each sentence is scored using TF-ISF weighting combined with legal-cue term density and a positional prior favouring the facts and the operative order.",
  },
  {
    id: "05",
    title: "Generate",
    body: "The top-ranked sentences condition an abstractive sequence-to-sequence stage that rewrites them into flowing, readable prose.",
  },
  {
    id: "06",
    title: "Validate",
    body: "The generated summary is checked for compression ratio, retained statutory references and factual anchors carried over from the extractive stage.",
  },
  {
    id: "07",
    title: "Present",
    body: "The reader receives a hybrid summary with the supporting evidence trail — ranked sentences, extracted legal metadata and explainability links.",
  },
];

export function HowItWorksSteps({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      {STEPS.map((step, i) => (
        <Reveal key={step.id} delay={i * 0.05}>
          <article className="panel grid gap-4 p-6 sm:grid-cols-[auto_1fr] sm:gap-8">
            <p className="font-mono text-2xl text-primary/70">{step.id}</p>
            <div>
              <h3 className="font-display text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeader
        eyebrow="Process"
        title="Seven stages from raw judgment to readable summary"
        description="Every stage is inspectable. Nothing is presented as a black box."
      />
      <HowItWorksSteps className="mt-12" />
    </section>
  );
}

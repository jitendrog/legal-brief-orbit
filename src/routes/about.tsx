import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Landmark, Users } from "lucide-react";
import { Reveal } from "@/components/shared/Section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Project — Legal Summarization for Indian Courts" },
      {
        name: "description",
        content:
          "B.Tech final-year project on legal document summarization for Indian courts using an extractive–abstractive hybrid Transformer model.",
      },
      { property: "og:title", content: "About the Project — Legal Summarization for Indian Courts" },
      {
        property: "og:description",
        content:
          "Project team, institution and academic context for the hybrid legal summarization research prototype.",
      },
    ],
  }),
  component: AboutPage,
});

const FACTS = [
  {
    icon: Landmark,
    label: "Project",
    value: "Legal Document Summarization for Indian Courts",
    detail: "Extractive–Abstractive Hybrid Transformer Model",
  },
  {
    icon: GraduationCap,
    label: "Degree",
    value: "B.Tech Computer Science & Engineering",
    detail: "Final-year major project",
  },
  {
    icon: Landmark,
    label: "Institution",
    value: "KCC Institute of Technology and Management",
    detail: "Dr. A.P.J. Abdul Kalam Technical University",
  },
  {
    icon: Users,
    label: "Project Guide",
    value: "Dr. Mohd. Wazih Ahmad",
    detail: "Supervision and academic review",
  },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-eyebrow">About</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
          Legal Document Summarization for Indian Courts
        </h1>
        <p className="mt-4 text-muted-foreground">
          Indian court judgments routinely run to tens of thousands of words. Litigants,
          students and even practitioners spend disproportionate time locating the ratio, the
          statutory basis and the operative order. This project studies whether a hybrid
          extractive–abstractive Transformer pipeline can compress such judgments while
          preserving the legal content that makes a summary usable.
        </p>
      </header>

      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        {FACTS.map((fact, i) => (
          <Reveal key={fact.label} delay={i * 0.05}>
            <article className="panel h-full p-6">
              <span className="grid size-10 place-items-center rounded-lg border border-border bg-surface-2">
                <fact.icon className="size-4 text-primary" aria-hidden />
              </span>
              <p className="mt-5 text-eyebrow">{fact.label}</p>
              <h2 className="mt-2 font-display text-base font-semibold">{fact.value}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{fact.detail}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="mt-6">
        <Reveal>
          <div className="panel p-6">
            <p className="text-eyebrow">Project team</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {["Jitendra Kumar", "Om Tiwari"].map((name) => (
                <li key={name} className="panel-inset flex items-center gap-3 px-4 py-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-surface font-display text-sm">
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span className="min-w-0 truncate font-medium">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="mt-6">
        <Reveal>
          <div className="panel p-6">
            <p className="text-eyebrow">Scope and honesty statement</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              This build is a research prototype. The extractive stage implements a real
              statistical ranking algorithm that runs in the browser. The abstractive stage is
              a deterministic rule-based compressor that stands in for a fine-tuned
              Transformer until the model service is connected; it is labelled as such
              everywhere it appears. No ROUGE or BERTScore figures are reported, because no
              reference-annotated evaluation has been run yet. Nothing produced here
              constitutes legal advice.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

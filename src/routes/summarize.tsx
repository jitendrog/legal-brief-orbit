import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { FileSearch } from "lucide-react";
import {
  UploadPanel,
  formatSize,
  type LoadedDocument,
} from "@/components/analyzer/UploadPanel";
import { ProcessingStages, STAGES } from "@/components/analyzer/ProcessingStages";
import { ResultsPanel } from "@/components/analyzer/ResultsPanel";
import { PipelineDiagram } from "@/components/shared/PipelineDiagram";
import { runPipeline, type AnalysisResult } from "@/lib/legal-nlp";
import { SAMPLE_JUDGMENT } from "@/lib/sample-judgment";

export const Route = createFileRoute("/summarize")({
  head: () => ({
    meta: [
      { title: "Document Analyzer — LEXIS·IN Legal AI" },
      {
        name: "description",
        content:
          "Upload an Indian court judgment and run the hybrid extractive–abstractive summarization pipeline entirely in your browser.",
      },
      { property: "og:title", content: "Document Analyzer — LEXIS·IN Legal AI" },
      {
        property: "og:description",
        content:
          "Run the hybrid legal summarization pipeline on a court judgment PDF and inspect every stage.",
      },
    ],
  }),
  component: SummarizePage,
});

function SummarizePage() {
  const [doc, setDoc] = useState<LoadedDocument | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState(-1);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    setResult(null);
    try {
      if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        const text = await file.text();
        setDoc({
          name: file.name,
          sizeLabel: formatSize(file.size),
          pages: null,
          text,
          source: "paste",
        });
        return;
      }
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        setError("Unsupported file type. Please upload a PDF or plain-text judgment.");
        return;
      }
      setBusy(true);
      const { extractPdfText } = await import("@/lib/pdf");
      const { text, pages } = await extractPdfText(file);
      if (!text || text.split(/\s+/).length < 60) {
        setError(
          "No usable text layer was found in this PDF. Scanned documents require OCR, which is not part of this prototype.",
        );
        setBusy(false);
        return;
      }
      setDoc({
        name: file.name,
        sizeLabel: formatSize(file.size),
        pages,
        text,
        source: "pdf",
      });
    } catch (e) {
      console.error(e);
      setError("The document could not be read. Please try a different PDF.");
    } finally {
      setBusy(false);
    }
  }, []);

  const loadSample = useCallback(() => {
    setError(null);
    setResult(null);
    setDoc({
      name: "sample-judgment-demo.txt",
      sizeLabel: formatSize(new Blob([SAMPLE_JUDGMENT]).size),
      pages: 4,
      text: SAMPLE_JUDGMENT,
      source: "sample",
    });
  }, []);

  const analyze = useCallback(() => {
    if (!doc) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setResult(null);
    setBusy(true);
    setStage(0);

    STAGES.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => setStage(i), 260 * i),
      );
    });

    timers.current.push(
      setTimeout(() => {
        try {
          setResult(runPipeline(doc.text));
        } catch (e) {
          console.error(e);
          setError("The pipeline failed on this document.");
        }
        setBusy(false);
        setStage(-1);
      }, 260 * STAGES.length),
    );
  }, [doc]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-eyebrow">Analyzer</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
          Legal Document Analysis Workspace
        </h1>
        <p className="mt-4 text-muted-foreground">
          Upload an Indian court judgment, run the hybrid pipeline, and inspect every
          intermediate artefact — ranked sentences, generated prose, extracted legal metadata
          and the explainability trail.
        </p>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="lg:sticky lg:top-24">
          <UploadPanel
            doc={doc}
            busy={busy}
            error={error}
            onFile={handleFile}
            onSample={loadSample}
            onClear={() => {
              setDoc(null);
              setResult(null);
              setError(null);
            }}
            onAnalyze={analyze}
          />
        </div>

        <div>
          {stage >= 0 ? (
            <ProcessingStages current={stage} />
          ) : result && doc ? (
            <ResultsPanel
              result={result}
              documentName={doc.name}
              pages={doc.pages}
              onRegenerate={analyze}
            />
          ) : (
            <section className="panel p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg border border-border bg-surface-2">
                  <FileSearch className="size-4 text-primary" aria-hidden />
                </span>
                <div>
                  <p className="text-eyebrow">Awaiting input</p>
                  <h2 className="mt-1 font-display text-lg font-semibold">
                    No document analyzed yet
                  </h2>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Load a PDF judgment or the bundled sample document to run the pipeline below.
              </p>
              <PipelineDiagram className="mt-8" />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

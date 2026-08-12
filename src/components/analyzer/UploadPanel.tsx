import { FileText, Sparkles, Trash2, Upload } from "lucide-react";
import { useRef, useState, type DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type LoadedDocument = {
  name: string;
  sizeLabel: string;
  pages: number | null;
  text: string;
  source: "pdf" | "sample" | "paste";
};

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export { formatSize };

export function UploadPanel({
  doc,
  busy,
  error,
  onFile,
  onSample,
  onClear,
  onAnalyze,
}: {
  doc: LoadedDocument | null;
  busy: boolean;
  error: string | null;
  onFile: (file: File) => void;
  onSample: () => void;
  onClear: () => void;
  onAnalyze: () => void;
}) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  return (
    <section className="panel flex flex-col p-6" aria-labelledby="upload-heading">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-eyebrow">Input</p>
          <h2 id="upload-heading" className="mt-1 font-display text-lg font-semibold">
            Legal Document
          </h2>
        </div>
        <Badge variant="outline" className="shrink-0 font-mono text-[10px] tracking-widest">
          PROTOTYPE MODE
        </Badge>
      </div>

      {!doc ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={cn(
            "mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-14 text-center transition-colors",
            dragging ? "border-primary bg-primary/5" : "border-border bg-surface-2/50",
          )}
        >
          <span className="grid size-12 place-items-center rounded-xl border border-border bg-surface">
            <Upload className="size-5 text-primary" aria-hidden />
          </span>
          <p className="mt-5 font-display text-base font-medium">
            Drop your legal document here
          </p>
          <p className="mt-1.5 font-mono text-[11px] tracking-wider text-muted-foreground">
            PDF • INDIAN COURT JUDGMENTS • LEGAL DOCUMENTS
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
              Select file
            </Button>
            <Button variant="ghost" size="sm" onClick={onSample}>
              <Sparkles className="size-4" aria-hidden />
              Load sample judgment
            </Button>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf,.txt"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onFile(file);
              e.target.value = "";
            }}
          />
        </div>
      ) : (
        <div className="mt-6 panel-inset p-5">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-surface">
              <FileText className="size-4 text-primary" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="truncate font-medium">{doc.name}</p>
              <p className="mt-1 font-mono text-[11px] tracking-wider text-muted-foreground">
                {doc.sizeLabel}
                {doc.pages ? ` • ${doc.pages} PAGES` : ""} •{" "}
                {doc.text.trim().split(/\s+/).length.toLocaleString()} WORDS
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Remove document"
              onClick={onClear}
              disabled={busy}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>

          <div className="mt-4 max-h-56 overflow-y-auto rounded-md border border-border bg-background/60 p-4 text-xs leading-relaxed text-muted-foreground">
            {doc.text.slice(0, 1600)}
            {doc.text.length > 1600 ? "…" : ""}
          </div>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {error}
        </p>
      )}

      <Button
        className="mt-6 w-full"
        size="lg"
        disabled={!doc || busy}
        onClick={onAnalyze}
      >
        {busy ? "Analyzing…" : "Analyze Document"}
      </Button>
      <p className="mt-3 text-xs text-muted-foreground">
        Processing runs entirely in your browser. No document leaves this device. The
        abstractive stage is a rule-based prototype standing in for the Transformer model.
      </p>
    </section>
  );
}

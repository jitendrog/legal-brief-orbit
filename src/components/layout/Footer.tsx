import { Link } from "@tanstack/react-router";
import { Scale } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-md border border-border bg-surface-2">
              <Scale className="size-4 text-primary" aria-hidden />
            </span>
            <span className="font-display text-sm font-semibold">LEXIS·IN</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            A research prototype for hybrid extractive–abstractive summarization of Indian
            court judgments. Built as a B.Tech final-year project.
          </p>
          <p className="mt-4 font-mono text-[11px] tracking-wider text-muted-foreground">
            PROTOTYPE BUILD · NO PRODUCTION LEGAL ADVICE
          </p>
        </div>
        <nav className="text-sm">
          <p className="text-eyebrow">Platform</p>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/summarize" className="text-muted-foreground hover:text-foreground">
                Document Analyzer
              </Link>
            </li>
            <li>
              <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground">
                How It Works
              </Link>
            </li>
            <li>
              <Link to="/research" className="text-muted-foreground hover:text-foreground">
                Research & Evaluation
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="text-sm">
          <p className="text-eyebrow">Project</p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-foreground">
                About the Project
              </Link>
            </li>
            <li>KCC Institute of Technology & Management</li>
            <li>Dr. A.P.J. Abdul Kalam Technical University</li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-border py-5 text-center font-mono text-[11px] tracking-wider text-muted-foreground">
        © {new Date().getFullYear()} LEXIS·IN — Jitendra Kumar & Om Tiwari
      </div>
    </footer>
  );
}

import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Scale, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/summarize", label: "Summarize" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/research", label: "Research" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/80 py-2 backdrop-blur-xl"
          : "border-transparent bg-transparent py-4",
      )}
    >
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 lg:grid-cols-[auto_1fr_auto]">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid size-9 shrink-0 place-items-center rounded-md border border-border bg-surface-2">
            <Scale className="size-4 text-primary" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-semibold tracking-tight">
              LEXIS<span className="text-primary">·</span>IN
            </span>
            <span className="block truncate font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
              LEGAL AI RESEARCH
            </span>
          </span>
        </Link>

        <div className="hidden justify-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/summarize">Launch Analyzer</Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="mx-4 mt-3 flex flex-col gap-1 rounded-xl border border-border bg-surface p-2 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground data-[status=active]:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Button asChild size="sm" className="mt-1 sm:hidden">
            <Link to="/summarize">Launch Analyzer</Link>
          </Button>
        </div>
      )}
    </header>
  );
}

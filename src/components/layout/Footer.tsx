"use client";

import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-zinc-800 py-6 sm:py-8 bg-zinc-950/60 backdrop-blur-sm text-zinc-400">
      <div className="container-main flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 ml-1 hidden md:inline">
            Ridho &mdash; Digital Experience Portfolio
          </span>
        </div>

        {/* Copyright + Back to top */}
        <div className="flex items-center gap-3">
          <span className="text-zinc-400">&copy; {new Date().getFullYear()} Ridho</span>
          <span className="text-zinc-600">•</span>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "instant" });
              window.dispatchEvent(new CustomEvent("replay-preloader"));
            }}
            className="inline-flex items-center gap-1 text-zinc-400 hover:text-yellow transition-colors cursor-pointer uppercase tracking-wider"
            title="Replay the Antigravity Preloader"
          >
            <span>Replay Intro</span>
          </button>
          <span className="text-zinc-600">•</span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-yellow uppercase tracking-wider border-b border-yellow hover:text-pink hover:border-pink transition-colors cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}

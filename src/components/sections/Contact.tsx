"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, Copy, Check, Send, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function GithubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ width: "20px", height: "20px", maxWidth: "20px", maxHeight: "20px", flexShrink: 0 }}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ width: "20px", height: "20px", maxWidth: "20px", maxHeight: "20px", flexShrink: 0 }}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ width: "20px", height: "20px", maxWidth: "20px", maxHeight: "20px", flexShrink: 0 }}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ width: "20px", height: "20px", maxWidth: "20px", maxHeight: "20px", flexShrink: 0 }}
    >
      <path d="M4 4l11.733 16h4.267l-11.733-16z" />
      <path d="M4 20l6.768-6.768m2.464-2.464l6.768-6.768" />
    </svg>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "ridhoaddin@gmail.com";

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // Left column reveal
      if (leftColRef.current) {
        gsap.from(leftColRef.current.children, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "transform,opacity",
        });
      }

      // Social cards staggered reveal
      if (socialsRef.current) {
        gsap.from(socialsRef.current.children, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
          y: 20,
          opacity: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "transform,opacity",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopy = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(email).catch(() => {
        fallbackCopy(email);
      });
    } else {
      fallbackCopy(email);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const fallbackCopy = (text: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  };

  const socials = [
    { label: "GitHub", url: "https://github.com/ridhoaddin", desc: "Repositories & Code", icon: GithubIcon },
    { label: "LinkedIn", url: "https://linkedin.com", desc: "Professional Network", icon: LinkedinIcon },
    { label: "Instagram", url: "https://www.instagram.com/rdhoadn_", desc: "Visual Work & Life", icon: InstagramIcon },
    { label: "Twitter / X", url: "https://twitter.com", desc: "Tech Updates & Musings", icon: TwitterIcon },
  ];

  return (
    <section
      ref={sectionRef}
      className="flex-1 flex flex-col justify-center overflow-hidden"
      style={{
        paddingBlock: "clamp(3rem, 6vw, 5rem)",
      }}
    >
      <div ref={contentRef} className="container-main section-depth-target">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-center">
          {/* Left Column: Heading & Email Actions */}
          <div ref={leftColRef} className="lg:col-span-6">
            <h2 className="font-heading font-black uppercase tracking-tight leading-[1.1]" style={{ fontSize: "clamp(1.75rem, 4.5vw, 3rem)" }}>
              Let&apos;s build{" "}
              <span className="inline-block bg-yellow px-2.5 py-0.5 text-black border-2 border-white shadow-[3px_3px_0_#fde047] -rotate-1 transition-transform duration-200 hover:rotate-0 hover:scale-105 cursor-default">
                something
              </span>
              <br />
              together.
            </h2>

            <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed max-w-lg font-medium">
              Have an exciting project, an internship opportunity, or want to discuss 
              modern web technology? My inbox is always open.
            </p>

            {/* Interactive Email Bar */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-2 border-white bg-zinc-900/90 p-3 shadow-[3px_3px_0_#fde047]">
              <div className="flex items-center gap-2 px-1 text-yellow font-mono text-sm font-bold min-w-0">
                <Mail className="h-4 w-4 shrink-0 text-pink" />
                <span className="truncate">{email}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopy}
                  className="neo-btn bg-white px-3 py-1.5 text-xs text-black hover:bg-yellow shrink-0 cursor-pointer shadow-[2px_2px_0_#09090b] transition-all duration-150 active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-green" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${email}`}
                  className="neo-btn group/btn bg-yellow px-3 py-1.5 text-xs text-black shrink-0 no-underline shadow-[2px_2px_0_#09090b] transition-all duration-150"
                >
                  <Send className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  <span>Send Mail</span>
                </a>
              </div>
            </div>

            <div className="mt-3.5 flex items-center gap-2 text-xs font-mono text-gray-400">
              <span className="inline-block h-2 w-2 rounded-full bg-green animate-ping" />
              <span>Typically replies within 24 hours</span>
            </div>
          </div>

          {/* Right Column: Social Links Cards */}
          <div ref={socialsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:col-span-6">
            {socials.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between border-2 border-zinc-700 bg-zinc-900/80 p-4 no-underline transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-1 hover:border-yellow hover:bg-zinc-800 hover:shadow-[3px_3px_0_#fde047]"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex h-9 w-9 items-center justify-center border border-zinc-600 bg-zinc-800 text-yellow group-hover:border-yellow group-hover:bg-yellow group-hover:text-black transition-all duration-200 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-yellow" />
                  </div>

                  <div>
                    <div className="font-heading text-sm font-bold uppercase tracking-wide text-white group-hover:text-yellow transition-colors duration-150">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

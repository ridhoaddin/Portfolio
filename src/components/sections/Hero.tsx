"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Code2, Sparkles, Terminal, Layers, MapPin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);

  // Typewriter effect state for small bio text — Continuous Smooth Looping
  const phrases = [
    "Informatics student & creative web engineer specializing in crafting fast, accessible, and memorable digital products at the intersection of modern engineering and thoughtful design.",
    "Building scalable fullstack architectures with Next.js, TypeScript, React, and Tailwind CSS.",
    "Crafting intuitive user interfaces, design systems, and fluid micro interactions with thoughtful precision.",
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && typedText.length < currentPhrase.length) {
      // Typing forward
      timer = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, typedText.length + 1));
      }, 22);
    } else if (!isDeleting && typedText.length === currentPhrase.length) {
      // Pause at full text before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2600);
    } else if (isDeleting && typedText.length > 0) {
      // Deleting backwards
      timer = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, typedText.length - 1));
      }, 12);
    } else if (isDeleting && typedText.length === 0) {
      // Move to next phrase
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex]);

  // GSAP & ScrollTrigger setup
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // Entrance animations
      if (headlineRef.current) {
        gsap.from(headlineRef.current.children, {
          y: 40,
          opacity: 0,
          rotate: -2,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
      }

      // 2. Availability Pill entrance
      if (pillRef.current) {
        gsap.from(pillRef.current, {
          scale: 0.85,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.6)",
          clearProps: "transform,opacity",
        });
      }

      // 3. CTA & Core Stack entrance
      if (ctaRef.current) {
        gsap.from(ctaRef.current.children, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3,
          clearProps: "transform,opacity",
        });
      }

      if (stackRef.current) {
        gsap.from(stackRef.current, {
          y: 15,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.45,
          clearProps: "transform,opacity",
        });
      }

      // 4. Profile Card entrance
      if (profileCardRef.current) {
        gsap.from(profileCardRef.current, {
          x: 35,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex-1 flex flex-col justify-center"
      style={{ paddingBlock: "clamp(2.5rem, 5vw, 4rem)" }}
    >
      {/* Subtle Dot Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#09090b 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container-main relative z-10 section-depth-target">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          {/* LEFT COLUMN: Headline & Bio */}
          <div className="flex flex-col gap-5">
            {/* Availability Pill */}
            <div
              ref={pillRef}
              className="inline-flex items-center gap-2 self-start rounded-full border-2 border-border bg-white px-3.5 py-1.5 shadow-[2px_2px_0_#09090b] transition-transform duration-200 hover:scale-105"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green" />
              </span>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-black">
                Available for Projects &amp; Internships
              </span>
            </div>

            {/* Main Headline with ScrollTrigger animation */}
            <h1
              ref={headlineRef}
              className="font-heading font-black uppercase leading-[1.08] tracking-tight text-black"
              style={{ fontSize: "clamp(1.85rem, 5vw, 3.25rem)" }}
            >
              <span className="inline-block">
                Hello, I&apos;m{" "}
                <span className="inline-block border-2 border-border bg-yellow px-2 py-0.5 shadow-[3px_3px_0_#09090b] -rotate-1 transition-transform duration-200 hover:rotate-0 hover:scale-105 cursor-default">
                  Ridho.
                </span>
              </span>
              <br />
              <span className="inline-block mt-1">
                I build{" "}
                <span className="inline-block border-2 border-border bg-pink px-2 py-0.5 shadow-[3px_3px_0_#09090b] rotate-1 transition-transform duration-200 hover:rotate-0 hover:scale-105 cursor-default">
                  digital
                </span>{" "}
                experiences.
              </span>
            </h1>

            {/* Sub-headline with Continuous Looping Typewriter Animation */}
            <p className="min-h-[76px] sm:min-h-[84px] max-w-lg text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
              <span>{typedText}</span>
              <span className="inline-block w-2 h-4 ml-1 bg-yellow border border-black animate-pulse align-middle" />
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#projects"
                className="neo-btn group bg-black px-5 py-2.5 sm:py-3 text-xs sm:text-sm text-white no-underline shadow-[3px_3px_0_#09090b]"
              >
                <span>Explore Projects</span>
                <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-1" />
              </a>
              <a
                href="#contact"
                className="neo-btn group bg-white px-5 py-2.5 sm:py-3 text-xs sm:text-sm text-black no-underline hover:bg-yellow shadow-[3px_3px_0_#09090b]"
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Core Stack Badges */}
            <div ref={stackRef} className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold text-text-secondary">
              <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-black">
                Core Stack:
              </span>
              {["Next.js", "TypeScript", "Tailwind CSS", "React", "Node.js", "Laravel", "Filament", "Php", "MySQL", "Python", "Git"].map((tech) => (
                <span
                  key={tech}
                  className="border border-border bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-black shadow-[1px_1px_0_#09090b] transition-all duration-150 hover:bg-black hover:text-white hover:scale-105 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Terminal Developer Card with Full Photo */}
          <div ref={profileCardRef} className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] group/card">
              {/* Neo-brutalist Offset Layer */}
              <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 border-2 border-border bg-yellow transition-transform duration-200 group-hover/card:translate-x-3.5 group-hover/card:translate-y-3.5" />

              {/* Main Profile Terminal Card */}
              <div className="relative border-2 border-border bg-white p-4 sm:p-5 shadow-sm transition-transform duration-200 group-hover/card:-translate-x-0.5 group-hover/card:-translate-y-0.5">
                {/* Floating Creative Badge at Top-Right */}
                <a
                  href="#about"
                  className="animate-gentle-float absolute -top-3.5 -right-3.5 flex items-center gap-1 border-2 border-border bg-pink px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-black shadow-[2px_2px_0_#09090b] rotate-2 z-20 transition-transform duration-200 hover:rotate-6 hover:scale-110 cursor-pointer no-underline"
                  title="Learn more about Ridho"
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>UI Craftsman</span>
                </a>

                {/* Window Header */}
                <div className="mb-3 flex items-center justify-between border-b-2 border-border pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full border border-border bg-red-400 transition-transform hover:scale-125 cursor-pointer" />
                    <span className="h-3 w-3 rounded-full border border-border bg-yellow transition-transform hover:scale-125 cursor-pointer" />
                    <span className="h-3 w-3 rounded-full border border-border bg-green transition-transform hover:scale-125 cursor-pointer" />
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[11px] font-bold text-text-secondary">
                    <Terminal className="h-3.5 w-3.5 text-black" />
                    <span>ridho.dev</span>
                  </div>
                </div>

                {/* FULL-FRAME PROFILE PHOTO DISPLAY AREA */}
                <div className="relative mb-3.5 overflow-hidden border-2 border-border bg-black group/profile h-[280px] sm:h-[300px]">
                  {/* Full image covering entire container without black borders */}
                  <Image
                    src="/profile.jpg"
                    alt="Ridho Addin"
                    fill
                    priority
                    className="object-cover object-center transition-transform duration-500 group-hover/profile:scale-105"
                    sizes="(max-width: 640px) 340px, 380px"
                  />

                  {/* Gradient bottom overlay with name & titles */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 pt-12 text-white">
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <div className="font-heading text-lg sm:text-xl font-black tracking-wider uppercase text-white drop-shadow-sm">
                          Ridho Addin
                        </div>
                        <div className="mt-0.5 flex items-center gap-1 font-mono text-xs text-yellow font-bold">
                          <Code2 className="h-3.5 w-3.5" />
                          <span>Fullstack &amp; UI Engineer</span>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1 border border-white/20 bg-black/60 backdrop-blur-sm px-2 py-0.5 font-mono text-[10px] text-gray-300">
                        <MapPin className="h-3 w-3 text-pink" />
                        <span>Jakarta, ID</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Meta Stats Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="border-2 border-border bg-[#f7f4ef] p-2.5 text-center transition-all duration-150 hover:bg-yellow hover:scale-105 cursor-default">
                    <div className="font-heading text-xl font-black text-black">
                      1+
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Years Coding
                    </div>
                  </div>
                  <div className="border-2 border-border bg-[#f7f4ef] p-2.5 text-center transition-all duration-150 hover:bg-green hover:scale-105 cursor-default">
                    <div className="font-heading text-xl font-black text-black">
                      12+
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                      Projects Built
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { PreloaderProps } from "./preloader.types";

const HELLO_LANGUAGES = [
  "Hello",
  "Bonjour",
  "Hola",
  "Hallo",
  "Ciao",
  "Olá",
  "こんにちは",
  "안녕하세요",
  "你好",
  "Привет",
  "नमस्ते",
  "Halo",
];

export function AntigravityPreloader({
  onComplete,
  durationMs = 3000,
}: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const helloRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const finish = useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      document.body.style.overflow = "";
      setIsFinished(true);
      onComplete?.();
      window.dispatchEvent(new CustomEvent("preloader-finished"));
      return;
    }

    container.style.pointerEvents = "none";

    gsap.to(container, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        document.body.style.overflow = "";
        setIsFinished(true);
        onComplete?.();
        window.dispatchEvent(new CustomEvent("preloader-finished"));
      },
    });
  }, [onComplete]);

  useEffect(() => {
    if (isFinished) return;

    const container = containerRef.current;
    const hello = helloRef.current;

    if (!container || !hello) return;

    // Lock scrolling
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    container.style.pointerEvents = "auto";
    container.style.display = "flex";

    let destroyed = false;

    hello.textContent = HELLO_LANGUAGES[0];

    gsap.set(container, { opacity: 1 });
    gsap.set(hello, {
      opacity: 0,
      y: 20,
      scale: 0.96,
      filter: "blur(12px)",
    });

    const timeline = gsap.timeline({
      onComplete: () => {
        if (destroyed) return;
        finish();
      },
    });

    timelineRef.current = timeline;

    // FIRST HELLO
    timeline.to(hello, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.5,
      ease: "power3.out",
    });

    // Snappy language transitions
    HELLO_LANGUAGES.slice(1).forEach((language) => {
      timeline.to(hello, {
        duration: 0.16,
      });

      timeline.to(hello, {
        opacity: 0,
        y: -8,
        scale: 0.985,
        filter: "blur(9px)",
        duration: 0.12,
        ease: "power2.inOut",
        onComplete: () => {
          if (!destroyed) {
            hello.textContent = language;
          }
        },
      });

      timeline.fromTo(
        hello,
        {
          opacity: 0,
          y: 8,
          scale: 1.015,
          filter: "blur(9px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.14,
          ease: "power3.out",
        }
      );
    });

    // Final hold
    timeline.to(hello, {
      duration: 0.3,
    });

    // Final hello exit
    timeline.to(hello, {
      opacity: 0,
      scale: 1.04,
      filter: "blur(16px)",
      duration: 0.4,
      ease: "power3.inOut",
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        timeline.kill();
        finish();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      destroyed = true;
      timeline.kill();
      gsap.killTweensOf(hello);
      gsap.killTweensOf(container);
      document.body.style.overflow = previousOverflow || "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [finish, isFinished]);

  useEffect(() => {
    const handleReplay = () => {
      setIsFinished(false);
    };

    window.addEventListener("replay-preloader", handleReplay);
    return () => {
      window.removeEventListener("replay-preloader", handleReplay);
    };
  }, []);

  if (isFinished) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      id="antigravity-preloader"
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        overflow-hidden
        select-none
        bg-[#F4E743]
        text-black
      "
    >
      {/* Subtle brutalist grid */}
      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-[0.06]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              #000 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              #000 1px,
              transparent 1px
            )
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Skip Button */}
      <button
        onClick={() => {
          timelineRef.current?.kill();
          finish();
        }}
        className="
          absolute
          top-5
          right-5
          z-20
          px-3
          py-1.5
          text-xs
          font-bold
          uppercase
          tracking-wider
          border-2
          border-black
          bg-white
          text-black
          shadow-[2px_2px_0_#000]
          hover:bg-black
          hover:text-white
          transition-colors
          cursor-pointer
        "
        title="Skip intro"
      >
        Skip
      </button>

      {/* Hello */}
      <div
        ref={helloRef}
        className="
          relative
          z-10
          px-5
          text-center
          font-black
          leading-none
          tracking-[-0.075em]
          text-[clamp(72px,17vw,250px)]
          will-change-transform
        "
      >
        Hello
      </div>
    </div>
  );
}
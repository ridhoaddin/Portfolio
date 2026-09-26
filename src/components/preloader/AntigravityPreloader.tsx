"use client";

import { useEffect, useRef } from "react";
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
  durationMs = 9000,
}: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const helloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const hello = helloRef.current;

    if (!container || !hello) return;

    // Lock scrolling
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let destroyed = false;

    /*
     * ==========================================
     * INITIAL STATE
     * ==========================================
     */

    hello.textContent = HELLO_LANGUAGES[0];

    gsap.set(container, {
      opacity: 1,
    });

    gsap.set(hello, {
      opacity: 0,
      y: 20,
      scale: 0.96,
      filter: "blur(12px)",
    });

    /*
     * ==========================================
     * MAIN TIMELINE
     * ==========================================
     */

    const timeline = gsap.timeline({
      onComplete: () => {
        if (destroyed) return;

        gsap.to(container, {
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",

          onComplete: () => {
            if (destroyed) return;

            document.body.style.overflow =
              previousOverflow;

            onComplete?.();

            window.dispatchEvent(
              new CustomEvent("preloader-finished")
            );
          },
        });
      },
    });

    /*
     * ==========================================
     * FIRST HELLO
     * ==========================================
     */

    timeline.to(hello, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.7,
      ease: "power3.out",
    });

    /*
     * ==========================================
     * LANGUAGE SEQUENCE
     * ==========================================
     *
     * Setiap bahasa:
     *
     * 0.35s → tampil
     * 0.22s → transisi keluar
     * 0.28s → transisi masuk
     *
     * Total sekitar 8-9 detik.
     */

    HELLO_LANGUAGES.slice(1).forEach((language) => {
      // Hold bahasa sebelumnya
      timeline.to(hello, {
        duration: 0.32,
      });

      // Fade + blur keluar
      timeline.to(hello, {
        opacity: 0,
        y: -8,
        scale: 0.985,
        filter: "blur(9px)",
        duration: 0.22,
        ease: "power2.inOut",

        onComplete: () => {
          if (!destroyed) {
            hello.textContent = language;
          }
        },
      });

      // Bahasa baru masuk
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
          duration: 0.28,
          ease: "power3.out",
        }
      );
    });

    /*
     * ==========================================
     * FINAL HOLD
     * ==========================================
     */

    timeline.to(hello, {
      duration: 0.6,
    });

    /*
     * ==========================================
     * FINAL HELLO EXIT
     * ==========================================
     */

    timeline.to(hello, {
      opacity: 0,
      scale: 1.04,
      filter: "blur(16px)",
      duration: 0.6,
      ease: "power3.inOut",
    });

    /*
     * ==========================================
     * REPLAY SUPPORT
     * ==========================================
     */

    const handleReplay = () => {
      timeline.restart();
    };

    window.addEventListener(
      "replay-preloader",
      handleReplay
    );

    /*
     * ==========================================
     * CLEANUP
     * ==========================================
     */

    return () => {
      destroyed = true;

      timeline.kill();

      gsap.killTweensOf(hello);
      gsap.killTweensOf(container);

      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "replay-preloader",
        handleReplay
      );
    };
  }, [onComplete]);

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
"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function getElementDocumentTop(element: HTMLElement): number {
  const navHeight = 64;
  const rect = element.getBoundingClientRect();
  return Math.max(0, rect.top + window.scrollY - navHeight);
}

export function SmoothScroll() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") {
        if (href === "#") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      const element = document.querySelector<HTMLElement>(href);
      if (element) {
        e.preventDefault();
        
        // Refresh ScrollTrigger to ensure accurate layout calculations
        if (typeof ScrollTrigger !== "undefined") {
          ScrollTrigger.refresh();
        }

        const offsetPosition = getElementDocumentTop(element);

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Update URL hash without jumping
        window.history.pushState(null, "", href);
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return null;
}

import { useEffect } from "react";

// Elements that animate in as they scroll into view, with the direction they come from.
const REVEAL_TARGETS = [
  [".hero-copy > *", "up"],
  [".hero-product", "right"],
  [".section-heading", "up"],
  [".category-heading", "left"],
  [".product-card", "up"],
  [".view-all-link", "up"],
  [".story-copy", "left"],
  [".story-photo", "zoom"],
  [".ingredient-card", "up"],
  [".story-quote", "right"],
  [".review-wrap", "zoom"],
  [".contact > *", "up"],
  [".brand-story > *", "up"],
  [".story-body > *", "up"],
  [".footer-brand, .footer-col", "up"],
];

const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 5;

export function useScrollReveal() {
  useEffect(() => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const scan = () => {
      for (const [selector, direction] of REVEAL_TARGETS) {
        document.querySelectorAll(selector).forEach((el) => {
          if (el.classList.contains("reveal")) return;

          // Stagger siblings so grids cascade in instead of popping at once.
          const siblings = [...el.parentElement.children].filter((child) =>
            child.matches(selector)
          );
          const step = Math.min(siblings.indexOf(el), MAX_STAGGER_STEPS);

          el.style.setProperty("--reveal-delay", `${step * STAGGER_MS}ms`);
          el.classList.add("reveal", `reveal-${direction}`);
          observer.observe(el);
        });
      }
    };

    scan();

    // Pick up content rendered later: screen changes, search results, expanded story.
    let frame = 0;
    const mutations = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);
}

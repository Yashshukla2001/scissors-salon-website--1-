import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives the whole site's smooth scroll and keeps GSAP ScrollTrigger
 * in sync with it. Mounted once at the App root.
 *
 * Nested scrollable regions (modals, dropdowns, etc.) should NOT be
 * paused via lenis.stop() — that risks Lenis's own wheel listener still
 * swallowing the event via preventDefault, blocking their scroll too.
 * Mark them with the `data-lenis-prevent` attribute instead: Lenis's own
 * documented mechanism for letting an element scroll natively while the
 * rest of the page stays under its control.
 */
export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Must happen before Lenis reads the scroll position, and before the
    // browser has a chance to restore a previous position on reload.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    // Lenis drives scroll from its own internally tracked position, not
    // purely from native window.scrollTo — force its own target to 0 too,
    // or it can snap back to whatever position it read on construction.
    lenis.scrollTo(0, { immediate: true, force: true });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}

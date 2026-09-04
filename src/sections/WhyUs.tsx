import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { differentiators } from "@/config/content";

const HOLD_MS = 4000;
const COUNT = differentiators.length;

export default function WhyUs() {
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      if (!pausedRef.current) setActive((a) => (a + 1) % COUNT);
    }, HOLD_MS);
    return () => clearInterval(interval);
  }, []);

  function goTo(i: number) {
    setActive(((i % COUNT) + COUNT) % COUNT);
  }

  const item = differentiators[active];

  return (
    <section className="relative bg-charcoal py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <SectionHeading eyebrow="Why Scissor's" title="Reasons clients keep coming back." align="center" />
      </div>

      <div
        className="relative max-w-sm mx-auto mt-14 flex items-center justify-center gap-3 sm:gap-5"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        <button
          onClick={() => goTo(active - 1)}
          aria-label="Previous"
          className="shrink-0 w-9 h-9 rounded-full border border-champagne/25 text-champagne/70 flex items-center justify-center hover:border-champagne hover:text-champagne transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="relative w-full h-[220px] sm:h-[230px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center rounded-2xl border border-champagne/20 bg-charcoal-2 px-6 sm:px-8 py-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
              <span className="font-display text-champagne/50 text-xs">
                {String(active + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl mt-3 mb-2.5 text-ivory">{item.title}</h3>
              <p className="text-ivory/60 font-sans text-sm leading-relaxed max-w-xs">{item.body}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => goTo(active + 1)}
          aria-label="Next"
          className="shrink-0 w-9 h-9 rounded-full border border-champagne/25 text-champagne/70 flex items-center justify-center hover:border-champagne hover:text-champagne transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 mt-7">
        {differentiators.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Show reason ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-champagne" : "w-1.5 bg-champagne/25"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

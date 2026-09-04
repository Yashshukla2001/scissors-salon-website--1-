import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCw, ArrowUp } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { faqs } from "@/config/content";

const HOLD_MS = 2000;

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const pausedRef = useRef(false);

  function goTo(i: number) {
    setActiveIndex(((i % faqs.length) + faqs.length) % faqs.length);
    setFlipped(false);
  }

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      if (!pausedRef.current && !flipped) goTo(activeIndex + 1);
    }, HOLD_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, flipped]);

  const item = faqs[activeIndex];

  return (
    <section className="relative bg-ivory text-charcoal py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-5 sm:px-10">
        <SectionHeading eyebrow="Good To Know" title="Frequently asked questions." tone="dark" align="center" />

        <div
          className="relative mt-16 max-w-md mx-auto h-[300px] sm:h-[320px]"
          style={{ perspective: "1400px" }}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          {/* Peeking stack behind the active card — a quiet "there's more" cue */}
          <div className="absolute inset-x-4 top-4 bottom-0 rounded-[1.75rem] border border-charcoal/10 bg-white/70 -rotate-1" />
          <div className="absolute inset-x-2 top-2 bottom-0 rounded-[1.75rem] border border-charcoal/10 bg-white/85 rotate-1" />

          {/* Active, flippable card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                onClick={() => setFlipped((f) => !f)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setFlipped((f) => !f);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Tap to reveal the answer"
                className="relative w-full h-full cursor-pointer transition-transform duration-[650ms]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
                }}
              >
                {/* Front — the question */}
                <div
                  className="absolute inset-0 rounded-[1.75rem] border border-charcoal/15 bg-white shadow-[0_20px_45px_rgba(0,0,0,0.1)] p-8 sm:p-10 flex flex-col justify-center"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span className="eyebrow text-wine/70">Question {activeIndex + 1}</span>
                  <h3 className="font-display text-2xl sm:text-3xl leading-tight mt-3">{item.q}</h3>
                  <span className="absolute bottom-6 right-6 flex items-center gap-1.5 text-charcoal/35 text-xs font-sans">
                    <RotateCw size={13} /> Tap to reveal
                  </span>
                </div>

                {/* Back — the answer */}
                <div
                  className="absolute inset-0 rounded-[1.75rem] border border-wine/20 bg-charcoal text-ivory shadow-[0_20px_45px_rgba(0,0,0,0.25)] p-8 sm:p-10 flex flex-col justify-center"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <span className="eyebrow text-champagne/70">The Answer</span>
                  <p className="font-sans text-base sm:text-lg leading-relaxed mt-3 text-ivory/85">{item.a}</p>
                  <span className="absolute bottom-6 right-6 flex items-center gap-1.5 text-ivory/35 text-xs font-sans">
                    <RotateCw size={13} /> Tap to flip back
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation: dots to jump directly, Next to advance */}
        <div className="flex flex-col items-center gap-6 mt-8">
          <div className="flex items-center gap-2">
            {faqs.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Show question ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 bg-wine" : "w-1.5 bg-charcoal/20"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => goTo(activeIndex + 1)}
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 text-charcoal/70 font-sans font-semibold text-sm px-5 py-2.5 hover:border-wine hover:text-wine transition-colors"
          >
            Next Question <ArrowUp size={14} className="rotate-90" />
          </button>
        </div>
      </div>
    </section>
  );
}

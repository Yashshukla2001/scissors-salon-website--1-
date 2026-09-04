import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { transformationLooks } from "@/config/content";

const HOLD_MS = 4000;
const COUNT = transformationLooks.length;

function circularDiff(i: number, active: number, count: number) {
  let diff = i - active;
  if (diff > count / 2) diff -= count;
  if (diff < -count / 2) diff += count;
  return diff;
}

export default function Transformation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pausedRef = useRef(false);
  const activeIndexRef = useRef(0);
  const touchStartX = useRef<number | null>(null);

  function goTo(i: number) {
    const next = ((i % COUNT) + COUNT) % COUNT;
    activeIndexRef.current = next;
    setActiveIndex(next);
  }

  // ---- Autoscroll: steps to the next card on its own timer ----
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      if (!pausedRef.current) goTo(activeIndexRef.current + 1);
    }, HOLD_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    pausedRef.current = true;
  }
  function onTouchEnd(e: React.TouchEvent) {
    const start = touchStartX.current;
    pausedRef.current = false;
    if (start === null) return;
    const delta = e.changedTouches[0].clientX - start;
    if (delta > 40) goTo(activeIndexRef.current - 1);
    else if (delta < -40) goTo(activeIndexRef.current + 1);
    touchStartX.current = null;
  }

  const active = transformationLooks[activeIndex];

  return (
    <section className="relative bg-charcoal py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <SectionHeading eyebrow="Signature Looks" title="Six looks, one at a time." />
      </div>

      <div
        className="relative mt-14 h-[380px] sm:h-[480px]"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {transformationLooks.map((look, i) => {
          const diff = circularDiff(i, activeIndex, COUNT);
          const distance = Math.abs(diff);
          const isActive = distance === 0;
          const scale = isActive ? 1 : distance === 1 ? 0.78 : 0.62;
          const opacity = isActive ? 1 : distance === 1 ? 0.55 : distance === 2 ? 0.28 : 0;
          const blur = isActive ? 0 : distance === 1 ? 1.5 : 3;

          return (
            <button
              key={look.id}
              onClick={() => goTo(i)}
              aria-label={`Show ${look.label}`}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              className="absolute top-1/2 left-1/2 w-56 sm:w-72 h-80 sm:h-[420px] -ml-28 sm:-ml-36 rounded-[1.5rem] overflow-hidden shadow-2xl cursor-pointer transition-[transform,opacity,filter] duration-700"
              style={{
                transform: `translateX(${diff * 68}%) translateY(-50%) scale(${scale})`,
                opacity,
                filter: `blur(${blur}px)`,
                zIndex: 10 - distance,
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                pointerEvents: distance > 2 ? "none" : "auto",
              }}
            >
              <img src={look.src} alt={look.label} draggable={false} className="w-full h-full object-cover" />
              {isActive && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/5 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-left">
                    <h3 className="font-display text-2xl sm:text-3xl text-ivory leading-tight animate-fade-up">
                      {active.label}
                    </h3>
                    <p className="mt-1 text-ivory/65 font-sans text-xs sm:text-sm animate-fade-up">
                      {active.description}
                    </p>
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SectionHeading from "@/components/SectionHeading";
import { journeySteps } from "@/config/content";

gsap.registerPlugin(ScrollTrigger);

const CHARSET = " ABCDEFGHIJKLMNOPQRSTUVWXYZ.,&'";
const CHAR_SWAP_MS = 35;
const CHAR_DURATION_MS = 420;
const STAGGER_PER_CHAR_MS = 40;

function scrambleChar(el: HTMLSpanElement | null, target: string) {
  if (!el) return;
  const swaps = Math.floor(CHAR_DURATION_MS / CHAR_SWAP_MS);
  let count = 0;
  const interval = setInterval(() => {
    if (count >= swaps) {
      clearInterval(interval);
      el.textContent = target;
      gsap.fromTo(el, { scaleY: 0.25 }, { scaleY: 1, duration: 0.18, ease: "back.out(3)" });
      return;
    }
    el.textContent = CHARSET[Math.floor(Math.random() * CHARSET.length)] || " ";
    count++;
  }, CHAR_SWAP_MS);
}

export default function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[][]>(journeySteps.map(() => []));
  const [settledRows, setSettledRows] = useState<boolean[]>(journeySteps.map(() => false));
  const animatingRef = useRef<boolean[]>(journeySteps.map(() => false));

  function animateRow(rowIndex: number, onComplete?: () => void) {
    if (animatingRef.current[rowIndex]) return;
    animatingRef.current[rowIndex] = true;
    setSettledRows((s) => s.map((v, i) => (i === rowIndex ? false : v)));

    const title = journeySteps[rowIndex].title.toUpperCase();
    const chars = title.split("");
    chars.forEach((ch, ci) => {
      setTimeout(() => scrambleChar(charRefs.current[rowIndex][ci], ch), ci * STAGGER_PER_CHAR_MS);
    });

    const totalTime = (chars.length - 1) * STAGGER_PER_CHAR_MS + CHAR_DURATION_MS;
    setTimeout(() => {
      animatingRef.current[rowIndex] = false;
      setSettledRows((s) => s.map((v, i) => (i === rowIndex ? true : v)));
      onComplete?.();
    }, totalTime);
  }

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReduced) {
      journeySteps.forEach((step, i) => {
        charRefs.current[i].forEach((el, ci) => {
          if (el) el.textContent = step.title.toUpperCase()[ci];
        });
      });
      setSettledRows(journeySteps.map(() => true));
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      once: true,
      onEnter: () => {
        // Rows settle sequentially — row N only starts once row N-1 has fully locked.
        const runRow = (i: number) => {
          if (i >= journeySteps.length) return;
          animateRow(i, () => runRow(i + 1));
        };
        runRow(0);
      },
    });

    return () => trigger.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-charcoal py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-5 sm:px-10">
        <SectionHeading eyebrow="How It Works" title="The salon journey, from tap to transformation." />

        <div className="mt-14 rounded-2xl border border-champagne/20 bg-ink overflow-hidden">
          {journeySteps.map((step, i) => {
            const isLast = i === journeySteps.length - 1;
            const settled = settledRows[i];
            return (
              <div
                key={step.id}
                onMouseEnter={() => animateRow(i)}
                onClick={() => animateRow(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    animateRow(i);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Replay: ${step.title}`}
                className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 px-4 sm:px-6 py-4 sm:py-5 border-b border-champagne/10 last:border-b-0 cursor-pointer transition-colors duration-500 ${
                  isLast && settled ? "bg-champagne/10" : ""
                }`}
              >
                {/* Step number — fixed, never flips */}
                <span className="shrink-0 w-10 font-display text-champagne/70 text-lg">{step.id}</span>

                <div className="flex-1 min-w-0">
                  {/* Split-flap title */}
                  <div className="flex flex-wrap gap-[2px] sm:gap-[3px]">
                    {step.title
                      .toUpperCase()
                      .split("")
                      .map((_, ci) => (
                        <span
                          key={ci}
                          className="relative flex items-center justify-center bg-charcoal-2 text-ivory font-display text-[0.7rem] sm:text-sm rounded-[3px] w-[15px] h-[22px] sm:w-[19px] sm:h-[27px] overflow-hidden"
                        >
                          <span
                            ref={(el) => {
                              charRefs.current[i][ci] = el;
                            }}
                          />
                          {/* Seam line — matches the Odometer's drum styling, never touched by the char updates */}
                          <span className="absolute inset-x-0 top-1/2 h-px bg-black/40 pointer-events-none" />
                        </span>
                      ))}
                  </div>
                  <p className="mt-2 text-ivory/45 font-sans text-xs sm:text-sm leading-relaxed">{step.body}</p>
                </div>

                {isLast && (
                  <span
                    className={`shrink-0 eyebrow text-[0.6rem] transition-opacity duration-500 ${
                      settled ? "opacity-100 text-champagne" : "opacity-0"
                    }`}
                  >
                    Now Boarding
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

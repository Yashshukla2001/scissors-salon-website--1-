import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { businessInfo } from "@/config/business";

gsap.registerPlugin(ScrollTrigger);

const STATS = businessInfo.stats;

function parseStatValue(raw: string): { n: number; suffix: string } {
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return { n: 0, suffix: raw };
  return { n: parseInt(match[1], 10), suffix: match[2] };
}

export default function TrustStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const plaqueRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReduced) {
      STATS.forEach((stat, i) => {
        const { n, suffix } = parseStatValue(stat.value);
        if (numberRefs.current[i]) numberRefs.current[i]!.textContent = `${n}${suffix}`;
      });
      gsap.set(plaqueRef.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(plaqueRef.current, { opacity: 0, y: 24 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(plaqueRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" });

        STATS.forEach((stat, i) => {
          const { n, suffix } = parseStatValue(stat.value);
          const counter = { value: 0 };
          gsap.to(counter, {
            value: n,
            duration: 1.2,
            delay: 0.25 + i * 0.08,
            ease: "power2.out",
            onUpdate: () => {
              const el = numberRefs.current[i];
              if (el) el.textContent = `${Math.round(counter.value)}${suffix}`;
            },
          });
        });

        // A barely-perceptible light sheen once settled — keeps the still plaque from reading as flat.
        gsap.to(shimmerRef.current, {
          backgroundPosition: "-120% 0",
          duration: 9,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.2,
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-charcoal border-y border-champagne/15 py-14 sm:py-16 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-10">
        <div
          ref={plaqueRef}
          className="relative rounded-2xl border border-champagne/25 bg-charcoal-2/60 shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden"
        >
          {/* Light sheen — slow, continuous, barely there */}
          <div
            ref={shimmerRef}
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(100deg, transparent 35%, rgba(246,227,174,0.1) 50%, transparent 65%)",
              backgroundSize: "220% 100%",
              backgroundPosition: "120% 0",
            }}
          />

          <div className="relative grid grid-cols-2 sm:grid-cols-4">
            {STATS.map((stat, i) => {
              const mobileBorderR = i % 2 === 0;
              const mobileBorderB = i < 2;
              const desktopBorderR = i !== STATS.length - 1;
              const dimmed = hoveredIndex !== null && hoveredIndex !== i;

              return (
                <div
                  key={stat.label}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`flex flex-col items-center justify-center gap-2 py-8 sm:py-10 px-4 border-champagne/15 transition-opacity duration-300 ${
                    mobileBorderR ? "border-r" : ""
                  } ${mobileBorderB ? "border-b" : ""} sm:border-b-0 ${
                    desktopBorderR ? "sm:border-r" : "sm:border-r-0"
                  }`}
                  style={{ opacity: dimmed ? 0.4 : 1 }}
                >
                  <span
                    ref={(el) => {
                      numberRefs.current[i] = el;
                    }}
                    className="font-display text-[clamp(2rem,4.5vw,3rem)] text-champagne leading-none tabular-nums"
                    style={{ textShadow: "0 2px 0 rgba(0,0,0,0.35)" }}
                  >
                    0
                  </span>
                  <span className="eyebrow text-ivory/50 text-[0.62rem] text-center leading-snug">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { businessInfo } from "@/config/business";
import { stockVideo } from "@/config/media";

gsap.registerPlugin(ScrollTrigger);

function buildStrip(target: number, cycles: number): number[] {
  const strip: number[] = [];
  for (let c = 0; c < cycles; c++) {
    for (let d = 0; d <= 9; d++) strip.push(d);
  }
  for (let d = 0; d <= target; d++) strip.push(d);
  return strip;
}

export default function ExperienceStat() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const digits = String(businessInfo.yearsOfExperience).split("").map(Number);
  const stripRefs = useRef<(HTMLDivElement | null)[]>([]);
  const respinningRef = useRef<boolean[]>(digits.map(() => false));

  function spinDigit(i: number, target: number, cycles: number, duration: number) {
    const strip = buildStrip(target, cycles);
    const stripEl = stripRefs.current[i];
    if (!stripEl) return;

    // Render the strip fresh, then animate from the top down to the target.
    stripEl.innerHTML = "";
    strip.forEach((d) => {
      const span = document.createElement("span");
      span.textContent = String(d);
      span.className = "flex items-center justify-center h-full w-full shrink-0";
      stripEl.appendChild(span);
    });

    gsap.set(stripEl, { yPercent: 0 });
    gsap.to(stripEl, {
      yPercent: -(strip.length - 1) * 100,
      duration,
      ease: "back.out(1.7)",
    });
  }

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReduced) {
      digits.forEach((d, i) => spinDigit(i, d, 0, 0.01));
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      once: true,
      onEnter: () => {
        const n = digits.length;
        digits.forEach((d, i) => {
          const fromRight = n - 1 - i; // rightmost = 0, settles first
          const duration = 1.1 + fromRight * 0.4;
          spinDigit(i, d, 3, duration);
        });
      },
    });

    return () => trigger.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function respin(i: number) {
    if (respinningRef.current[i]) return;
    respinningRef.current[i] = true;
    spinDigit(i, digits[i], 1, 0.7);
    setTimeout(() => {
      respinningRef.current[i] = false;
    }, 750);
  }

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-ivory text-charcoal py-28 sm:py-36 overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Living backdrop — visible motion, dimmed just enough to keep text legible */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-45"
      >
        <source src={stockVideo.stylingComb} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-ivory/55" />

      <div className="flex items-center gap-1.5 sm:gap-2.5 relative z-10">
        {digits.map((_, i) => (
          <div
            key={i}
            onMouseEnter={() => respin(i)}
            onClick={() => respin(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                respin(i);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Replay the count"
            className="relative overflow-hidden rounded-2xl sm:rounded-[1.75rem] bg-charcoal shadow-[0_20px_50px_rgba(0,0,0,0.25)] cursor-pointer select-none w-[clamp(3.6rem,16vw,10rem)] h-[clamp(4.8rem,21vw,13rem)]"
          >
            {/* Seam line — the drum reads as a real mechanical wheel, not flat text */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-charcoal/40 z-10" />
            <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none" />

            <div
              ref={(el) => {
                stripRefs.current[i] = el;
              }}
              className="absolute inset-0 flex flex-col font-display font-medium text-champagne text-[clamp(3rem,14vw,8.5rem)] leading-none"
            />
          </div>
        ))}
        <span className="font-display font-medium text-champagne/70 text-[clamp(2rem,9vw,5.5rem)] ml-1 sm:ml-2 select-none">
          +
        </span>
      </div>

      <div className="relative z-10 mt-9 sm:mt-12 flex flex-col items-center text-center gap-4 px-6">
        <span className="eyebrow text-wine">Years Of Experience</span>
        <p className="font-display text-xl sm:text-2xl max-w-xl leading-snug text-balance">
          Since 2009, we&rsquo;ve spent every one of those years reading
          different hair types, changing beauty trends and what actually
          makes a client feel confident walking out the door.
        </p>
        <p className="text-charcoal/50 font-sans text-xs sm:text-sm max-w-md">
          Precision doesn&rsquo;t come from a single great haircut — it comes
          from thousands of them.
        </p>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Props = {
  onComplete: () => void;
};

/**
 * Loader plays a short (~2.2s) brand sequence: a thin gold line sweeps
 * across like an open scissor blade, the wordmark reveals through a
 * clip-path mask, then the whole loader lifts away into the hero.
 */
export default function Loader({ onComplete }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      onComplete();
      return;
    }

    const counter = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => onComplete(),
    });

    tl.set(wordRef.current, { clipPath: "inset(0 100% 0 0)" })
      .to(counter, {
        value: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => setPercent(Math.round(counter.value)),
      })
      .to(
        lineRef.current,
        { scaleX: 1, transformOrigin: "left", duration: 0.7, ease: "power3.inOut" },
        0
      )
      .to(
        wordRef.current,
        { clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power4.inOut" },
        0.5
      )
      .to(
        lineRef.current,
        { scaleX: 0, transformOrigin: "right", duration: 0.5, ease: "power3.in" },
        1.1
      )
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.4 }, 1.2)
      .to({}, { duration: 0.35 })
      .to(rootRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
      });

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal text-ivory"
      aria-hidden="true"
    >
      <div className="relative flex flex-col items-center gap-6 px-6">
        <div ref={wordRef} className="overflow-hidden">
          <h1 className="font-display text-[clamp(2.8rem,10vw,7rem)] leading-none tracking-tight">
            Scissor&rsquo;s
          </h1>
        </div>
        <div ref={lineRef} className="h-px w-56 sm:w-72 bg-champagne scale-x-0" />
        <div
          ref={subRef}
          className="eyebrow text-champagne opacity-0 translate-y-2 flex items-center gap-3"
        >
          <span>The Unisex Salon</span>
          <span className="text-ivory/30">·</span>
          <span>{String(percent).padStart(2, "0")}%</span>
        </div>
      </div>
    </div>
  );
}

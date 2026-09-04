import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { GoogleGlyph } from "@/components/icons";
import SectionHeading from "@/components/SectionHeading";
import MagneticButton from "@/components/MagneticButton";
import { businessInfo } from "@/config/business";
import { reviews } from "@/config/content";

export default function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const loopWidth = useRef(0);
  const paused = useRef(false);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);
  const coastVelocity = useRef(0);
  const lastTouchX = useRef(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !trackRef.current) return;

    loopWidth.current = trackRef.current.scrollWidth / 2;
    let raf = 0;
    let last = performance.now();

    function tick(time: number) {
      const dt = Math.min(time - last, 48) / 1000;
      last = time;

      if (!dragging.current) {
        if (Math.abs(coastVelocity.current) > 0.02) {
          pos.current += coastVelocity.current;
          coastVelocity.current *= 0.94;
        } else if (!paused.current) {
          pos.current -= 34 * dt;
        }
      }

      if (loopWidth.current > 0) {
        if (pos.current <= -loopWidth.current) pos.current += loopWidth.current;
        if (pos.current > 0) pos.current -= loopWidth.current;
      }
      if (trackRef.current) trackRef.current.style.transform = `translate3d(${pos.current}px,0,0)`;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function onTouchStart(e: React.TouchEvent) {
    dragging.current = true;
    coastVelocity.current = 0;
    dragStartX.current = e.touches[0].clientX;
    lastTouchX.current = e.touches[0].clientX;
    dragStartPos.current = pos.current;
  }
  function onTouchMove(e: React.TouchEvent) {
    if (!dragging.current) return;
    const x = e.touches[0].clientX;
    pos.current = dragStartPos.current + (x - dragStartX.current);
    coastVelocity.current = x - lastTouchX.current;
    lastTouchX.current = x;
  }
  function onTouchEnd() {
    dragging.current = false;
    coastVelocity.current = Math.max(-28, Math.min(28, coastVelocity.current * 2.2));
  }

  return (
    <section id="reviews" className="relative bg-ivory text-charcoal py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        <SectionHeading eyebrow="Client Voices" title="What Dewas says about us." tone="dark" align="center" />
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={20} className="text-wine" fill="currentColor" />
          ))}
          <span className="font-display text-xl ml-2">Google Rating</span>
        </div>
      </div>

      {/* The wall — continuous glide, pause on hover, drag to scrub */}
      <div
        className="mt-14 overflow-hidden select-none"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div ref={trackRef} className="flex gap-4 sm:gap-5 will-change-transform px-5 sm:px-10">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-4 sm:gap-5 shrink-0" aria-hidden={copy === 1 || undefined}>
              {reviews.map((r, i) => (
                <a
                  key={`${copy}-${i}`}
                  href={businessInfo.social.googleReviews}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 w-72 sm:w-80 rounded-2xl border border-charcoal/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          size={15}
                          className={s < r.rating ? "text-wine" : "text-charcoal/15"}
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <GoogleGlyph size={16} />
                  </div>
                  <p className="mt-4 text-charcoal/75 font-sans text-sm leading-relaxed">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div className="mt-5 pt-4 border-t border-charcoal/10 flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-wine/10 text-wine font-display text-xs flex items-center justify-center">
                      {r.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </span>
                    <span className="font-sans text-sm font-medium text-charcoal/70">{r.name}</span>
                  </div>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Leave a review — the actual conversion point */}
      <div className="max-w-3xl mx-auto mt-16 px-5 sm:px-10">
        <div className="rounded-[1.75rem] bg-charcoal text-ivory px-7 sm:px-10 py-9 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <span className="eyebrow text-champagne">Enjoyed Your Experience?</span>
            <h3 className="font-display text-2xl sm:text-3xl mt-2">Share it with others.</h3>
            <p className="mt-2 text-ivory/55 font-sans text-sm max-w-sm">
              A minute of your time helps another family in Dewas find us. Reviews are posted through Google.
            </p>
          </div>
          <MagneticButton
            href={businessInfo.social.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2.5 rounded-full bg-ivory text-charcoal font-sans font-semibold px-6 py-3.5 hover:bg-champagne-light transition-colors duration-300"
          >
            <GoogleGlyph size={18} /> Leave A Google Review
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

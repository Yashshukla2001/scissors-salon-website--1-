import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SectionHeading from "@/components/SectionHeading";
import { signatureFeatures } from "@/config/content";

gsap.registerPlugin(ScrollTrigger);

const N = signatureFeatures.length;

export default function SignatureFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ---- Each card gets its own page-like tilt-in as it scrolls into view. No pinning,
  // no scroll-jacking — normal document flow, so nothing can ever be unreachable
  // regardless of the visitor's actual viewport height. ----
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      pageRefs.current.forEach((page, i) => {
        if (!page) return;
        const fromSide = i % 2 === 0 ? 8 : -8;
        gsap.fromTo(
          page,
          { opacity: 0, y: 50, rotateY: fromSide, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: page, start: "top 88%", once: true },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-charcoal py-24 sm:py-32" style={{ perspective: "1600px" }}>
      <div className="max-w-4xl mx-auto px-5 sm:px-10">
        <SectionHeading eyebrow="Editorial" title="Three experiences worth planning your week around." />

        <div className="mt-12 sm:mt-14 flex flex-col gap-6 sm:gap-8">
          {signatureFeatures.map((feature, i) => (
            <div
              key={feature.id}
              ref={(el) => {
                pageRefs.current[i] = el;
              }}
              className="relative rounded-2xl overflow-hidden bg-ink shadow-2xl bg-noise"
            >
              <div className="grid sm:grid-cols-2">
                <div className={`relative h-48 sm:h-72 ${i % 2 === 1 ? "sm:order-2" : ""}`}>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className={`p-6 sm:p-9 flex flex-col justify-center ${i % 2 === 1 ? "sm:order-1" : ""}`}>
                  <h3 className="font-display text-[clamp(1.5rem,2.8vw,2.1rem)] leading-[1.05]">
                    {feature.title}
                  </h3>
                  <p className="font-display italic text-blush text-base mt-2.5">{feature.line}</p>
                  <p className="mt-3.5 text-ivory/65 font-sans text-sm leading-relaxed max-w-md">
                    {feature.body}
                  </p>
                </div>
              </div>

              <span className="absolute bottom-4 right-5 sm:right-7 font-display text-xs text-champagne/60">
                {i + 1} / {N}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

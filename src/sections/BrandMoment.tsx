import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BrandMoment() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const shimmerTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReduced) {
      gsap.set(textRef.current, { scale: 1, filter: "blur(0px)", backgroundPosition: "20% 50%" });
      gsap.set(subtitleRef.current, { opacity: 1, y: 0 });
      gsap.set(flashRef.current, { opacity: 0 });
      return;
    }

    gsap.set(textRef.current, { scale: 1.16, filter: "blur(15px)", backgroundPosition: "100% 50%" });
    gsap.set(flashRef.current, { opacity: 0, scale: 0.3 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 10 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 65%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        // The stamp impact
        tl.to(flashRef.current, { opacity: 0.85, scale: 1, duration: 0.18, ease: "power2.out" })
          .to(flashRef.current, { opacity: 0, duration: 0.5, ease: "power2.in" }, "-=0.05")
          // The ink bleeding outward then tightening into sharp, settled type
          .to(
            textRef.current,
            { scale: 1, filter: "blur(0px)", backgroundPosition: "20% 50%", duration: 0.85, ease: "power3.out" },
            "-=0.55"
          )
          .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
          .call(() => {
            // A barely-perceptible shimmer, like light catching a glossy stamped surface.
            shimmerTween.current = gsap.to(textRef.current, {
              backgroundPosition: "0% 50%",
              duration: 8,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
          });
      },
    });

    return () => {
      trigger.kill();
      shimmerTween.current?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-charcoal py-24 sm:py-32 overflow-hidden flex flex-col items-center justify-center min-h-[62vh] bg-noise"
    >
      {/* Impact flash */}
      <div
        ref={flashRef}
        className="absolute w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(246,227,174,0.9) 0%, rgba(200,160,92,0.4) 35%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <h2
        ref={textRef}
        className="relative font-display font-medium text-[clamp(3.4rem,15vw,11rem)] leading-[0.9] text-center select-none px-4"
        style={{
          backgroundImage:
            "linear-gradient(100deg, #6b5a34 0%, #f6e3ae 22%, #ffffff 32%, #f6e3ae 42%, #8f6d34 62%, #c8a05c 100%)",
          backgroundSize: "260% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Scissor&rsquo;s
      </h2>

      <p ref={subtitleRef} className="relative mt-6 eyebrow text-ivory/50 text-center px-6">
        The Unisex Salon &middot; Dewas &middot; Since 2009
      </p>
    </section>
  );
}

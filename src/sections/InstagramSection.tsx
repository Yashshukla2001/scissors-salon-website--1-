import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { InstagramGlyph } from "@/components/icons";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import { businessInfo } from "@/config/business";
import { galleryImages, transformationLooks } from "@/config/content";

gsap.registerPlugin(ScrollTrigger);

const POSTS = [
  galleryImages[1].src,
  transformationLooks[0].src,
  galleryImages[5].src,
  transformationLooks[1].src,
  galleryImages[2].src,
  transformationLooks[3].src,
];

const BASE_SPEED = 26; // px/sec

export default function InstagramSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wakeRef = useRef<HTMLDivElement>(null);

  const pos = useRef(0);
  const loopHeight = useRef(0);
  const speedScale = useRef(0); // ramps 0 -> 1 once awake
  const slowRef = useRef(1); // 1 = normal, eases toward ~0.12 on hover
  const [awake, setAwake] = useState(false);

  // ---- Entrance: frame rises in, screen wakes up, then the feed starts scrolling ----
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReduced) {
      gsap.set(frameRef.current, { opacity: 1, y: 0 });
      gsap.set(wakeRef.current, { opacity: 0 });
      speedScale.current = 1;
      setAwake(true);
      return;
    }

    gsap.set(frameRef.current, { opacity: 0, y: 40 });
    gsap.set(wakeRef.current, { opacity: 1 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        tl.to(frameRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
          .to(wakeRef.current, { opacity: 0.15, duration: 0.08 }, "+=0.2")
          .to(wakeRef.current, { opacity: 0, duration: 0.35 })
          .call(() => setAwake(true))
          .to(speedScale, { current: 1, duration: 1.2, ease: "power2.out" }, "<");
      },
    });

    return () => trigger.kill();
  }, []);

  // ---- The continuous vertical feed scroll ----
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !awake) return;

    loopHeight.current = (trackRef.current?.scrollHeight || 0) / 2;
    let raf = 0;
    let last = performance.now();

    function tick(time: number) {
      const dt = Math.min(time - last, 48) / 1000;
      last = time;

      pos.current -= BASE_SPEED * speedScale.current * slowRef.current * dt;
      if (loopHeight.current > 0 && pos.current <= -loopHeight.current) {
        pos.current += loopHeight.current;
      }
      if (trackRef.current) trackRef.current.style.transform = `translate3d(0, ${pos.current}px, 0)`;
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [awake]);

  function onScreenEnter() {
    gsap.to(slowRef, { current: 0.12, duration: 0.5, ease: "power2.out" });
  }
  function onScreenLeave() {
    gsap.to(slowRef, { current: 1, duration: 0.6, ease: "power2.out" });
  }

  return (
    <section ref={sectionRef} className="relative bg-charcoal py-24 sm:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-10 grid lg:grid-cols-2 gap-14 items-center">
        {/* Phone frame — desktop: order 2 (right side); mobile: appears first */}
        <div className="order-1 lg:order-2 flex justify-center">
          <div
            ref={frameRef}
            className="relative w-[220px] sm:w-[250px] h-[440px] sm:h-[500px] rounded-[2.5rem] border-[6px] border-ink bg-ink shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-charcoal-2 z-20" />
            <div
              ref={screenRef}
              onMouseEnter={onScreenEnter}
              onMouseLeave={onScreenLeave}
              onTouchStart={onScreenEnter}
              onTouchEnd={onScreenLeave}
              className="absolute inset-1.5 rounded-[2rem] overflow-hidden bg-charcoal-2"
            >
              <div ref={trackRef} className="flex flex-col will-change-transform">
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex flex-col" aria-hidden={copy === 1 || undefined}>
                    {POSTS.map((src, i) => (
                      <a
                        key={i}
                        href={businessInfo.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative block w-full aspect-square border-b border-charcoal/40"
                      >
                        <img src={src} alt="Scissor's on Instagram" className="w-full h-full object-cover" />
                      </a>
                    ))}
                  </div>
                ))}
              </div>
              {/* Screen wake overlay */}
              <div ref={wakeRef} className="absolute inset-0 bg-charcoal pointer-events-none" />
              {/* Edge fades so posts don't feel like they cut abruptly */}
              <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-charcoal-2 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-charcoal-2 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Heading + CTA — always outside the frame */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <span className="eyebrow text-champagne">@ Scissor&rsquo;s</span>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] mt-4 text-balance">
              Your daily dose of transformation.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 text-ivory/60 font-sans max-w-md mx-auto lg:mx-0">
              A live look at the feed — hover the phone to slow it down and see something properly.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <MagneticButton
              href={businessInfo.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-champagne/40 text-champagne font-sans font-semibold px-6 py-3.5 hover:bg-champagne hover:text-charcoal transition-colors duration-300"
            >
              <InstagramGlyph size={18} /> Follow Scissor&rsquo;s
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

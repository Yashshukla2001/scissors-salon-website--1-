import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { stockVideo, stockPhoto } from "@/config/media";
import { generalEnquiryLink } from "@/utils/whatsapp";

gsap.registerPlugin(ScrollTrigger);

const NAMEPLATE = { x: 50, y: 38 }; // fixed screen position the wordmark sits at, for glow proximity
const LANDED = { x: 50, y: 40, r: 34 }; // % / vw resting spotlight position
const FLOODED = { r: 145 }; // radius once "house lights" are fully up

type SpotState = { x: number; y: number; r: number };

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const wordWrapRef = useRef<HTMLDivElement>(null);
  const litGroupRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const detailYearRef = useRef<HTMLSpanElement>(null);
  const detailToolsRef = useRef<HTMLSpanElement>(null);

  const [landed, setLanded] = useState(false);
  const spot = useRef<SpotState>({ x: -18, y: -22, r: 5 });
  const shimmerRef = useRef<gsap.core.Tween | null>(null);

  function applySpot() {
    const el = overlayRef.current;
    if (!el) return;
    el.style.setProperty("--spot-x", `${spot.current.x}%`);
    el.style.setProperty("--spot-y", `${spot.current.y}%`);
    el.style.setProperty("--spot-r", `${spot.current.r}vw`);

    // Hidden details in the shadow only whisper into view when the beam is close.
    for (const [ref, px, py] of [
      [detailYearRef, 78, 78],
      [detailToolsRef, 14, 70],
    ] as const) {
      const node = ref.current;
      if (!node) continue;
      const d = Math.hypot(spot.current.x - px, spot.current.y - py);
      node.style.opacity = String(Math.max(0, 1 - d / 30) * 0.65);
    }

    // The wordmark is lit by the same beam — brighter and warmer when the
    // beam is near it, dimmer when it wanders away.
    const distToWord = Math.hypot(spot.current.x - NAMEPLATE.x, spot.current.y - NAMEPLATE.y);
    const glow = gsap.utils.clamp(0, 1, 1 - distToWord / 42);
    if (litGroupRef.current) {
      litGroupRef.current.style.filter = `brightness(${(0.72 + glow * 0.7).toFixed(2)}) saturate(${(0.8 + glow * 0.5).toFixed(2)})`;
    }
  }

  // ---- Entrance: spotlight sweeps out of the dark and lands ----
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const els = { eyebrow: eyebrowRef.current, sub: subRef.current, cta: ctaRef.current, hint: hintRef.current };

    if (prefersReduced) {
      spot.current = { ...LANDED };
      applySpot();
      gsap.set(wordWrapRef.current, { opacity: 1, y: 0 });
      gsap.set(litGroupRef.current, { backgroundPosition: "10% 50%" });
      gsap.set([els.eyebrow, els.sub, els.cta, els.hint], { opacity: 1, y: 0 });
      setLanded(true);
      return;
    }

    applySpot();
    gsap.set(wordWrapRef.current, { opacity: 0, y: 16 });
    gsap.set(litGroupRef.current, { backgroundPosition: "115% 50%" });
    gsap.set([els.eyebrow, els.sub, els.cta, els.hint], { opacity: 0, y: 14 });

    const tl = gsap.timeline({ delay: 0.2 });

    // Fast sweep across the dark, then land with a settling overshoot.
    tl.to(spot.current, { x: 62, y: 8, r: 11, duration: 0.5, ease: "power1.in", onUpdate: applySpot })
      .to(spot.current, { ...LANDED, duration: 0.9, ease: "back.out(1.5)", onUpdate: applySpot })
      .call(() => setLanded(true))
      .to(els.eyebrow, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.35")
      // The wordmark's shadow settles in, then the beam's own left-to-right
      // sweep is echoed by the gradient sliding across the letters — a
      // sheen of light catching them, rather than a simple fade-in.
      .to(wordWrapRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.25")
      .to(litGroupRef.current, { backgroundPosition: "10% 50%", duration: 1.1, ease: "power3.inOut" }, "-=0.35")
      .to(els.sub, { opacity: 1, y: 0, duration: 0.6 }, "-=0.8")
      .to(els.cta, { opacity: 1, y: 0, duration: 0.6 }, "-=0.6")
      .to(els.hint, { opacity: 1, duration: 0.5 }, "-=0.3")
      .call(() => {
        // A very slow, barely-there shimmer keeps the letters from ever
        // reading as flat, static gold once settled.
        shimmerRef.current = gsap.to(litGroupRef.current, {
          backgroundPosition: "0% 50%",
          duration: 7,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

    return () => {
      tl.kill();
      shimmerRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Desktop: cursor is the spotlight operator ----
  useEffect(() => {
    if (!landed) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (prefersReduced || !section) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    const followX = gsap.quickTo(spot.current, "x", { duration: 0.8, ease: "power3.out", onUpdate: applySpot });
    const followY = gsap.quickTo(spot.current, "y", { duration: 0.8, ease: "power3.out", onUpdate: applySpot });

    function onMove(e: MouseEvent) {
      const rect = section!.getBoundingClientRect();
      followX(((e.clientX - rect.left) / rect.width) * 100);
      followY(((e.clientY - rect.top) / rect.height) * 100);
    }
    function onLeave() {
      followX(LANDED.x);
      followY(LANDED.y);
    }

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [landed]);

  // ---- Mobile: the spotlight drifts on its own, tap flashes it brighter ----
  useEffect(() => {
    if (!landed) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || !section || !isTouch) return;

    const drift = gsap.timeline({ repeat: -1, yoyo: true });
    drift
      .to(spot.current, { x: LANDED.x + 14, y: LANDED.y - 8, duration: 4.5, ease: "sine.inOut", onUpdate: applySpot })
      .to(spot.current, { x: LANDED.x - 12, y: LANDED.y + 6, duration: 4.5, ease: "sine.inOut", onUpdate: applySpot });

    function onTap(e: TouchEvent) {
      const rect = section!.getBoundingClientRect();
      const touch = e.touches[0];
      if (!touch) return;
      const flashX = ((touch.clientX - rect.left) / rect.width) * 100;
      const flashY = ((touch.clientY - rect.top) / rect.height) * 100;
      gsap.to(spot.current, {
        r: LANDED.r + 10,
        duration: 0.25,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        onUpdate: applySpot,
      });
      gsap.to(spot.current, { x: flashX, y: flashY, duration: 0.4, ease: "power2.out", onUpdate: applySpot });
    }

    section.addEventListener("touchstart", onTap, { passive: true });
    return () => {
      drift.kill();
      section.removeEventListener("touchstart", onTap);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [landed]);

  // ---- Scroll: house lights come up, darkness retreats ----
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !sectionRef.current) return;

    const floodState = { r: LANDED.r };
    const ctx = gsap.context(() => {
      gsap.to(floodState, {
        r: FLOODED.r,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        onUpdate: () => {
          spot.current.r = floodState.r;
          applySpot();
        },
      });

      gsap.to(hintRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "12% top", scrub: true },
      });

      gsap.to(videoWrapRef.current, {
        scale: 1.12,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-charcoal"
    >
      {/* The stage: footage sits dim and desaturated until the spotlight finds it */}
      <div ref={videoWrapRef} className="absolute inset-0 scale-105">
        <video autoPlay muted loop playsInline poster={stockPhoto.bridalPortrait} className="w-full h-full object-cover brightness-[0.55] saturate-[0.7]">
          <source src={stockVideo.heroBlowDry} type="video/mp4" />
        </video>
      </div>

      {/* Hidden backstage details — only whisper into view when the beam passes near */}
      <span
        ref={detailYearRef}
        className="absolute font-display italic text-champagne text-lg sm:text-2xl opacity-0 pointer-events-none"
        style={{ left: "78%", top: "78%", transform: "translate(-50%, -50%)" }}
      >
        Since 2009
      </span>
      <span
        ref={detailToolsRef}
        className="absolute eyebrow text-ivory/80 opacity-0 pointer-events-none"
        style={{ left: "14%", top: "70%", transform: "translate(-50%, -50%)" }}
      >
        Scissors &middot; Comb &middot; Colour
      </span>

      {/* Ambient dust motes drifting inside the dark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-champagne-light/70 blur-[1px] animate-dust-drift"
            style={
              {
                left: `${8 + i * 9.5}%`,
                top: `${20 + ((i * 37) % 60)}%`,
                animationDuration: `${6 + (i % 5)}s`,
                animationDelay: `${i * 0.6}s`,
                "--dust-x": `${(i % 2 === 0 ? 1 : -1) * (10 + i * 2)}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* The spotlight itself: a dark mask with a soft-edged, draggable-feeling hole */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={
          {
            background:
              "radial-gradient(circle at var(--spot-x) var(--spot-y), transparent 0%, transparent calc(var(--spot-r) - 6vw), rgba(20,16,13,0.5) var(--spot-r), rgba(15,12,10,0.92) calc(var(--spot-r) + 16vw), rgba(10,8,7,0.97) 100%)",
            "--spot-x": "-18%",
            "--spot-y": "-22%",
            "--spot-r": "5vw",
          } as React.CSSProperties
        }
      />

      {/* Content — always legible, sits above the stage lighting */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <span ref={eyebrowRef} className="eyebrow text-champagne mb-5">
          Dewas &middot; Hair &middot; Makeup &middot; Skin
        </span>

        <h1 className="sr-only">Scissor&rsquo;s — The Unisex Salon, Dewas</h1>

        {/* The wordmark — a moving gold sheen inside the letters, reacting to the beam */}
        <div ref={wordWrapRef} className="flex flex-col items-center">
          <div className="relative">
            {/* Cast shadow — a duplicate sitting behind, offset, implying real depth */}
            <p
              aria-hidden="true"
              className="absolute inset-0 translate-x-[5px] translate-y-[7px] sm:translate-x-[7px] sm:translate-y-[9px] font-display text-[clamp(3rem,12vw,7.5rem)] leading-[0.95] font-medium text-[#0c0a08] opacity-80 select-none"
            >
              Scissor&rsquo;s
            </p>

            {/* The lit letters: gradient fill + gold edge, brightness tied to the beam */}
            <p
              ref={litGroupRef}
              className="relative font-display text-[clamp(3rem,12vw,7.5rem)] leading-[0.95] font-medium select-none"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, #6b5a34 0%, #f6e3ae 24%, #ffffff 34%, #f6e3ae 44%, #8f6d34 62%, #c8a05c 100%)",
                backgroundSize: "260% 100%",
                backgroundPosition: "115% 50%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(200,160,92,0.85)",
              }}
            >
              Scissor&rsquo;s
            </p>
          </div>

          <span className="mt-2 sm:mt-3 eyebrow text-champagne/75">The Unisex Salon</span>
        </div>

        <div ref={subRef} className="mt-6 flex flex-col items-center gap-2">
          <p className="font-display italic text-blush text-[clamp(1.15rem,2.6vw,1.6rem)] leading-snug max-w-sm">
            Precision hair. Considered colour. Bridal artistry.
          </p>
          <p className="text-ivory/45 font-sans text-xs sm:text-sm tracking-wide">
            Perfecting the craft in Dewas since 2009.
          </p>
        </div>

        <div ref={ctaRef} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href={generalEnquiryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center rounded-full bg-champagne text-charcoal font-sans font-semibold px-7 py-3.5 hover:bg-champagne-light transition-colors duration-300"
          >
            <span
              aria-hidden="true"
              className="absolute -inset-2 rounded-full bg-champagne/40 blur-md opacity-35 animate-cue-pulse group-hover:opacity-70"
            />
            <span className="relative">Book Your Experience</span>
          </a>
          <a
            href="#services"
            className="group relative inline-flex items-center rounded-full border border-ivory/30 text-ivory font-sans font-semibold px-7 py-3.5 hover:border-champagne hover:text-champagne transition-colors duration-300"
          >
            <span
              aria-hidden="true"
              className="absolute -inset-2 rounded-full bg-ivory/15 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300"
            />
            <span className="relative">Explore Services</span>
          </a>
        </div>
      </div>

      <div
        ref={hintRef}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-ivory/60 z-10"
      >
        <span className="eyebrow text-[0.62rem]">Scroll · House Lights Up</span>
        <span className="animate-bounce">
          <ArrowDown size={16} />
        </span>
      </div>
    </section>
  );
}

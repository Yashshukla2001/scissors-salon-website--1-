import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { businessInfo } from "@/config/business";
import { salon } from "@/config/media";

gsap.registerPlugin(ScrollTrigger);

type Photo = {
  id: string;
  src: string;
  note?: string;
  rotate: number;
  desktop: { top: string; left: string; width: string; z: number };
};

const PHOTOS: Photo[] = [
  {
    id: "floor",
    src: salon.gallery.floor,
    note: "since 2009",
    rotate: -5,
    desktop: { top: "4%", left: "4%", width: "29%", z: 2 },
  },
  {
    id: "chairs",
    src: salon.gallery.chairsRow,
    rotate: 4,
    desktop: { top: "0%", left: "38%", width: "25%", z: 3 },
  },
  {
    id: "backwash",
    src: salon.gallery.backwash,
    note: "every client, every time",
    rotate: 3,
    desktop: { top: "33%", left: "1%", width: "25%", z: 4 },
  },
  {
    id: "color",
    src: salon.gallery.colorWall,
    rotate: -4,
    desktop: { top: "8%", left: "67%", width: "23%", z: 2 },
  },
  {
    id: "frontdesk",
    src: salon.gallery.frontDesk,
    note: "come say hi",
    rotate: -3,
    desktop: { top: "40%", left: "35%", width: "27%", z: 5 },
  },
];

const STAT_CARD = {
  rotate: 5,
  desktop: { top: "56%", left: "60%", width: "19%", z: 6 },
};

export default function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const desktopOuterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileOuterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statOuterDesktopRef = useRef<HTMLDivElement>(null);
  const statOuterMobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Both breakpoints' card sets are animated together — only one is ever
    // visually shown (CSS handles that), but this guarantees whichever set
    // becomes visible after a resize across the 1024px breakpoint has
    // already settled, rather than being stuck invisible from a stale
    // desktop/mobile check made once at mount.
    const allOuters = [
      ...desktopOuterRefs.current,
      statOuterDesktopRef.current,
      ...mobileOuterRefs.current,
      statOuterMobileRef.current,
    ];
    const baseRotations = [...PHOTOS.map((p) => p.rotate), STAT_CARD.rotate];
    const rotations = [...baseRotations, ...baseRotations];

    if (prefersReduced) {
      allOuters.forEach((el, i) => gsap.set(el, { opacity: 1, y: 0, rotate: rotations[i] }));
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(allOuters, { opacity: 0, y: -70, rotate: (i) => rotations[i] - 14 });

      // Pins land one at a time, left to right, with a little physical thud + swing.
      // Triggered off the section itself (always laid out) rather than the
      // desktop-only board wrapper, which has no box at all on mobile.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      });
      allOuters.forEach((el, i) => {
        tl.to(
          el,
          { opacity: 1, y: 0, rotate: rotations[i] + 3, duration: 0.45, ease: "power2.out" },
          i * 0.14
        ).to(el, { rotate: rotations[i], duration: 0.5, ease: "elastic.out(1, 0.45)" }, i * 0.14 + 0.4);
      });

      // Extremely subtle idle sway once settled — the board isn't perfectly still.
      tl.call(() => {
        allOuters.forEach((el, i) => {
          if (!el) return;
          gsap.to(el, {
            rotate: rotations[i] + (i % 2 === 0 ? 0.8 : -0.8),
            duration: 3 + (i % 3),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.3,
          });
        });
      });

      // The whole board tilts very slightly in 3D as the visitor scrolls past (desktop only — mobile has no 3D perspective context).
      gsap.to(boardRef.current, {
        rotateX: 3,
        rotateY: -2,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
      });

      // The years card detaches from its pin and drifts down, handing off to Services.
      gsap.to([statOuterDesktopRef.current, statOuterMobileRef.current], {
        y: 140,
        rotate: STAT_CARD.rotate + 10,
        opacity: 0,
        ease: "power1.in",
        scrollTrigger: { trigger: section, start: "bottom 60%", end: "bottom top", scrub: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-ivory text-charcoal py-24 sm:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-10">
        <span className="eyebrow text-wine">The Scissor&rsquo;s Experience</span>
        <p className="font-hand text-[clamp(2.6rem,7vw,5rem)] leading-[0.85] mt-3 -rotate-1 text-charcoal/90">
          Not just a haircut.
        </p>

        {/* ---- Desktop: scattered pinboard ---- */}
        <div
          ref={boardRef}
          className="hidden lg:block relative h-[720px] mt-10"
          style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
        >
          {PHOTOS.map((photo, i) => (
            <PolaroidOuter
              key={photo.id}
              reg={(el) => (desktopOuterRefs.current[i] = el)}
              style={{ position: "absolute", ...photo.desktop }}
            >
              <Polaroid src={photo.src} note={photo.note} />
            </PolaroidOuter>
          ))}
          <PolaroidOuter reg={(el) => (statOuterDesktopRef.current = el)} style={{ position: "absolute", ...STAT_CARD.desktop }}>
            <StatCard />
          </PolaroidOuter>
        </div>

        {/* ---- Mobile: stacked column, still pinned & tilted ---- */}
        <div className="lg:hidden mt-10 flex flex-col items-center gap-8">
          {PHOTOS.map((photo, i) => (
            <PolaroidOuter key={photo.id} reg={(el) => (mobileOuterRefs.current[i] = el)} style={{ width: "78%" }}>
              <Polaroid src={photo.src} note={photo.note} />
            </PolaroidOuter>
          ))}
          <PolaroidOuter reg={(el) => (statOuterMobileRef.current = el)} style={{ width: "55%" }}>
            <StatCard />
          </PolaroidOuter>
        </div>
      </div>
    </section>
  );
}

function PolaroidOuter({
  children,
  reg,
  style,
}: {
  children: React.ReactNode;
  reg: (el: HTMLDivElement | null) => void;
  style?: React.CSSProperties;
}) {
  return (
    <div ref={reg} style={style}>
      {/* CSS-only hover lift — kept on its own layer so it never fights GSAP's transform */}
      <div className="transition-all duration-300 hover:-translate-y-1.5 hover:drop-shadow-[0_22px_30px_rgba(0,0,0,0.28)]">
        {children}
      </div>
    </div>
  );
}

function Polaroid({ src, note }: { src: string; note?: string }) {
  return (
    <motion.div
      drag
      dragElastic={0.5}
      dragSnapToOrigin
      dragTransition={{ bounceStiffness: 320, bounceDamping: 14 }}
      whileTap={{ cursor: "grabbing" }}
      className="relative bg-white p-2.5 pb-8 shadow-[0_14px_24px_rgba(0,0,0,0.2)] cursor-grab select-none"
    >
      <span
        aria-hidden="true"
        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full shadow-md"
        style={{ background: "radial-gradient(circle at 35% 30%, #e9c98f, #8a6a34)" }}
      />
      <div className="aspect-[4/5] overflow-hidden bg-charcoal/5">
        <img src={src} alt="" draggable={false} className="w-full h-full object-cover pointer-events-none" />
      </div>
      {note && (
        <p className="font-hand text-wine text-lg text-center mt-1 leading-none">{note}</p>
      )}
    </motion.div>
  );
}

function StatCard() {
  return (
    <motion.div
      drag
      dragElastic={0.5}
      dragSnapToOrigin
      dragTransition={{ bounceStiffness: 320, bounceDamping: 14 }}
      whileTap={{ cursor: "grabbing" }}
      className="relative bg-champagne p-4 shadow-[0_14px_24px_rgba(0,0,0,0.25)] cursor-grab select-none flex flex-col items-center justify-center aspect-[4/5]"
    >
      <span
        aria-hidden="true"
        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full shadow-md"
        style={{ background: "radial-gradient(circle at 35% 30%, #f3e6c8, #6d2027)" }}
      />
      <p className="font-display text-charcoal text-4xl leading-none">{businessInfo.yearsOfExperience}+</p>
      <p className="font-hand text-charcoal/80 text-xl mt-2 leading-tight text-center">Years In Dewas</p>
    </motion.div>
  );
}

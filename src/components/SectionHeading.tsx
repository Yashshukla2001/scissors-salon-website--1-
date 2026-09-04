import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

/** Consistent eyebrow-label + display-serif heading used at the top of every section. */
export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
  tone = "light",
  className = "",
}: Props) {
  const alignClass = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  const accent = tone === "light" ? "text-champagne" : "text-wine";

  return (
    <div className={`flex flex-col gap-4 ${alignClass} ${className}`}>
      <Reveal>
        <span className={`eyebrow ${accent}`}>{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.04] font-medium text-balance max-w-3xl">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}

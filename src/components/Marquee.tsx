import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  speed?: "normal" | "slow";
  className?: string;
};

/** Duplicates its content to create a seamless CSS-driven infinite loop. */
export default function Marquee({ children, speed = "normal", className = "" }: Props) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className={`inline-flex ${speed === "slow" ? "marquee-track-slow" : "marquee-track"}`}>
        <span className="inline-flex items-center">{children}</span>
        <span className="inline-flex items-center" aria-hidden="true">{children}</span>
      </div>
    </div>
  );
}

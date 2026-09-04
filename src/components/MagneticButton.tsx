import { useRef, type ReactNode, type ElementType } from "react";
import gsap from "gsap";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  as?: ElementType;
  target?: string;
  rel?: string;
};

/** A button that subtly follows the cursor within its bounds, then eases back. */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  as,
  target,
  rel,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = (as || (href ? "a" : "button")) as ElementType;

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: x * 0.28,
      y: y * 0.35,
      duration: 0.5,
      ease: "power3.out",
    });
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  }

  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </Tag>
  );
}

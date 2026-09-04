import { useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";

/**
 * Scopes a GSAP animation block to a ref and guarantees it's reverted
 * (killing tweens + ScrollTriggers created inside) when the component
 * unmounts or dependencies change. Prevents the "orphaned ScrollTrigger"
 * memory leak class of bug.
 */
export function useGsapContext<T extends HTMLElement>(
  callback: (ctx: { el: T }) => void,
  deps: React.DependencyList = []
): RefObject<T | null> {
  const scope = useRef<T | null>(null);

  useLayoutEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context(() => {
      callback({ el: scope.current as T });
    }, scope);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}

export function usePrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

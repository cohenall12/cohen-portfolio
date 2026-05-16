"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ElementType, ReactNode, RefObject } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>(): RefObject<T | null> {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

type RevealProps = {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  delay?: number;
};

export function Reveal({
  as: As = "div",
  className = "",
  style,
  children,
  delay = 0,
}: RevealProps) {
  const ref = useReveal<HTMLElement>();
  return (
    <As
      ref={ref}
      className={"rv " + className}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </As>
  );
}

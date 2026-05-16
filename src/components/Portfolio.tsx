"use client";

import { useEffect } from "react";
import { PORTFOLIO, THEME } from "@/lib/data";
import { GlobalStyles } from "./GlobalStyles";
import { NavBar } from "./NavBar";
import { Hero } from "./Hero";
import {
  CurrentFocus,
  Work,
  Stack,
  Experience,
  Education,
  Contact,
  Footer,
} from "./Sections";

export default function Portfolio() {
  const c = THEME;
  const P = PORTFOLIO;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top, behavior: "smooth" });
      history.replaceState(null, "", "#" + id);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div
      className="cv4-root"
      style={{
        background: c.bg,
        color: c.ink,
        minHeight: "100vh",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Helvetica", "Arial", sans-serif',
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      <GlobalStyles c={c} />

      <NavBar c={c} />

      <Hero c={c} P={P} />
      <CurrentFocus c={c} P={P} />
      <Work c={c} P={P} />
      <Stack c={c} P={P} />
      <Experience c={c} P={P} />
      <Education c={c} P={P} />
      <Contact c={c} P={P} />

      <Footer c={c} P={P} />
    </div>
  );
}

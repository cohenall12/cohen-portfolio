"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { Theme } from "@/lib/data";

const NAV_ITEMS = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function NavBar({ c }: { c: Theme }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("work");
  const [hovered, setHovered] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState({ x: 0, w: 0, visible: false });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      if (!e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.('a[href^="#"]');
      if (a) setMenuOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 64);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_ITEMS.map((i) => i.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.5, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const positionIndicator = useCallback(() => {
    const target = hovered || active;
    const el = itemRefs.current[target];
    if (!el) {
      setIndicator((s) => ({ ...s, visible: false }));
      return;
    }
    setIndicator({ x: el.offsetLeft, w: el.offsetWidth, visible: true });
  }, [hovered, active]);

  useEffect(() => {
    positionIndicator();
  }, [positionIndicator, scrolled]);

  useEffect(() => {
    const onResize = () => positionIndicator();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [positionIndicator]);

  const pillBg = scrolled ? "rgba(24,24,27,0.78)" : "rgba(250,250,249,0.0)";
  const pillFg = scrolled ? "#fafaf9" : c.ink;
  const fadeFg = scrolled ? "rgba(250,250,249,0.62)" : c.muted;
  const indBg = scrolled ? "rgba(255,255,255,0.14)" : "rgba(24,24,27,0.06)";
  const border = scrolled
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid transparent";
  const shadow = scrolled
    ? "0 16px 40px -12px rgba(0,0,0,0.35), 0 4px 14px -4px rgba(0,0,0,0.18)"
    : "0 0 0 transparent";
  const blur = scrolled ? "saturate(160%) blur(18px)" : "saturate(120%) blur(2px)";
  const padX = scrolled ? 10 : 18;
  const innerGap = scrolled ? 4 : 6;
  const itemPadX = scrolled ? 14 : 16;
  const navTop = scrolled ? 14 : 18;
  const height = scrolled ? 44 : 56;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        paddingTop: navTop,
        transition: "padding 480ms cubic-bezier(.2,.7,.2,1)",
      }}
    >
      <nav
        style={{
          pointerEvents: "auto",
          display: "inline-flex",
          flexDirection: isMobile && menuOpen ? "column" : "row",
          alignItems: isMobile && menuOpen ? "stretch" : "center",
          gap: innerGap,
          minHeight: height,
          height: isMobile && menuOpen ? "auto" : height,
          padding: isMobile && menuOpen ? `8px 10px 10px` : `0 ${padX}px`,
          borderRadius: isMobile && menuOpen ? 22 : 999,
          background: pillBg,
          border,
          boxShadow: shadow,
          backdropFilter: blur,
          WebkitBackdropFilter: blur,
          transition: [
            "background 520ms cubic-bezier(.2,.7,.2,1)",
            "color 520ms cubic-bezier(.2,.7,.2,1)",
            "box-shadow 520ms cubic-bezier(.2,.7,.2,1)",
            "border-color 520ms cubic-bezier(.2,.7,.2,1)",
            "border-radius 480ms cubic-bezier(.2,.7,.2,1)",
            "min-height 520ms cubic-bezier(.2,.7,.2,1)",
            "padding 520ms cubic-bezier(.2,.7,.2,1)",
            "gap 520ms cubic-bezier(.2,.7,.2,1)",
          ].join(", "),
          color: pillFg,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            height,
            width: isMobile ? "100%" : "auto",
            justifyContent: isMobile ? "space-between" : "flex-start",
            gap: innerGap,
          }}
        >
          <a
            href="#top"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              paddingLeft: 6,
              paddingRight: scrolled ? 6 : 10,
              height: "100%",
              color: pillFg,
            }}
          >
            <span
              className="mono"
              style={{
                display: "inline-grid",
                placeItems: "center",
                width: 24,
                height: 24,
                borderRadius: 7,
                border: scrolled
                  ? "1px solid rgba(255,255,255,0.22)"
                  : `1px solid ${c.hairStrong}`,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                transition: "border-color 520ms ease",
              }}
            >
              CA
            </span>
            <span
              style={{
                fontSize: 13.5,
                fontWeight: 500,
                letterSpacing: "-0.01em",
                maxWidth: scrolled && !isMobile ? 0 : 200,
                opacity: scrolled && !isMobile ? 0 : 1,
                overflow: "hidden",
                whiteSpace: "nowrap",
                transition:
                  "max-width 520ms cubic-bezier(.2,.7,.2,1), opacity 320ms ease",
              }}
            >
              Cohen Allingham
            </span>
          </a>

          {isMobile && (
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                width: 44,
                height: 44,
                display: "inline-grid",
                placeItems: "center",
                color: pillFg,
                borderRadius: 999,
                background: "transparent",
              }}
            >
              <span
                style={{
                  position: "relative",
                  width: 18,
                  height: 14,
                  display: "inline-block",
                }}
              >
                <span
                  style={hamLine(
                    menuOpen ? "translateY(6px) rotate(45deg)" : "translateY(0)",
                    pillFg
                  )}
                />
                <span
                  style={{
                    ...hamLine("translateY(6px)", pillFg),
                    opacity: menuOpen ? 0 : 1,
                  }}
                />
                <span
                  style={hamLine(
                    menuOpen
                      ? "translateY(6px) rotate(-45deg)"
                      : "translateY(12px)",
                    pillFg
                  )}
                />
              </span>
            </button>
          )}

          {!isMobile && (
            <div
              className="nav-links"
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                height: "100%",
                marginLeft: scrolled ? 6 : 14,
              }}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  display: "block",
                  left: 0,
                  top: "50%",
                  transform: `translate(${indicator.x}px, -50%)`,
                  width: indicator.w,
                  height: scrolled ? 30 : 34,
                  borderRadius: 999,
                  background: indBg,
                  opacity: indicator.visible ? 1 : 0,
                  transition: [
                    "transform 540ms cubic-bezier(.2,.85,.2,1)",
                    "width 540ms cubic-bezier(.2,.85,.2,1)",
                    "height 520ms cubic-bezier(.2,.7,.2,1)",
                    "background 520ms ease",
                    "opacity 220ms ease",
                  ].join(", "),
                  pointerEvents: "none",
                }}
              />
              {NAV_ITEMS.map((it) => {
                const isActive = active === it.id;
                return (
                  <a
                    key={it.id}
                    ref={(el) => {
                      itemRefs.current[it.id] = el;
                    }}
                    href={"#" + it.id}
                    onMouseEnter={() => setHovered(it.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      position: "relative",
                      display: "inline-flex",
                      alignItems: "center",
                      height: "100%",
                      padding: `0 ${itemPadX}px`,
                      fontSize: 13.5,
                      fontWeight: 500,
                      letterSpacing: "-0.005em",
                      color: isActive ? pillFg : fadeFg,
                      transition:
                        "color 260ms ease, padding 520ms cubic-bezier(.2,.7,.2,1)",
                    }}
                  >
                    {it.label}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {isMobile && (
          <div
            style={{
              display: "grid",
              gridTemplateRows: menuOpen ? "1fr" : "0fr",
              overflow: "hidden",
              opacity: menuOpen ? 1 : 0,
              transition:
                "grid-template-rows 420ms cubic-bezier(.2,.7,.2,1), opacity 280ms ease",
              width: "100%",
            }}
          >
            <div style={{ minHeight: 0, overflow: "hidden" }}>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "8px 4px 4px",
                  gap: 2,
                  listStyle: "none",
                  margin: 0,
                }}
              >
                {NAV_ITEMS.map((it) => {
                  const isActive = active === it.id;
                  return (
                    <li key={it.id}>
                      <a
                        href={"#" + it.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          minHeight: 44,
                          padding: "0 14px",
                          fontSize: 15,
                          fontWeight: 500,
                          letterSpacing: "-0.005em",
                          color: isActive ? pillFg : fadeFg,
                          background: isActive ? indBg : "transparent",
                          borderRadius: 12,
                        }}
                      >
                        {it.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

function hamLine(transform: string, color: string): CSSProperties {
  return {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: 1.5,
    background: color,
    borderRadius: 2,
    transform,
    transformOrigin: "center",
    transition:
      "transform 320ms cubic-bezier(.2,.7,.2,1), opacity 220ms ease, background 360ms ease",
  };
}

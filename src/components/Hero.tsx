"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { PortfolioData, TerminalLine, Theme } from "@/lib/data";
import { Reveal } from "./Reveal";

export function Hero({ c, P }: { c: Theme; P: PortfolioData }) {
  return (
    <section
      id="top"
      className="section"
      style={{ paddingTop: 168, paddingBottom: 96 }}
    >
      <div className="wrap">
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1.05fr)",
            gap: 64,
            alignItems: "center",
          }}
        >
          <div>
            <Reveal>
              <div
                className="mono"
                style={{
                  fontSize: 12,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: c.softer,
                  marginBottom: 24,
                }}
              >
                Cohen Allingham · Christchurch, NZ
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1
                className="hero-headline balance"
                style={{
                  fontSize: "clamp(48px, 6.4vw, 88px)",
                  lineHeight: 0.98,
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                  color: c.ink,
                  marginBottom: 28,
                }}
              >
                Mechatronics<span style={{ color: c.quiet }}> + </span>AI&nbsp;systems.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p
                className="pretty"
                style={{
                  fontSize: 18,
                  lineHeight: 1.55,
                  color: c.muted,
                  fontWeight: 400,
                  marginBottom: 24,
                  maxWidth: 520,
                }}
              >
                {P.hero.sub}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div
                className="mono"
                style={{
                  fontSize: 12,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: c.softer,
                  marginBottom: 36,
                  fontWeight: 400,
                }}
              >
                3rd year Mechatronics at UC. Prior intern at Davin Industries.
                First paying AI client in 2026.
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div
                className="hero-ctas"
                style={{
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <a href={P.hero.primaryCta.href} className="btn btn-primary">
                  {P.hero.primaryCta.label}
                  <span className="arr-r" aria-hidden>
                    →
                  </span>
                </a>
                <a href={P.hero.secondaryCta.href} className="btn btn-ghost">
                  {P.hero.secondaryCta.label}
                </a>
                <a
                  href={P.hero.tertiaryCta.href}
                  className="btn btn-text"
                  style={{
                    marginLeft: 6,
                    height: 44,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {P.hero.tertiaryCta.label}
                  <span className="arr-r" aria-hidden>
                    ↓
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <TerminalCard c={c} lines={P.terminalLines} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TerminalCard({ c, lines }: { c: Theme; lines: TerminalLine[] }) {
  return (
    <div
      style={{
        borderRadius: 16,
        overflow: "hidden",
        background: c.termBg,
        border: `1px solid ${c.hair}`,
        boxShadow:
          "0 40px 80px -36px rgba(24,24,27,0.32), " +
          "0 12px 28px -12px rgba(24,24,27,0.16)",
      }}
    >
      <TermStyles />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "11px 14px",
          background: c.termHead,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", gap: 7 }}>
          <span style={dot("#ff5f57")} />
          <span style={dot("#febc2e")} />
          <span style={dot("#28c840")} />
        </div>
        <div
          className="mono"
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 11.5,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.02em",
          }}
        >
          cohen@allingham — ~ — zsh
        </div>
        <div style={{ width: 54 }} />
      </div>
      <div
        className="cv4-term-body"
        style={{
          padding: "22px 24px 26px",
          minHeight: 380,
        }}
      >
        <TerminalTyped c={c} lines={lines} />
      </div>
    </div>
  );
}

function TermStyles() {
  return (
    <style>{`
      @media (max-width: 760px) {
        .cv4-root .cv4-term-body { min-height: 280px !important; }
      }
    `}</style>
  );
}

type ShownLine =
  | { p: string; c: string; blink?: boolean }
  | { o: string };

function TerminalTyped({ c, lines }: { c: Theme; lines: TerminalLine[] }) {
  const staticShown = useMemo<ShownLine[]>(() => [], []);
  const [shown, setShown] = useState<ShownLine[]>(staticShown);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    const run = async () => {
      await new Promise((r) => setTimeout(r, 380));
      while (!cancelled && i < lines.length) {
        const ln = lines[i];
        await new Promise((r) =>
          setTimeout(r, ("delay" in ln && ln.delay) || 280)
        );
        if ("c" in ln) {
          if (ln.c === "_") {
            setShown((s) => [...s, { p: ln.p, c: "", blink: true }]);
          } else {
            for (let k = 0; k < ln.c.length; k++) {
              if (cancelled) return;
              setTyping(ln.c.slice(0, k + 1));
              await new Promise((r) => setTimeout(r, 22 + Math.random() * 30));
            }
            setShown((s) => [
              ...s,
              { p: ln.p, c: ln.c, blink: ln.blink ?? false },
            ]);
            setTyping("");
          }
        } else {
          setShown((s) => [...s, ln]);
        }
        i++;
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [lines]);

  return (
    <div
      className="mono"
      style={{
        fontSize: 13,
        lineHeight: 1.75,
        color: c.termFg,
      }}
    >
      {shown.map((ln, i) => (
        <div key={i}>
          {"c" in ln ? (
            <span>
              <span style={{ color: c.termAccent }}>{ln.p}</span>
              <span>{ln.c}</span>
              {ln.blink && <BlinkCursor color={c.termAccent} />}
            </span>
          ) : (
            <span style={{ color: c.termMuted }}>{ln.o}</span>
          )}
        </div>
      ))}
      {typing && (
        <div>
          <span style={{ color: c.termAccent }}>$ </span>
          <span>{typing}</span>
          <BlinkCursor color={c.termAccent} />
        </div>
      )}
    </div>
  );
}

function BlinkCursor({ color }: { color: string }) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setOn((o) => !o), 530);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      style={{
        display: "inline-block",
        width: 7,
        height: 14,
        verticalAlign: "-2px",
        marginLeft: 3,
        background: on ? color : "transparent",
      }}
    />
  );
}

function dot(color: string): CSSProperties {
  return {
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: color,
    boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.18)",
    display: "inline-block",
  };
}

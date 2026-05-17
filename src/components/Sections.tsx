"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ReactNode } from "react";
import type {
  PortfolioData,
  Project,
  Theme,
  TimelineEntry,
} from "@/lib/data";
import { Reveal, useReveal } from "./Reveal";

function useCopyFeedback(): readonly [boolean, (text: string) => Promise<void>] {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  return [copied, copy] as const;
}

function CopyEmail({ email, c }: { email: string; c: Theme }) {
  const [copied, copy] = useCopyFeedback();

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: 12,
        marginBottom: 36,
      }}
    >
      <a
        href={"mailto:" + email}
        onClick={(e) => {
          e.preventDefault();
          copy(email);
        }}
        aria-label={`Copy email ${email} to clipboard`}
        className="mono"
        style={{
          display: "inline-block",
          fontSize: 15,
          color: c.ink,
          letterSpacing: "-0.005em",
          borderBottom: `1px solid ${c.hairStrong}`,
          paddingBottom: 2,
          cursor: "pointer",
          transition: "border-color .2s ease",
        }}
      >
        {email}
      </a>
      <span
        className="mono"
        aria-live="polite"
        style={{
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: c.softer,
          opacity: copied ? 1 : 0,
          transform: copied ? "translateY(0)" : "translateY(-2px)",
          transition: "opacity .2s ease, transform .2s ease",
        }}
      >
        Copied
      </span>
    </div>
  );
}

function EmailButton({
  href,
  email,
  label,
  primary,
}: {
  href: string;
  email: string;
  label: string;
  primary?: boolean;
}) {
  const [copied, copy] = useCopyFeedback();
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        copy(email);
      }}
      aria-label={`Copy email ${email} to clipboard`}
      className={"btn " + (primary ? "btn-primary" : "btn-ghost")}
    >
      <span
        style={{
          display: "inline-block",
          minWidth: 52,
          textAlign: "center",
        }}
      >
        {copied ? "Copied" : label}
      </span>
      {!copied && primary && (
        <span className="arr-r" aria-hidden>
          →
        </span>
      )}
    </a>
  );
}

function SectionHeader({
  c,
  no,
  title,
  right,
}: {
  c: Theme;
  no: string;
  title: string;
  right?: ReactNode;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="rv hair-draw"
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        paddingBottom: 22,
        marginBottom: 36,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
        <span className="label" style={{ color: c.quiet }}>
          {no}
        </span>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "-0.018em",
            color: c.ink,
          }}
        >
          {title}
        </h2>
      </div>
      {right && <span className="label">{right}</span>}
    </div>
  );
}

export function CurrentFocus({ c, P }: { c: Theme; P: PortfolioData }) {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHeader c={c} no="01" title={P.current.title} right="Now" />
        <div
          className="grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 1fr",
            gap: 64,
            alignItems: "start",
          }}
        >
          <Reveal>
            <p
              className="pretty"
              style={{
                fontSize: 22,
                lineHeight: 1.42,
                fontWeight: 400,
                letterSpacing: "-0.012em",
                color: c.ink,
              }}
            >
              {P.current.body}
            </p>
          </Reveal>
          <div
            className="pillars"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 14,
            }}
          >
            {P.current.pillars.map((pi, i) => (
              <Reveal key={i} delay={120 + i * 90}>
                <div
                  className="pillar-card"
                  style={{
                    padding: "20px 22px",
                    background: c.surface,
                    border: `1px solid ${c.hair}`,
                    borderRadius: 12,
                  }}
                >
                  <div
                    className="mono"
                    style={{
                      fontSize: 10.5,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: c.softer,
                      marginBottom: 8,
                    }}
                  >
                    {pi.tag}
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      lineHeight: 1.5,
                      color: c.inkSoft,
                    }}
                  >
                    {pi.line}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Work({ c, P }: { c: Theme; P: PortfolioData }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  return (
    <section id="work" className="section">
      <style>{`
        .cv4-root .kanban {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-auto-rows: min-content;
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 960px) {
          .cv4-root .kanban { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 640px) {
          .cv4-root .kanban { grid-template-columns: 1fr; }
        }
        .cv4-root .kslot {
          position: relative;
          align-self: start;
          border-radius: 16px;
          outline: none;
        }
        .cv4-root .kslot:focus-visible {
          box-shadow: 0 0 0 2px ${c.bg}, 0 0 0 4px ${c.ink};
        }
        .cv4-root .kcard {
          position: relative;
          background: ${c.surface};
          border: 1px solid ${c.hair};
          border-radius: 16px;
          padding: 22px 22px 24px;
          display: flex; flex-direction: column;
          min-height: 280px;
          transition:
            box-shadow .55s cubic-bezier(.22,.61,.36,1),
            border-color .35s ease,
            transform .45s cubic-bezier(.22,.61,.36,1);
          will-change: transform, box-shadow;
        }
        .cv4-root .kslot.is-active .kcard,
        .cv4-root .kslot:hover .kcard,
        .cv4-root .kslot:focus-within .kcard {
          border-color: ${c.hairStrong};
          box-shadow:
            0 50px 100px -40px rgba(24,24,27,0.28),
            0 18px 36px -16px rgba(24,24,27,0.16);
          transform: translateY(-2px);
        }
        .cv4-root .kdetails {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          overflow: hidden;
          margin-top: 0;
          padding-top: 0;
          border-top: 1px solid transparent;
          transition:
            grid-template-rows .55s cubic-bezier(.22,.61,.36,1),
            opacity .4s ease,
            margin-top .45s ease,
            padding-top .45s ease,
            border-top-color .35s ease;
        }
        .cv4-root .kdetails > .kdetails-inner {
          min-height: 0;
          overflow: hidden;
        }
        .cv4-root .kslot.is-active .kdetails,
        .cv4-root .kslot:hover .kdetails,
        .cv4-root .kslot:focus-within .kdetails {
          grid-template-rows: 1fr;
          opacity: 1;
          margin-top: 18px;
          padding-top: 18px;
          border-top-color: ${c.hair};
          transition:
            grid-template-rows .55s cubic-bezier(.22,.61,.36,1),
            opacity .45s ease .1s,
            margin-top .4s ease,
            padding-top .4s ease,
            border-top-color .3s ease;
        }
        .cv4-root .kdetails-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 16px;
          align-items: start;
        }
        .cv4-root .kpreview {
          aspect-ratio: 16 / 9;
          border-radius: 10px;
          border: 1px solid ${c.hair};
          width: 100%;
          max-height: 180px;
          overflow: hidden;
          position: relative;
        }
        .cv4-root .kpreview.is-placeholder {
          background: repeating-linear-gradient(45deg, ${c.panel} 0 10px, ${c.surface} 10px 20px);
          display: grid; place-items: center;
        }
        .cv4-root .kchip {
          font-size: 10.5px; letter-spacing: 0.06em;
          padding: 4px 9px;
          border-radius: 999px;
          border: 1px solid ${c.hair};
          color: ${c.softer};
          background: ${c.bg};
          white-space: nowrap;
        }
        .cv4-root .kindex {
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          color: ${c.quiet};
        }
        .cv4-root .kstatus {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10.5px; letter-spacing: 0.04em;
          color: ${c.softer};
        }
        .cv4-root .kchev {
          display: none;
          font-size: 13px;
          color: ${c.softer};
          transition: transform .35s cubic-bezier(.22,.61,.36,1), color .25s ease;
          line-height: 1;
        }
        @media (max-width: 640px) {
          .cv4-root .kchev { display: inline-block; }
          .cv4-root .kslot.is-active .kchev { transform: rotate(180deg); color: ${c.ink}; }
        }
      `}</style>
      <div className="wrap">
        <SectionHeader
          c={c}
          no="02"
          title="Selected work"
          right={`${P.projects.length} projects`}
        />
        <div className="kanban">
          {P.projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 70}>
              <KanbanCard
                p={p}
                c={c}
                index={i}
                isActive={activeId === p.id}
                onToggle={() =>
                  setActiveId((id) => (id === p.id ? null : p.id))
                }
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function KanbanCard({
  p,
  c,
  index,
  isActive,
  onToggle,
}: {
  p: Project;
  c: Theme;
  index: number;
  isActive: boolean;
  onToggle: () => void;
}) {
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };
  return (
    <div
      className={"kslot" + (isActive ? " is-active" : "")}
      tabIndex={0}
      role="button"
      aria-expanded={isActive}
      onClick={onToggle}
      onKeyDown={onKey}
    >
      <article className="kcard">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <span className="kindex mono">0{index + 1}</span>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <span className="kstatus mono">{p.status}</span>
            <span className="kchev mono" aria-hidden>
              ↓
            </span>
          </div>
        </div>
        <h3
          style={{
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: "-0.018em",
            color: c.ink,
            marginBottom: 8,
            lineHeight: 1.2,
          }}
        >
          {p.name}
        </h3>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.5,
            color: c.muted,
            marginBottom: 14,
            flex: "0 0 auto",
          }}
        >
          {p.desc}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginTop: "auto",
          }}
        >
          {p.tag.map((t, ti) => (
            <span key={ti} className="kchip mono">
              {t}
            </span>
          ))}
        </div>

        <div className="kdetails">
          <div className="kdetails-inner">
            <div className="kdetails-grid">
              <div>
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: c.inkSoft,
                  }}
                >
                  {p.details}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginTop: 14,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      fontSize: 10.5,
                      color: c.softer,
                      letterSpacing: "0.10em",
                      textTransform: "uppercase",
                    }}
                  >
                    {p.type}
                  </span>
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mono"
                      style={{
                        fontSize: 10.5,
                        color: c.ink,
                        letterSpacing: "0.10em",
                        textTransform: "uppercase",
                        borderBottom: `1px solid ${c.hairStrong}`,
                        paddingBottom: 1,
                      }}
                    >
                      View on GitHub ↗
                    </a>
                  )}
                </div>
              </div>
              <div
                className={"kpreview" + (p.image ? "" : " is-placeholder")}
              >
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.name + " screenshot"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
                    style={{ objectFit: "cover", borderRadius: 10 }}
                  />
                ) : (
                  <span
                    className="mono"
                    style={{
                      fontSize: 10.5,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: c.softer,
                      background: c.surface,
                      padding: "5px 11px",
                      borderRadius: 999,
                      border: `1px solid ${c.hair}`,
                    }}
                  >
                    screenshot · {p.name.toLowerCase().slice(0, 22)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export function Stack({ c, P }: { c: Theme; P: PortfolioData }) {
  const groups = [
    {
      title: "Building with now",
      items: P.stack.using,
      note: "Daily, current work.",
    },
    {
      title: "Engineering base",
      items: P.stack.base,
      note: "Mechatronics fundamentals.",
    },
  ];
  return (
    <section id="stack" className="section">
      <div className="wrap">
        <SectionHeader c={c} no="03" title="Stack" right="grouped by use" />
        <div
          className="grid-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 0,
            borderTop: `1px solid ${c.hair}`,
          }}
        >
          {groups.map((g, gi) => (
            <Reveal key={gi} delay={gi * 100}>
              <div
                className="stack-col"
                style={{
                  padding: "28px 28px 32px",
                  borderRight: gi < 1 ? `1px solid ${c.hair}` : "none",
                  borderBottom: `1px solid ${c.hair}`,
                  height: "100%",
                }}
              >
                <div
                  className="mono"
                  style={{
                    fontSize: 10.5,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: c.quiet,
                    marginBottom: 18,
                  }}
                >
                  {g.title}
                </div>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {g.items.map((s, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: 15,
                        color: c.ink,
                        letterSpacing: "-0.005em",
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <div
                  style={{ fontSize: 12.5, color: c.softer, marginTop: 22 }}
                >
                  {g.note}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HistoryList({ c, items }: { c: Theme; items: TimelineEntry[] }) {
  return (
    <ul style={{ borderTop: `1px solid ${c.hair}` }}>
      {items.map((e, i) => (
        <Reveal
          as="li"
          key={i}
          delay={i * 80}
          className="tl-row"
          style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: 32,
            alignItems: "baseline",
            padding: "22px 0",
            borderBottom: `1px solid ${c.hair}`,
          }}
        >
          <span
            className="mono"
            style={{
              fontSize: 12,
              color: c.softer,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {e.date}
          </span>
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 500,
                letterSpacing: "-0.012em",
                color: c.ink,
                marginBottom: 4,
              }}
            >
              {e.title}
            </div>
            <div style={{ fontSize: 14.5, color: c.muted, lineHeight: 1.55 }}>
              {e.sub}
            </div>
            {e.location && (
              <div
                className="mono"
                style={{
                  fontSize: 12,
                  color: c.softer,
                  lineHeight: 1.55,
                  marginTop: 6,
                  letterSpacing: "0.04em",
                }}
              >
                {e.location}
              </div>
            )}
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

export function Experience({ c, P }: { c: Theme; P: PortfolioData }) {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <SectionHeader c={c} no="04" title="Experience" />
        <HistoryList c={c} items={P.experience} />
      </div>
    </section>
  );
}

export function Education({ c, P }: { c: Theme; P: PortfolioData }) {
  return (
    <section id="education" className="section">
      <div className="wrap">
        <SectionHeader c={c} no="05" title="Education" />
        <HistoryList c={c} items={P.education} />
      </div>
    </section>
  );
}

export function Contact({ c, P }: { c: Theme; P: PortfolioData }) {
  return (
    <section
      id="contact"
      className="section"
      style={{ paddingTop: 120, paddingBottom: 140 }}
    >
      <div className="wrap">
        <Reveal>
          <span className="label" style={{ color: c.quiet }}>
            06 — Contact
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h2
            className="balance"
            style={{
              fontSize: "clamp(32px, 6vw, 72px)",
              lineHeight: 1.0,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              color: c.ink,
              marginTop: 20,
              marginBottom: 28,
              maxWidth: 900,
            }}
          >
            {P.contact.title}
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p
            className="pretty narrow"
            style={{
              fontSize: 19,
              lineHeight: 1.55,
              color: c.muted,
              marginBottom: 28,
            }}
          >
            {P.contact.body}
          </p>
        </Reveal>
        <Reveal delay={170}>
          <CopyEmail email={P.email} c={c} />
        </Reveal>
        <Reveal delay={200}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {P.contact.actions.map((a, i) => {
              if (a.href.startsWith("mailto:")) {
                return (
                  <EmailButton
                    key={i}
                    href={a.href}
                    email={P.email}
                    label={a.label}
                    primary={a.primary}
                  />
                );
              }
              const isExternal = a.href.startsWith("http") || a.href.endsWith(".pdf");
              return (
                <a
                  key={i}
                  href={a.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className={"btn " + (a.primary ? "btn-primary" : "btn-ghost")}
                >
                  {a.label}
                  {a.primary && (
                    <span className="arr-r" aria-hidden>
                      →
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer({ c, P }: { c: Theme; P: PortfolioData }) {
  return (
    <footer style={{ borderTop: `1px solid ${c.hair}` }}>
      <div
        className="wrap"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 64,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span
          className="mono"
          style={{
            fontSize: 11,
            color: c.softer,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          © 2026 Cohen Allingham · {P.location}
        </span>
        <a
          href="#contact"
          className="mono"
          style={{
            fontSize: 11,
            color: c.quiet,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Get in touch ↗
        </a>
      </div>
    </footer>
  );
}

"use client";

import type { Theme } from "@/lib/data";

export function GlobalStyles({ c }: { c: Theme }) {
  return (
    <style>{`
      .cv4-root *, .cv4-root *::before, .cv4-root *::after { box-sizing: border-box; }
      .cv4-root h1, .cv4-root h2, .cv4-root h3, .cv4-root h4, .cv4-root p, .cv4-root ul, .cv4-root li { margin: 0; padding: 0; }
      .cv4-root ul { list-style: none; }
      .cv4-root a { color: inherit; text-decoration: none; }
      .cv4-root button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; padding: 0; }
      .cv4-root .mono { font-family: var(--font-mono), ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, monospace; }
      .cv4-root .wrap { max-width: 1180px; margin: 0 auto; padding: 0 32px; }
      .cv4-root .narrow { max-width: 720px; }
      .cv4-root .label {
        font-family: var(--font-mono), ui-monospace, SFMono-Regular, "JetBrains Mono", Menlo, monospace;
        font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
        color: ${c.softer};
      }
      .cv4-root .pretty { text-wrap: pretty; }
      .cv4-root .balance { text-wrap: balance; }
      .cv4-root .section { padding: 112px 0; position: relative; }
      .cv4-root .section + .section { border-top: 1px solid ${c.hair}; }

      .cv4-root .rv { opacity: 0; transform: translateY(14px); transition: opacity .9s ease, transform .9s cubic-bezier(.2,.7,.2,1); }
      .cv4-root .rv.in { opacity: 1; transform: none; }

      .cv4-root .hair-draw { position: relative; }
      .cv4-root .hair-draw::after {
        content: ""; position: absolute; left: 0; right: 0; bottom: 0;
        height: 1px; background: ${c.hair};
        transform: scaleX(0); transform-origin: left center;
        transition: transform 1.1s cubic-bezier(.2,.7,.2,1);
      }
      .cv4-root .hair-draw.in::after { transform: scaleX(1); }

      @keyframes cv4Blink { 0%, 55% { opacity: 1; } 70%, 100% { opacity: 0.25; } }

      .cv4-root .btn {
        display: inline-flex; align-items: center; gap: 8px;
        height: 44px; padding: 0 20px;
        font-size: 14.5px; font-weight: 500; letter-spacing: -0.005em;
        border-radius: 999px; cursor: pointer;
        transition: background .18s ease, color .18s ease, border-color .18s ease, transform .25s cubic-bezier(.2,.7,.2,1);
        white-space: nowrap;
      }
      .cv4-root .btn-primary { background: ${c.ink}; color: ${c.bg}; border: 1px solid ${c.ink}; }
      .cv4-root .btn-primary:hover, .cv4-root .btn-primary:focus-visible { background: #000; outline: none; }
      .cv4-root .btn-ghost { background: transparent; color: ${c.ink}; border: 1px solid ${c.hairStrong}; }
      .cv4-root .btn-ghost:hover, .cv4-root .btn-ghost:focus-visible { border-color: ${c.ink}; outline: none; }
      .cv4-root .btn-text { padding: 0; height: auto; color: ${c.muted}; border: 0; background: transparent; }
      .cv4-root .btn-text:hover, .cv4-root .btn-text:focus-visible { color: ${c.ink}; outline: none; }

      .cv4-root .arr { transition: transform .28s cubic-bezier(.2,.7,.2,1); display: inline-block; }
      .cv4-root .btn:hover .arr, .cv4-root .btn:focus-visible .arr,
      .cv4-root .proj:hover .arr, .cv4-root .proj:focus-within .arr,
      .cv4-root .link:hover .arr, .cv4-root .link:focus-visible .arr { transform: translate(3px, -3px); }
      .cv4-root .arr-r { transition: transform .28s cubic-bezier(.2,.7,.2,1); display: inline-block; }
      .cv4-root .btn:hover .arr-r, .cv4-root .btn:focus-visible .arr-r,
      .cv4-root .link:hover .arr-r, .cv4-root .link:focus-visible .arr-r { transform: translateX(3px); }

      .cv4-root .link {
        display: inline-flex; align-items: center; gap: 6px;
        font-size: 14px; color: ${c.ink}; font-weight: 500;
        border-bottom: 1px solid ${c.hairStrong};
        padding-bottom: 1px;
      }
      .cv4-root .link:hover, .cv4-root .link:focus-visible { border-color: ${c.ink}; outline: none; }

      .cv4-root .proj { transition: background .25s ease; }
      .cv4-root .proj:hover, .cv4-root .proj:focus-within { background: ${c.surface}; }

      @media (max-width: 960px) {
        .cv4-root .hero-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
        .cv4-root .hero-headline { font-size: 56px !important; }
      }
      @media (max-width: 760px) {
        .cv4-root .section { padding: 80px 0; }
        .cv4-root .hero-headline { font-size: 44px !important; }
        .cv4-root .grid-2 { grid-template-columns: 1fr !important; gap: 40px !important; }
        .cv4-root .grid-3 {
          grid-template-columns: 1fr !important;
          border-top: none !important;
        }
        .cv4-root .pillars { grid-template-columns: 1fr !important; }
        .cv4-root .grid-3 .stack-col {
          border-right: none !important;
          border-bottom: 1px solid var(--cv4-hair, rgba(24,24,27,0.10)) !important;
        }
        .cv4-root .grid-3 .stack-col:last-child {
          border-bottom: none !important;
        }
        .cv4-root .tl-row {
          grid-template-columns: 1fr !important;
          gap: 8px !important;
        }
      }
      @media (max-width: 640px) {
        .cv4-root .pillar-card {
          padding: 16px 18px !important;
        }
      }
      @media (max-width: 420px) {
        .cv4-root .hero-ctas {
          flex-direction: column !important;
          align-items: stretch !important;
        }
        .cv4-root .hero-ctas .btn {
          justify-content: center;
        }
        .cv4-root .hero-ctas .btn-text {
          justify-content: center;
          margin-left: 0 !important;
        }
      }
    `}</style>
  );
}

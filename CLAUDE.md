# Cohen Allingham — Personal Portfolio (CLAUDE.md)

> Repo-level guide for Claude Code. Loaded at the start of every session in this directory.

## What this is

Personal portfolio site for internship hunting + university project documentation. Single-page React app, statically pre-rendered, with rich client-side interactivity (animated terminal, morphing pill nav, kanban project grid with hover-expand, scroll-reveal everywhere).

- **Primary file:** [src/app/page.tsx](src/app/page.tsx) renders [src/components/Portfolio.tsx](src/components/Portfolio.tsx).
- **Source of design:** [_design_bundle/](_design_bundle/) — the original Claude Design handoff (HTML/JSX prototype + 9 chat transcripts of design iteration). Read this only if you need to recover original intent.
- **Source of project context:** [PROJECT.md](PROJECT.md) — strategic doc (NB: written pre-design; framework defaults inside are stale, the design override below is canonical).

## Stack

- **Next.js 16.2** App Router + Turbopack — `npm run dev`, `npm run build`
- **TypeScript** (strict mode via Next defaults)
- **React 19**
- **next/font** → JetBrains Mono via CSS variable `--font-mono`
- **next/image** for the project screenshots
- **No CSS framework.** All styling is inline `style={{}}` + scoped `<style>` blocks under the `.cv4-root` class. This is deliberate: the design uses computed values (e.g. `scrolled ? X : Y`) interpolated everywhere, and tailwind-style class concatenation would be uglier than the current code. Don't migrate to Tailwind without strong cause.
- **No external state lib.** Plain `useState` / `useEffect` / `useRef`.
- **No data fetching layer yet.** Portfolio content is hardcoded in [src/lib/data.ts](src/lib/data.ts). Notion CMS integration is planned (see PROJECT.md) but not built.

## File map

```
src/
├── app/
│   ├── layout.tsx          ← root layout, font setup, metadata
│   ├── page.tsx            ← thin shell, renders <Portfolio />
│   └── globals.css         ← minimal reset (body bg, font smoothing, selection)
├── components/
│   ├── Portfolio.tsx       ← root client component; wires GlobalStyles + NavBar + Hero + sections
│   ├── GlobalStyles.tsx    ← scoped CSS for .cv4-root (typography, buttons, responsive)
│   ├── Reveal.tsx          ← useReveal hook (IntersectionObserver) + <Reveal> wrapper
│   ├── NavBar.tsx          ← morphing pill nav with sliding active indicator + mobile menu
│   ├── Hero.tsx            ← two-column hero + animated terminal (TerminalCard/Typed/BlinkCursor)
│   └── Sections.tsx        ← CurrentFocus / Work + KanbanCard / Stack / Experience / Education / Contact / Footer
└── lib/
    └── data.ts             ← PORTFOLIO content + THEME color tokens + TypeScript types

public/
└── images/                 ← project screenshots referenced by src/lib/data.ts
```

## Conventions

- **Client components everywhere** — the entire portfolio is interactive, so `Portfolio.tsx` is `"use client"` and everything imported from it inherits client rendering. Don't add `"use client"` to `page.tsx` or `layout.tsx`.
- **Theme tokens** in `THEME` (from `data.ts`) flow as a `c: Theme` prop. Never hardcode hex colors in components — always pull from `c.ink`, `c.muted`, etc.
- **Portfolio content** flows as a `P: PortfolioData` prop. Single source of truth for the user-facing text.
- **Animations are load-bearing.** The morphing nav, terminal typewriter, kanban hover-expand, scroll reveals, and hairline draw-ins are the design's personality. Don't simplify them away. If you need to change them, read the original JSX in [_design_bundle/personal-website/project/](_design_bundle/personal-website/project/) first.
- **Mobile breakpoints:** 960px (hero collapse → 2-col), 760px (full mobile), 640px (kanban → 1-col), 420px (CTA stack). Media queries live in `GlobalStyles.tsx` and component-scoped `<style>` blocks.

## Commands

```bash
npm run dev      # Next.js dev server on :3000 (Turbopack)
npm run build    # Production build + type check
npm start        # Run prod build
npm run lint     # ESLint via eslint-config-next
```

## Known TODOs in content

These live in [src/lib/data.ts](src/lib/data.ts) and need real values before this site ships publicly:

- `github` handle — currently `github.com/cohenall12` (placeholder)
- `linkedin` handle — currently `linkedin.com/in/cohenallingham` (placeholder, check it resolves)
- `cvHref` / Download CV button — currently `#`; master CV lives at `Personal/University/Internships/Documents/00-Current/CV/Cohen-Allingham-master-CV.docx` (no PDF yet)
- Education claims `Top 10% engineering student` — CV records GPA 8.19; verify "top 10%" framing
- NCEA Level 3 `Merit endorsement` — not corroborated in obsidian/CV, treat as user's claim

## What lives outside this repo

- **Project context + brand voice:** Obsidian vault at `/Users/cohen/Obsidian Vaults/Cohen2/Areas/Cohen/_context/` (auto-loaded into every Claude session via global CLAUDE.md). Voice guide: `voice.md`. Bio: `me.md` / `about-me.md`.
- **Master CV:** `/Users/cohen/Workspaces/Cohen-AI/Personal/University/Internships/Documents/00-Current/CV/Cohen-Allingham-master-CV.md`
- **University coursework:** `/Users/cohen/Workspaces/Cohen-AI/Personal/University/Courses/` (ENCE361, ENMT301, ENEL373, etc.)
- **AIOS (separate ecosystem):** `/Users/cohen/Workspaces/Cohen-AI/Company-OS/AIOS/`
- **Design source:** `_design_bundle/` inside this repo (Claude Design handoff with chat transcripts).

## What this site is NOT

- Not the Cohen-AI business/agency site (separate future project at `Cohen-AI/Business/Website/`).
- Not a blog, not e-commerce, no auth, no analytics beyond Vercel defaults.
- Not yet wired to Notion as a CMS — content is hardcoded in `src/lib/data.ts`.

## Working style reminders

- Lead with action, not status summaries.
- Short responses unless complexity warrants detail.
- Don't change content data without confirming with Cohen — the portfolio data is the source of truth Cohen approved in the Claude Design tool.
- Match existing code style (inline styles + scoped CSS-in-string). Don't refactor away the design's structural choices unless asked.

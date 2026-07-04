# Cohen Allingham — Personal Portfolio (CLAUDE.md)

@AGENTS.md

> Repo-level guide for Claude Code, loaded for every session in this directory. Content TODOs live in [TODO.md](TODO.md), not here.

## What this is

Personal portfolio site for internship hunting + university project documentation. Single-page React app, statically pre-rendered, with rich client-side interactivity (animated terminal, morphing pill nav, kanban project grid with hover-expand, scroll-reveal everywhere).

- **Primary file:** [src/app/page.tsx](src/app/page.tsx) renders [src/components/Portfolio.tsx](src/components/Portfolio.tsx).
- **Source of design:** [_design_bundle/](_design_bundle/) — the original Claude Design handoff (HTML/JSX prototype + chat transcripts). Read only to recover original intent.
- **Source of project context:** [PROJECT.md](PROJECT.md) — strategic doc (written pre-design; framework defaults inside are stale, this file is canonical).

## Stack

- **Next.js 16.2** App Router + Turbopack — `npm run dev`, `npm run build`
- **TypeScript** (strict via Next defaults) · **React 19**
- **next/font** → JetBrains Mono via CSS variable `--font-mono` · **next/image** for screenshots
- **No CSS framework.** All styling is inline `style={{}}` + scoped `<style>` blocks under `.cv4-root`. Deliberate: the design interpolates computed values everywhere. Don't migrate to Tailwind without strong cause.
- **No external state lib.** Plain `useState` / `useEffect` / `useRef`.
- **No data fetching layer.** Content is hardcoded in [src/lib/data.ts](src/lib/data.ts).

## File map

```
src/
├── app/
│   ├── layout.tsx          ← root layout, font setup, metadata
│   ├── page.tsx            ← thin shell, renders <Portfolio />
│   └── globals.css         ← minimal reset
├── components/
│   ├── Portfolio.tsx       ← root client component; wires GlobalStyles + NavBar + Hero + sections
│   ├── GlobalStyles.tsx    ← scoped CSS for .cv4-root (typography, buttons, responsive)
│   ├── Reveal.tsx          ← useReveal hook (IntersectionObserver) + <Reveal> wrapper
│   ├── NavBar.tsx          ← morphing pill nav + mobile menu
│   ├── Hero.tsx            ← two-column hero + animated terminal
│   └── Sections.tsx        ← CurrentFocus / Work / Stack / Experience / Education / Contact / Footer
└── lib/
    └── data.ts             ← PORTFOLIO content + THEME tokens + types

public/images/              ← project screenshots referenced by data.ts
```

## Conventions

- **Client components everywhere** — `Portfolio.tsx` is `"use client"`; don't add it to `page.tsx` or `layout.tsx`.
- **Theme tokens** flow as a `c: Theme` prop — never hardcode hex; pull from `c.ink`, `c.muted`, etc.
- **Portfolio content** flows as a `P: PortfolioData` prop — single source of truth for user-facing text. **Never change content data without Cohen's confirm** — data.ts is the copy he approved.
- **Animations are load-bearing** — the morphing nav, terminal typewriter, kanban hover-expand, scroll reveals are the design's personality. Don't simplify them away; read the original JSX in `_design_bundle/` before changing them.
- **Mobile breakpoints:** 960px (hero collapse), 760px (full mobile), 640px (kanban 1-col), 420px (CTA stack).

## Commands

```bash
npm run dev      # dev server on :3000 (Turbopack)
npm run build    # production build + type check
npm start        # run prod build
npm run lint     # ESLint via eslint-config-next
```

## Pointers (live)

- Master CV: `~/Workspaces/Personal/university/Internships/Documents/00-Current/CV/`
- Voice for site copy: `~/Workspaces/Personal/university/Internships/Evidence-Bank/writing-style.md` (the old Vault voice docs are frozen and inaccurate — never use them)

## What this site is NOT

- Not the True Delta company site (separate project in the Business root).
- Not a blog, not e-commerce, no auth, no analytics beyond Vercel defaults.
- Not wired to Notion as a CMS — content is hardcoded in data.ts.

## Deploy preflight (Vercel) — each item bit a past deploy

1. **`package.json` `name` is lowercase-kebab-case** — capitals break create-next-app and surface obscure Vercel errors.
2. **Framework preset explicitly `nextjs`** — auto-detect has misfired before (404s on the deployed URL). Confirm via `vercel project inspect`.
3. **Deployment protection flag correct** — hobby-tier default gates the URL behind Vercel SSO (401). For a public portfolio set protection to "Only Preview Deployments" or "Disabled".
4. **Env vars present per environment** (`vercel env ls`) — missing vars build fine and 500 at runtime.

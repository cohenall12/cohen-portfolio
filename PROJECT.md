---
project: Cohen Allingham — Personal/Internship Portfolio Website
status: planned (not started)
planned: 2026-05-12
start_trigger: post-Thursday-meeting + post-ENMT301-RoboCup-Report-1
estimate: 10-12 hours across 4-6 evening sessions
---

# Cohen Allingham — Personal/Internship Portfolio Website

> **You are here:** this is the canonical project doc. When you come back to start building, read this first. The Claude Code plan that produced it lives at `~/.claude/plans/session-handoff-aios-sprightly-hejlsberg.md` (may be overwritten by future planning sessions — don't rely on it long-term).

## Purpose

A personal website for **internship hunting + university project documentation**. Audience: NZ engineering / mechatronics hiring managers, university career advisors. Showcases UC mechatronics work first; AI automation projects can layer in over time but are not the primary frame.

This is **not** the AI business / agency site. That's a separate future project at `Cohen-AI/Business/Website/`.

This project also doubles as a structured exercise to **learn Claude Code patterns end-to-end** — plan-first development, repo-level CLAUDE.md, subagent delegation, `/design-consultation`, `/design-review`, `/vercel:deploy`, real-world Notion API integration.

## Status

**Not started.** Triggered after Thursday May 14 @ease meeting wraps and ENMT301 RoboCup Report 1 (due Fri May 15 4pm) is submitted. Until then, academic + revenue work takes precedence.

A reminder entry lives in `Areas/Tasks/Inbox.md` so this surfaces in morning briefings once active deadlines clear.

## Locked decisions (won't shift)

- **Purpose:** internship-hunting + university project documentation. Not the agency site.
- **Location:** `/Users/cohen/Workspaces/Cohen-AI/Personal/Website/` (this folder).
- **Backend / data model:** Notion as headless CMS. Reuses the existing `NOTION_BEARER_AUTH` integration from the AIOS. Aligned with the 2026-05-12 architecture decision: Notion = external/shareable tier. **Changing this would ripple through everything else — don't.**
- **v0.1 scope direction:** University projects first. Specific projects featured can shift.
- **Branding starts blank.** Phase 0 decisions happen before code.

## Decisions to defer until you actually build

Don't over-commit now. These are most likely to shift when you sit down:

- **Frontend framework** — Next.js (App Router) is the default. Astro / Remix / SvelteKit are valid swaps; data layer survives.
- **Component library** — shadcn/ui by default. Could be bare Tailwind, Park UI, Mantine, hand-rolled. Pick after Phase 0 design direction is locked.
- **Visual aesthetic** — explicit unknown. Phase 0 runs `/design-consultation` to explore. Could land minimal / hand-drawn / brutalist / editorial — whatever the consultation surfaces is the answer.
- **Page layouts / IA** — the sketch below is a default, not a contract.
- **Hosting** — Vercel by default; Cloudflare Pages or Netlify both fine.
- **Domain name** — `cohenallingham.com` / `.nz` / `.dev` all viable. Decide based on availability + positioning at build time.

**Rule:** if you change your mind on any deferred item, update this doc rather than trying to retrofit a stale plan.

## Notion CMS schema

Create a Notion database called `Cohen Allingham — Projects` inside the existing Notion workspace. Invite the AIOS integration to the database (`...` → Connections → AIOS).

Properties:

| Property | Type | Notes |
|---|---|---|
| Title | title | Project name |
| Slug | text | URL-safe (e.g. `robocup-report-1`) |
| Course | select | `ENCE361`, `ENMT301`, `Personal`, `AIS+`, ... |
| Project type | select | `software`, `mechanical`, `electrical`, `robotics`, `AI/ML`, `mixed` |
| Status | select | `in-progress`, `complete`, `archived` |
| Featured | checkbox | Homepage spotlight flag |
| Cover image | files | Hero/thumb |
| Tech stack | multi-select | `Python`, `C`, `MATLAB`, `FreeRTOS`, `React`, `n8n`, ... |
| Year | number | Academic / calendar year |
| Order | number | Manual sort within homepage Featured set |
| Repo URL | url | Optional |
| Live demo | url | Optional |
| Body | page content | Rendered to React via Notion blocks |

Fetch at build time → SSG for speed. Vercel webhook or scheduled revalidation (every N minutes) keeps the site in sync with Notion edits.

## Project structure (sketch)

```
Personal/Website/
├── PROJECT.md           ← this file
├── DESIGN.md            ← visual design system (Phase 0 output)
├── README.md            ← repo overview, dev setup
├── CLAUDE.md            ← AI guide for this repo
├── AGENTS.md            ← Codex / other-agent mirror
├── .env.local           ← NOTION_TOKEN, NOTION_DATABASE_ID (gitignored)
├── .env.example         ← committed template
├── app/  (or src/routes/)
│   ├── (home, about, projects, contact)
├── components/
├── lib/
│   ├── notion.ts        ← Notion API client (the load-bearing piece)
│   └── projects.ts      ← typed Project schema + cached fetch
├── public/
│   ├── cv.pdf
│   └── images/
└── package.json
```

Assumes Next.js App Router. If framework swaps at Phase 0, `lib/notion.ts` survives — restructure the rest around the new framework's conventions.

## Phased build sequence

### Phase 0 — Decisions (no code) — ~2 hrs

**Trigger:** post-Thursday meeting + post-RoboCup report submission.

- [ ] Re-read this doc. Confirm what's still right; change what isn't.
- [ ] Pick framework (default Next.js).
- [ ] Domain decision — register via Cloudflare Registrar (no markup) or Vercel domains.
- [ ] Brand direction — run `/design-consultation`. Output: `DESIGN.md` (palette, typography, layout, motion).
- [ ] Collect design references via the consultation, don't pre-anchor.
- [ ] Pick component approach (shadcn / raw Tailwind / other) based on DESIGN.md.
- [ ] Notion DB created + first project draft in it.

### Phase 1 — Scaffold — ~1 hr

- [ ] `npx create-next-app@latest` — TypeScript, Tailwind, App Router, ESLint.
- [ ] If using shadcn: `pnpm dlx shadcn@latest init`. Add base components (Button, Card, Badge, NavigationMenu, Sheet).
- [ ] Git init, push to GitHub.
- [ ] Vercel link via `/vercel:bootstrap`. Auto-deploy on push.
- [ ] Write CLAUDE.md + AGENTS.md at repo root.

### Phase 2 — Notion plumbing — ~2 hrs

- [ ] Install `@notionhq/client`.
- [ ] `lib/notion.ts` — fetch all projects, fetch by slug, fetch body blocks.
- [ ] Notion integration invited to Projects database.
- [ ] `lib/projects.ts` — typed schema + cached fetch helper.
- [ ] Render Notion blocks: custom NotionRenderer or `react-notion-x`.

### Phase 3 — Pages — ~3-4 hrs

- [ ] **Home** — hero (name + one-line pitch) + Featured projects (3 cards) + about preview + footer.
- [ ] **About** — full bio, education, current courses, CV download, contact CTA.
- [ ] **Projects** — grid/list, filter by Course / Type / Year / Tech.
- [ ] **Project detail** (`/projects/[slug]`) — cover image, metadata, body, repo/demo links, prev/next nav.
- [ ] **Contact** — email, LinkedIn, GitHub, simple form (Formspree or Vercel form).

### Phase 4 — Design pass — ~2 hrs

- [ ] `/design-review` against deployed Vercel preview.
- [ ] Fix visual inconsistencies, spacing, hierarchy, mobile responsive.
- [ ] `/benchmark` for Lighthouse — target ≥95 across all 4 categories.

### Phase 5 — First content — ~2 hrs

- [ ] ENMT301 RoboCup Report 1 written up in Notion (double duty with academic submission).
- [ ] ENCE361 work — 1-2 pages.
- [ ] Personal AI project — Hayden case study (with permission) or generic n8n build.
- [ ] About page polished. CV PDF in `/public`.

### Phase 6 — Deploy + share — ~30 min

- [ ] `/vercel:deploy` to production.
- [ ] Domain DNS + Vercel domain attach.
- [ ] Share: career-fair contacts, internship applications, LinkedIn profile link, email signature.

**Total: ~10-12 hours across 4-6 evening sessions.**

## What this teaches about Claude Code

- Plan mode → ExitPlanMode → execute (the loop that produced this doc).
- Repo-level `CLAUDE.md` + `AGENTS.md`.
- `/design-consultation` → `DESIGN.md` → `/design-review` (design discipline loop).
- Subagent delegation (Frontend / Content Creator agents).
- The Vercel skill family (`/vercel:bootstrap` + `/vercel:deploy` + `/vercel:env`).
- External API integration with `.env` auth (Notion).
- Optionally: full `/gsd-new-project` formal init as the very first step instead of free-form.

## Out of scope

- Cohen-AI business site (separate future project).
- E-commerce, payments, gated content.
- i18n.
- High-cadence blog.
- Analytics beyond Vercel Analytics defaults.

## Reuse from the AIOS

- `NOTION_BEARER_AUTH` token — same integration. Just invite it to the new Projects database.
- `notion-pp-cli` — useful for CLI debugging during the Notion plumbing phase.
- Voice/tone from `Areas/Cohen/_context/voice.md` for written copy.
- Personal bio anchor: `Areas/Cohen/_context/me.md`.

## First action when you come back

```
cd /Users/cohen/Workspaces/Cohen-AI/Personal/Website/
# Re-read this file.
# Then: invoke /design-consultation to start Phase 0.
```

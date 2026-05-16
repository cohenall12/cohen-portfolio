# Cohen Allingham — Personal Portfolio

Single-page Next.js portfolio for internship hunting and university project documentation.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript
- next/font (JetBrains Mono) + next/image
- No CSS framework — inline styles + scoped style blocks (design choice, see [CLAUDE.md](CLAUDE.md))

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build + type check
npm run lint
```

## Structure

- `src/app/` — Next.js layout, root page, globals
- `src/components/` — Portfolio root, NavBar, Hero, Sections, Reveal hook
- `src/lib/data.ts` — portfolio content (single source of truth) + theme tokens + types
- `public/images/` — project screenshots
- `_design_bundle/` — original Claude Design handoff (HTML/JSX prototype + chat transcripts)

## Editing content

All portfolio content lives in [src/lib/data.ts](src/lib/data.ts) under the `PORTFOLIO` export. Theme colors are in `THEME`. Both are fully typed.

## Notes for agents

See [CLAUDE.md](CLAUDE.md) for repo conventions, file map, animation invariants, and outstanding TODOs in the content layer.

# Milestones

## The Website [ACTIVE]

> Give the family a public face: a landing page that makes the case in ninety seconds, a
> specification index driven by the registry, and a page per specification that renders its overview
> from `docs/` rather than restating it.

Promoted from the *The website* initiative on 2026-08-25.

The family has one draft specification and no public surface. A reader who hears about OpenGameSpec
today lands on a GitHub repository, which asks them to already care. OpenAPI's adoption was not
primarily technical — it was that a reader could understand what it was in ninety seconds and reach
the schema in two clicks.

**The registry is the site's only data source.** Every specification the site displays comes from
`docs/specs.json`, never from hardcoded markup. This is what makes adding OpenDialogSpec a
one-entry change rather than a site edit, and it is why registry validation is a criterion here
rather than a nicety — under ADR-0001 the registry is the one file in this repository capable of
publishing something false.

**Markdown ingestion is settled and was settled first**, as ADR-0002 required: Vite's native `?raw`
import plus `react-markdown`. No build plugin, and the site renders the actual file under `docs/`, so
the overview prose has exactly one copy (ADR-0001).

The honest scope limit: this milestone ships a site with **no custom domain**. It deploys to a
`netlify.app` subdomain and nothing in the code assumes a hostname.

### Acceptance Criteria

- [ ] The specification index renders from `docs/specs.json` — adding a registry entry adds a card
      with no component change
- [ ] A `planned` specification renders visibly as **not started**, with no repository link and no
      coming-soon framing — the overpromise this family cannot afford at one shipped specification
- [ ] Each specification page renders its `docs/<id>/README.md` at build time; editing that file
      changes the site with no second copy of the prose
- [ ] `npm run build` **fails** on a malformed registry: unknown `status`, an `id` with no matching
      folder, a `planned` entry carrying a `version` or `repository`, or a non-`planned` entry
      missing either
- [ ] Client-side routes survive a hard refresh in production — the SPA redirect ships in the same
      commit as the first route, not after the first 404 (ADR-0002)
- [ ] The site builds clean with `tsc` and deploys to Netlify from `main`
- [ ] Component tests cover every branch in status rendering — a badge with four states has four
      assertions

### Tasks

- [x] Scaffold Vite + React + TypeScript + Tailwind, matching `arctic-flame-games-website` (ADR-0002)
- [x] `scripts/validate-registry.mjs` — run before `vite build`, fails the build on a bad entry
- [x] `src/data/specs.ts` — the only module reaching outside `src/`; types and exposes the registry
- [x] Markdown loader via `import.meta.glob` with `?raw`, so a new spec folder needs no wiring
- [x] Landing page: hero with a CTA per specification, what-is, why-it-matters, spec cards
- [x] `/specifications` index and `/specifications/:id` detail pages
- [x] `public/_redirects` for SPA fallback, shipped with the router
- [x] Tests: registry validation, status badge branches, planned-spec rendering — 43 passing
- [x] `netlify.toml`
- [x] Connect the Netlify site and deploy from `main` — done by the owner on 2026-08-25

### Notes from implementation

- **Duplicate `<h1>` caught by a test, not by eye.** Each overview file opens with `# OpenQuestSpec`,
  and the page already rendered that name as its heading — so every specification page shipped two
  level-one headings. Fixed with `stripLeadingHeading` in the data layer rather than by editing the
  docs, since those files are correct as GitHub reads them.
- **The validator skips version and repository rules when `status` is unrecognised.** Deliberate, and
  now pinned by a test: which rule applies depends on whether the status is `planned`, so with an
  unknown status there is no correct check to run and a second error would send the author chasing a
  phantom.
- **`ARCHITECTURE.md` had drifted twice more** — Node 22.x against a sibling pinned to 24, on top of
  the TypeScript row caught at ADR review. Both corrected. The stack table is copied by hand and will
  keep doing this; it now says so.

---

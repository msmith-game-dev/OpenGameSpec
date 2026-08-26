# Milestones

## The Website [COMPLETED]

> Completed 2026-08-25. Live at <https://opengamespec.com>.

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

- [x] The specification index renders from `docs/specs.json` — adding a registry entry adds a card
      with no component change
- [x] A `planned` specification renders visibly as **not started**, with no repository link and no
      coming-soon framing — the overpromise this family cannot afford at one shipped specification
- [x] Each specification page renders its `docs/<id>/README.md` at build time; editing that file
      changes the site with no second copy of the prose
- [x] `npm run build` **fails** on a malformed registry: unknown `status`, an `id` with no matching
      folder, a `planned` entry carrying a `version` or `repository`, or a non-`planned` entry
      missing either
- [x] Client-side routes survive a hard refresh in production — the SPA redirect ships in the same
      commit as the first route, not after the first 404 (ADR-0002). Verified against the live site:
      `/specifications/openquest` serves the app shell rather than a 404
- [x] The site builds clean with `tsc` and deploys to Netlify from `main`
- [x] Component tests cover every branch in status rendering — a badge with four states has four
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
- **The first design was scrapped.** It shipped as dark slate with an orange accent, which is the
  default look for a developer tool and made the project look like every other spec site. Replaced
  with the game-manual identity in `DESIGN.md`, and the rejected direction is recorded there so it
  does not return.
- **Layout bugs reached production and were caught by eye**, which is why `e2e/layout.spec.ts`
  exists. Grid children default to `min-width: auto`, so the annotated document widened the whole
  page and collided the nav wordmark with the links at 360px. The Playwright guard written
  afterwards found two more overflows within a minute, on pages never screenshotted.

### Known gaps at completion

Recorded rather than quietly carried, so the next milestone starts from an honest position.

- **The site is not readable without JavaScript.** It is a client-rendered SPA, so crawlers and link
  unfurlers see an empty shell — confirmed against the live site. For a format whose entire strategy
  is adoption, this is a real cost, and ADR-0002 did not weigh it. Either prerender the handful of
  known routes, or treat it as the trigger ADR-0002 already names for reopening Astro.
- **No link checking in CI.** A specification family whose site links to a 404 is making an argument
  about its own maintenance.
- **Playwright needs a browser in CI.** Chromium's download failed locally and the suite ran against
  an installed Edge via `PLAYWRIGHT_CHANNEL`. CI has no browser step yet, so the guard does not run
  on push — it only guards what someone remembers to run.
- **The registry version-drift check is unbuilt.** ADR-0001 accepted that `specs.json` duplicates
  `version` from repositories it does not own, on the grounds that the drift is cheaply detectable.
  Nothing detects it yet.

---

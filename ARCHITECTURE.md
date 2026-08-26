# Architecture

> Last updated: 2026-08-25

> **The website is built and live** at <https://opengamespec.com>, deploying from `main` as of
> 2026-08-25. `src/` describes real code. Visual identity is in [DESIGN.md](DESIGN.md).

OpenGameSpec is two things in one repository, and the rules below follow from keeping them separate:

1. **The umbrella documentation** — `docs/`. The index of every specification in the family, the
   conventions they share, and the backlogs that decide what happens next. This is the source of
   truth for *which specifications exist and what state they are in*, and for nothing else.
2. **The website** — the public face of the initiative, the openapis.org analogue. It renders `docs/`
   and adds the marketing surface a specification family needs to be adopted rather than merely
   published.

**No specification is defined here.** Each one lives in its own repository, versioned independently
(ADR-0001). This repository describes them; it never defines them. Every rule below that looks
excessive is protecting that line.

---

## Stack

| Concern | Choice | Version |
|---|---|---|
| Runtime | Node.js — Netlify pins 24; verified locally on 20 | 20–24 |
| Language | TypeScript, ESM only | 6.x |
| UI | React | 19.x |
| Routing | react-router-dom | 7.x |
| Build | Vite | 6.x |
| Styling | Tailwind CSS (via `@tailwindcss/vite`) | 4.x |
| Test framework | Vitest + Testing Library | 4.x / 16.x |
| Markdown rendering | Vite `?raw` + `react-markdown` + `remark-gfm` — no build plugin | 10.x / 4.x |
| Hosting | Netlify, static | — |

The stack deliberately matches `arctic-flame-games-website` (ADR-0002) so that one set of habits
covers both sites. **The versions above are copied from that repository by hand and will drift.**
Check `../PublicCompanyWebsite/package.json` before trusting a row — a review on 2026-08-25 already
caught this table claiming TypeScript 5.x against a sibling pinned to 6.x.

**Markdown is settled** — it was the one gap the chosen stack did not close, and ADR-0002 required
settling it before any page work. The answer needs no build plugin: `import.meta.glob` with
`query: '?raw'` reads `docs/*/README.md` as strings at build time, and `react-markdown` renders them.

Two properties earned it. The site renders the **actual** file under `docs/`, so overview prose has
exactly one copy (ADR-0001). And the glob is pattern-based, so a new specification folder is picked
up with no wiring — the same property that makes adding a registry entry sufficient to add a page.

The cost: no React components inside markdown, which MDX would have allowed. Nothing needs it today.

There is no database, no HTTP server, no authentication, and no user-submitted content in this
project. Those sections appear below marked not applicable rather than omitted, so their absence is a
recorded decision rather than an oversight.

---

## Folder structure

```
docs/                     The umbrella documentation. Committed prose and data, no code.
  README.md               Index of every specification; explains this folder.
  specs.json              THE REGISTRY. Machine-readable list of specifications.
                          The website's data source. See "The registry" below.
  initiative-backlog.md   Cross-cutting work with a rationale and a definition of done.
  idea-backlog.md         Raw ideas, one line each, uncommitted.
  <spec>/README.md        Overview, status, and links for one specification.
                          DESCRIBES, never defines. No schema, no normative prose.
  adr/                    Why this repository is shaped the way it is.

src/                      The website.
  pages/                  One component per route. Composition only — no fetching,
                          no formatting, no business logic.
  components/             Reusable presentational components. No knowledge of routes.
  data/                   Loads and types docs/specs.json and the docs/*/README.md
                          overviews. The only place that reaches outside src/.

scripts/
  validate-registry.mjs   Runs before vite build. Rules are a pure exported function
                          taking its filesystem check as an argument, which is what
                          makes the failure modes testable without writing bad files.

public/_redirects         SPA fallback, so client-side routes survive a hard refresh.
```

### Layer rules

- **`docs/` contains no code.** It is prose and one JSON file. Anything executable that operates on
  `docs/` is a script, and lives outside it.
- **`pages/` compose, they do not compute.** A page assembles components and passes them data. If a
  page is deriving, sorting, or formatting, that work belongs in `data/`.
- **`components/` know nothing about routing or the registry's shape.** They take props. A component
  that imports `specs.json` cannot be reused for anything else and will not survive the registry's
  first schema change.
- **`data/` is the only module that reads `docs/`.** One place to change when the registry moves, one
  place to type it, one place to fail loudly if it is malformed.

---

## The registry

`docs/specs.json` is the single machine-readable list of specifications in the family. It is what the
website renders, and in time what any external tool would read to discover the family.

**The registry and the overview pages must agree, and they change in the same commit.** This is the
one invariant in this repository that is worth enforcing mechanically, because the failure mode is
silent: a stale `status` field does not break the build, it publishes a lie. A specification the site
calls `stable` when its repository says `0.1-draft` costs a reader their trust exactly once.

Every entry carries:

| Field | Meaning |
|---|---|
| `id` | Stable kebab-case identifier, matching the folder name under `docs/` |
| `name` | Display name, e.g. `OpenQuestSpec` |
| `summary` | One sentence, no marketing |
| `status` | `planned` · `draft` · `stable` · `deprecated` |
| `version` | Current version string, or `null` when `planned` |
| `repository` | Canonical repository URL, or `null` when `planned` |
| `docs` | Path to the overview folder under `docs/` |

`status: planned` means **no repository exists**. It is not a soft launch — it is a public statement
that the work has not started, and the website must render it as such rather than as a coming-soon
teaser. Overpromising is the specific way a specification family loses credibility before it has
shipped anything.

---

## Shared conventions across specifications

> **Observed, not yet binding.** Every convention below was decided in OpenQuestSpec's own ADRs,
> which under ADR-0001 bind OpenQuestSpec and nothing else. No record in **this** repository
> ratifies them family-wide, so the table describes what the one existing specification does — not
> what the next one must do.
>
> This is deliberate at a sample of one. A convention drawn from a single specification is a habit,
> and promoting a habit to a standard before a second specification has tested it is how a family
> inherits mistakes nobody examined. A second specification adopting one of these is the evidence
> that would make it binding, and that is when it earns an ADR here.

Recorded because a convention that lives only in the first specification's head gets reinvented by
the second.

| Convention | What OpenQuestSpec does | Decided in |
|---|---|---|
| Serialization | JSON, with a **normative JSON Schema**. The schema is the authority; prose describes it. | OQS ADR-0002 |
| Versioning | `N.M-draft` until 1.0, no compatibility promised between drafts. Semantic versioning after. | OQS ADR-0006 |
| Conformance | A corpus in the specification's repository, **self-certified** — no registry, no approval. | OQS ADR-0013 |
| Extensions | `x-` prefixed fields, carried through as opaque data, never interpreted. | OQS ADR-0010 |
| Licence | Apache 2.0, for the express patent grant. | OQS ADR-0009 |
| Provenance | DCO sign-off on every commit. | OQS ADR-0014 |

A new specification is free to follow all of these — and should, absent a reason not to. What it
cannot do is diverge **silently**: a divergence needs an ADR in its own repository saying why, so the
family can see whether the convention or the exception is the thing that should change.

---

## Testing strategy

`npm test` runs Vitest; `npm run check` runs registry validation, `tsc`, and the suite.

- **Registry validation** runs before `vite build`, so a malformed entry fails the deploy rather
  than publishing. Its rules are a pure function taking `overviewExists` as an argument, so every
  failure mode is tested without writing broken files to disk.
- **Component tests** via Testing Library for anything with a branch in it — the status badge
  renders four ways and has four assertions, plus one asserting a `planned` specification is never
  described as coming soon. That last one is a product rule, not a styling preference.
- **The docs seam is tested**, because it is where ADR-0001 accepted duplication: every registry
  entry must have a loadable overview, and `SpecPage` asserts against text that exists only in
  `docs/openquest/README.md`. If the site ever stops reading the real file, those fail.
- **Layout is tested end to end** by `e2e/layout.spec.ts` via Playwright, against a production
  build. It asserts no horizontal overflow on every route at 360–1440px, which is the failure mode
  unit tests cannot see: it throws nothing, looks fine at desktop width, and reached production
  once already. The guard found two more overflows within a minute of being written.
- **No snapshot tests of marketing copy.** They fail on every wording change and teach the team to
  regenerate without reading.
- **Link checking** in CI — still outstanding. A specification family whose site links to a 404 is
  making an argument about its own maintenance.
- **Prerendering** — outstanding, and it matters more than it looks. The site is a client-rendered
  SPA, so crawlers and link unfurlers see an empty shell. For a format seeking adoption, being
  unreadable without JavaScript is a real cost that ADR-0002 did not weigh.

---

## Not applicable

Recorded so their absence is a decision, not an oversight.

- **Database** — the site is static. All content is committed files.
- **Authentication / authorization** — there are no users and no accounts.
- **HTTP API / server** — the site is prerendered and served from a CDN.
- **Error handling for user input** — there is no user input. The only "input" is `docs/specs.json`,
  which is validated in CI rather than at runtime.
- **External service integration** — none. The site does not call the GitHub API at build time; spec
  versions are copied into the registry deliberately, so the site cannot break because someone else's
  API rate-limited a deploy.

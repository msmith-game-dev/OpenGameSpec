# Architecture

> Last updated: 2026-08-25

> **The website is designed, not yet built.** Everything below about `src/` describes intent, not
> code. Re-run `/architecture` once the site ships to reconcile this document with reality. The
> `docs/` sections describe what exists today.

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
| Runtime | Node.js (LTS) | 22.x |
| Language | TypeScript, ESM only | 6.x |
| UI | React | 19.x |
| Routing | react-router-dom | 7.x |
| Build | Vite | 6.x |
| Styling | Tailwind CSS (via `@tailwindcss/vite`) | 4.x |
| Test framework | Vitest + Testing Library | 4.x / 16.x |
| Markdown rendering | TBD at implementation — MDX or a Vite markdown plugin | — |
| Hosting | Netlify, static | — |

The stack deliberately matches `arctic-flame-games-website` (ADR-0002) so that one set of habits
covers both sites. **The versions above are copied from that repository by hand and will drift.**
Check `../PublicCompanyWebsite/package.json` before trusting a row — a review on 2026-08-25 already
caught this table claiming TypeScript 5.x against a sibling pinned to 6.x.

The one open question is markdown: the site must render `.md` files that live outside `src/`, and
Vite needs to be told how. That is an implementation decision, not an architectural one, but it is
the first thing the site milestone has to settle, because it is the single gap the chosen stack does
not close and every rejected alternative did (ADR-0002).

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

src/                      The website. NOT BUILT YET.
  pages/                  One component per route. Composition only — no fetching,
                          no formatting, no business logic.
  components/             Reusable presentational components. No knowledge of routes.
  data/                   Loads and types docs/specs.json. The only place that
                          reaches outside src/ for content.

public/                   Static assets served verbatim.
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

**Today: nothing to test.** `docs/` is prose. This section describes what the site milestone must
deliver, so it is not decided under deadline.

- **Registry validation** is the one test that must exist before the site does. `docs/specs.json`
  gets a schema, and CI fails on a malformed entry, an unknown `status`, or an `id` with no matching
  folder under `docs/`. This is cheap now and gets expensive the moment external tools read it.
- **Component tests** via Testing Library for anything with a branch in it — a status badge that
  renders four ways is worth four assertions.
- **No snapshot tests of marketing copy.** They fail on every wording change and teach the team to
  regenerate without reading.
- **Link checking** in CI. A specification family whose site links to a 404 is making an argument
  about its own maintenance.

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

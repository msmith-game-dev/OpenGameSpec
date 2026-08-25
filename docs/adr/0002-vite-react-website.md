# ADR-0002: Build the website with Vite, React, and Tailwind

- **Status:** Accepted
- **Date:** 2026-08-25
- **Decided:** 2026-08-25
- **Deciders:** Project owner (@msmith-game-dev)
- **Note:** Selected by the owner from stated options at the repository's founding. The website is
  not built yet; this record fixes the stack so the site milestone does not open with a tooling
  argument.

## Context

The family needs a public face in the style of [openapis.org](https://www.openapis.org/): a landing
page that makes the case, an index of specifications, and a page per specification. Adoption of a
format is not primarily a technical problem — OpenAPI won in large part because a reader could
understand what it was in ninety seconds and reach the schema in two clicks.

The site's content requirements are modest and now settled by ADR-0001: it renders
`docs/specs.json` and a handful of overview pages, and links out to specification repositories rather
than hosting their prose. There is no versioned documentation tree, no search corpus, and no
per-version doc set to maintain here.

The relevant asymmetry is organisational, not technical. `arctic-flame-games-website` already exists
and runs React 19, Vite 6, Tailwind 4, Vitest, and Netlify. A second site on a different stack means
two sets of build config, two upgrade paths, and two sets of habits maintained by the same one
person.

## Decision

Build the website with **Vite + React + TypeScript + Tailwind CSS**, tested with Vitest and Testing
Library, deployed statically to Netlify — matching `arctic-flame-games-website`.

The site source lives at the root of this repository alongside `docs/`, and reads `docs/specs.json`
as its content source through a single `src/data/` module.

Markdown rendering — how Vite ingests `.md` files that live outside `src/` — is deliberately left to
the site milestone. It is an implementation choice with several adequate answers, and pre-committing
to one without building anything would be false precision. It is, however, the first thing that
milestone must settle.

## Alternatives considered

### Astro

The strongest technical fit. Content-first by design: markdown becomes pages with no plugin
archaeology, content collections give typed frontmatter and build-time validation of exactly the kind
`specs.json` wants, and static pages ship approximately zero client JavaScript. Islands allow React
components where interactivity is genuinely needed. For a specification-family site, this is close to
the tool's stated purpose.

Rejected on consistency, with the technical argument conceded. A second framework in a one-maintainer
organisation is a second set of upgrade cycles, build failures, and idioms to hold in mind, and the
sites it would apply to are two. The measurable benefit — a smaller bundle on a site of perhaps a
dozen static pages — does not reach users as anything they would notice.

**This is the alternative most likely to be right later.** If the site grows a rendered specification
tree, versioned documentation, or a blog, the content tooling stops being a marginal convenience and
Astro's case becomes strong enough to reopen. That trigger is worth watching for rather than
rediscovering under deadline.

### Next.js

The default answer for a React marketing-plus-content site, and the option most readers will expect
to find here. Static export covers this site's needs entirely, file-based routing removes the router
dependency, MDX support is first-class rather than a plugin hunt, and it would solve the markdown
problem this decision leaves open.

Rejected on the same criterion that decided the whole record: it does not match
`arctic-flame-games-website`, so it fails the consistency test that is the entire argument for the
chosen stack. Adopting it would mean two React meta-frameworks across two sites maintained by one
person — the outcome this decision exists to avoid.

Worth stating plainly that the *technical* case against Next.js here is thin. It would work. It loses
to an organisational constraint, not a capability gap, and if the sibling site is ever rebuilt or
retired that constraint disappears with it.

### Docusaurus

Docs-first, with sidebar navigation, documentation versioning, and Algolia search included. Its
versioning in particular looks tailor-made for a specification project.

Rejected because the fit is superficial. Under ADR-0001, specification prose lives in specification
repositories, so this site has no versioned documentation tree to manage — the feature that would
justify the framework is the feature this site does not use. What remains is an opinionated theme
around a bespoke marketing landing page, which is the shape Docusaurus resists hardest.

## Consequences

**Positive**

- One stack across both sites: one upgrade path, one set of build conventions, one set of habits.
- React and Tailwind impose nothing on the layout, so an openapis.org-style bespoke landing page is
  as easy to build as any other.
- The registry is imported as typed data, so a malformed entry is a type error rather than a runtime
  surprise.
- Netlify's static deploy needs no infrastructure and no ongoing cost.

**Negative**

- **Markdown is not free.** Rendering `docs/*.md` requires MDX or a Vite markdown plugin, plus
  configuration to reach outside `src/`. Astro would have made this a non-problem, and this is the
  concrete price of the consistency argument.
- The site ships a React bundle for content that is almost entirely static. Immaterial at this size;
  it stops being immaterial if the site grows a large content tree.
- No built-in documentation versioning or search. Neither is needed today, and both would have to be
  built or bought later.
- Client-side routing on a static host needs a redirect rule, and forgetting it produces 404s on
  refresh that pass local testing.

**Follow-up**

- The site milestone settles markdown ingestion first, before any page work.
- Add the Netlify SPA redirect rule (`/* /index.html 200`) in the same commit as the first route, not
  after the first 404 report.
- Validate `docs/specs.json` at build time — the registry is the site's only data source and the one
  input capable of publishing something false (ADR-0001 follow-up).
- Revisit Astro if the site ever renders full specification prose, versioned docs, or a blog.

---

## Review notes

Reviewed and accepted 2026-08-25. One record defect and one propagation error were found and fixed
before acceptance; the decision itself was not contested.

**Finding 1 — the industry default was missing.** The record weighed Astro and Docusaurus but not
Next.js, which is what most readers would reach for first on a React content site. Its absence made
the alternatives look curated rather than surveyed. It is now included, and it loses to the same
consistency criterion that decided everything else — which is precisely why leaving it out was a
defect rather than an economy: an alternative dismissed in one line still has to appear.

**Finding 2 — `ARCHITECTURE.md` contradicted the record's central claim.** This ADR justifies the
stack by matching `arctic-flame-games-website`. The stack table said TypeScript 5.x; the sibling repo
pins `^6.0.3`. Every other row was accurate. Corrected on acceptance. Worth noting the shape of the
error: the one row that was wrong was wrong in the direction that quietly undercut the argument, and
a stack table copied by hand will keep doing this.

**Standing risk, not a defect:** markdown ingestion is deliberately unresolved. It is the one thing
the chosen stack does not answer and every rejected alternative does. The site milestone settles it
first, before any page work.

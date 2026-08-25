# ADR-0001: Each specification lives in its own repository; OpenGameSpec describes, never defines

- **Status:** Proposed
- **Date:** 2026-08-25
- **Deciders:** Project owner (@msmith-game-dev)
- **Note:** Selected by the owner from stated options at the repository's founding.

## Context

OpenGameSpec is being created as the umbrella for a family of game content specifications. One member
already exists: [OpenQuestSpec](https://github.com/msmith-game-dev/OpenQuestSpec), a mature
standalone repository with its own normative schema, specification prose, conformance corpus, ADR
history, licence, and Git remote. OpenDialogSpec and OpenItemSpec are planned and unstarted.

The founding question is what `docs/<spec>/` in this repository actually contains. Three answers were
on the table: an overview that links out, the specification content itself moved in, or a vendored
copy synced from the source repository.

Two facts constrain the answer.

**Specifications version independently and on their own clock.** OpenQuestSpec is at `0.1-draft` and
will reach 1.0 when its corpus and generators say so — which has nothing to do with when
OpenItemSpec is ready. A shared repository imposes a shared history on artifacts whose entire value
proposition is being separately versionable and separately implementable.

**A specification's authority is inseparable from its location.** OpenQuestSpec's ADR-0002 rests on a
third party validating a document against the normative schema without our tooling. That promise
names a place. Every reference, `$schema` URL, and conformance claim points at a repository, and
moving it invalidates them.

The failure mode being designed against is duplication. The moment a fact — a field name, a version
number, a validity rule — exists in both the umbrella and the specification, one of them starts
drifting, and the reader has no way to tell which. Drift here is silent: it does not break a build,
it publishes something false.

## Decision

**Each specification lives in its own repository and is versioned independently.** OpenGameSpec is
the umbrella and holds, per specification, a `docs/<id>/README.md` overview plus an entry in
`docs/specs.json`.

The binding rule: **an overview page describes a specification and never defines one.** It may state
what the format is for, what state it is in, and where the authoritative artifacts live. It may not
state a rule. Where a rule is relevant, the page links to it rather than restating it.

`docs/specs.json` is the registry — the machine-readable list of specifications and the website's
data source. Its `status` and `version` fields are the one place this repository deliberately
duplicates a fact the specification owns, and they are therefore required to change in the same
commit as the overview page.

## Alternatives considered

### Move the specifications into this repository as a monorepo

A single checkout, one CI pipeline, one issue tracker, atomic cross-specification changes, and a
website that builds from local files with no synchronisation of any kind. This is a real and
substantial simplification, and it is how many specification families are in fact organised.

Rejected on three grounds. It breaks OpenQuestSpec's existing remote and every reference to it,
including any `$schema` URL already in use — for a project whose product is stability, breaking its
own location as its first act is a poor argument. It couples release cycles: a tag in a monorepo
either versions everything at once or needs per-package tagging conventions that recreate the
separation in a more confusing form. And it makes an unstarted specification structurally equal to a
working one, which is precisely the overpromise this family cannot afford at one shipped
specification.

The honest cost of rejecting it: **cross-specification changes are no longer atomic.** When the
reference syntax is decided, adopting it will take a coordinated change across N repositories with a
window where they disagree. That is a real, recurring tax, and it was accepted deliberately.

### Vendor a synced copy into `docs/`

Specifications authored in their own repositories, but copied in by a script or submodule so the site
builds fully offline from one checkout. Preserves independent versioning while giving the website
local content.

Rejected because it creates the duplication problem and then automates it. A vendored copy is stale
between syncs by construction, and staleness in a specification is not a cosmetic defect — a reader
validating against a synced-but-outdated schema gets wrong answers with full confidence. Submodules
add a well-known class of contributor confusion for a benefit the site does not need: it can link to
the authoritative repository, which is both simpler and more honest about where truth lives.

Worth revisiting if the site ever needs to render full specification prose rather than link to it. At
that point the sync becomes load-bearing and earns its complexity.

## Consequences

**Positive**

- Each specification keeps its independent version line, release cadence, and issue tracker.
- OpenQuestSpec's existing remote, references, and conformance claims stay valid. Nothing breaks.
- A `planned` specification costs one folder and one registry entry, so the family's shape is legible
  long before the work starts — without implying the work has started.
- Exactly one copy of every specification rule exists, in the repository that owns it.
- A specification can be transferred, archived, or handed to a different maintainer without touching
  the umbrella.

**Negative**

- **Cross-specification changes are not atomic.** A decision that binds every specification lands as
  N pull requests across N repositories, with a window in which they disagree. This gets worse with
  each specification added and is the standing cost of this decision.
- The registry duplicates `status` and `version` from each specification, so it can be wrong.
  Discipline is the only thing keeping it honest until CI checks it.
- Contributors must learn which repository owns which change. `CONTRIBUTING.md` carries a routing
  table for this reason.
- The website cannot render specification prose without either fetching it or linking out. This ADR
  chooses linking out; a future need for rendered prose reopens the vendoring question.
- No single place shows the family's full commit history.

**Follow-up**

- Add CI validation of `docs/specs.json`: schema-valid, known `status` values, and every `id` having
  a matching folder under `docs/`. Written as a testing-strategy requirement in `ARCHITECTURE.md`,
  currently unenforced.
- Consider a scheduled check that each registry `version` still matches the version in the
  specification's own repository. This is the drift the decision knowingly accepts, and it is
  cheaply detectable.
- Decide where cross-family ADRs bind. This record assumes an ADR here binds the family and an ADR in
  a specification's repository binds only that specification, but nothing enforces a specification
  adopting a family-level decision. That is a governance question, deferred.

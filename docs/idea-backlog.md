# Idea Backlog

> Raw ideas for the OpenGameSpec family, one line each. Not prioritised, not committed to.
>
> The bar for a line here is "someone thought of it." Ideas that earn an argument and a definition of
> done move to [`initiative-backlog.md`](initiative-backlog.md). Ideas about a **single** existing
> specification belong in that specification's own `idea-backlog.md`, not here.
>
> Nothing is deleted — dropped ideas keep their line and gain a reason.

## Open

### Candidate specifications

- OpenDialogSpec — dialogue trees, speakers, branches, conditions
- OpenItemSpec — items, stats, inventory semantics
- OpenLootSpec — loot tables, drop rates, weighted pools
- OpenCraftSpec — recipes, ingredients, crafting stations
- OpenSkillSpec — skill trees, abilities, progression curves
- OpenSaveSpec — save game structure, so a save survives an engine migration
- OpenLevelSpec — level metadata and entity placement, engine-agnostic
- OpenAchievementSpec — achievements, unlock conditions, platform mapping
- OpenLocaleSpec — how any spec in the family externalizes translatable strings

### Shared across the family

- A single reference syntax for pointing at an entity defined by another specification
- A shared `info` block — title, description, version, licence — identical in every specification
- One conformance corpus format, so a validator's test harness works for every specification
- Cross-spec validation: a tool that checks a quest's reward item actually exists in the item document
- A `x-` extension registry so studios can discover each other's conventions instead of colliding
- Shared vocabulary document: what "entity", "reference", "condition" mean across the family
- A family-wide changelog so an adopter can see everything that moved in one place

### Tooling

- Browser playground: edit and validate any spec in the family with nothing installed
- Visual graph viewer — the Swagger UI analogue, per specification
- One CLI that dispatches to whichever specification a document declares
- Language server covering every specification in the family
- GitHub Action that validates any OpenGameSpec document in CI
- Schema hosting at stable versioned URLs for editor autocomplete
- Breaking-change diff between two versions of any specification

### Website and adoption

- Landing page making the case in ninety seconds, openapis.org style
- Per-specification page rendered from the registry
- A "who uses this" page — empty until it is not, and honest about being empty
- Implementations page listing third-party tooling and conformance claims
- Blog or changelog feed so the initiative has a heartbeat
- A worked example carried across every specification — one small game, described completely
- Migration guides: from Yarn Spinner to OpenDialogSpec, from a Unity quest asset to OpenQuestSpec

### Process

- Governance: who accepts a specification change, and what happens if the maintainer stops
- Trademark policy: who may claim conformance and on what basis
- A template repository for starting the next specification with the conventions already in place
- Public roadmap rendered from this backlog, so adopters can see what is coming

## Promoted

<!-- Move here when an idea becomes an initiative. Record the date and the initiative. -->

- 2026-08-25 — A website for the family, in the style of openapis.org → initiative **The website**
- 2026-08-25 — Decide how one specification references another's entities → initiative **Cross-specification references**
- 2026-08-25 — Publish schemas at stable URLs for editor autocomplete → initiative **Stable schema URLs**

## Dropped

<!-- Move here rather than deleting. Record the date and the reason. -->

_None yet._

# OpenQuestSpec

A format for describing game quests — their objectives, the dependencies between them, and their
rewards — independently of any engine.

| | |
|---|---|
| **Status** | Draft |
| **Version** | `0.1-draft` |
| **Repository** | <https://github.com/msmith-game-dev/OpenQuestSpec> |
| **Licence** | Apache 2.0 |

> **This page describes OpenQuestSpec. It does not define it.** The
> [repository](https://github.com/msmith-game-dev/OpenQuestSpec) is authoritative for every rule,
> every field, and the current version. Where this page and the specification disagree, this page is
> the bug.

> ⚠ **`0.1-draft` promises no compatibility between draft versions.** Fields may be renamed, removed,
> or change meaning with no migration path. Build on it now only if you are willing to fix documents
> later. Semantic versioning begins at 1.0.

## What it is for

Quest systems get rebuilt on every project and never leave the engine they were written for. Design
lives in a spreadsheet, implementation lives in engine-specific assets, and the two drift until
nobody can answer what a quest actually does without opening both.

OpenQuestSpec makes the quest a **document**: readable by a designer, diffable in review, valid or
invalid without running the game, and portable to whatever the studio ships on next.

## What it looks like

Illustrative only — the [specification](https://github.com/msmith-game-dev/OpenQuestSpec/blob/main/packages/schema/SPECIFICATION.md)
is authoritative.

```json
{
  "openquest": "0.1-draft",
  "info": { "title": "Riverwood Main Questline" },
  "quests": {
    "bandit-camp": {
      "title": "Clear the Bandit Camp",
      "objectives": {
        "reach-camp":    { "type": "reach-location", "params": { "location": "riverwood.camp" } },
        "defeat-leader": { "type": "defeat", "params": { "target": "npc.bandit-leader" },
                           "requires": ["reach-camp"] }
      },
      "rewards": [ { "type": "currency", "params": { "amount": 250 } } ]
    }
  }
}
```

## What exists today

- **The normative JSON Schema** — validate a quest document in any language, with no dependency on
  the project's own tooling.
- **The specification prose**, including the boundary between schema validity and semantic validity.
  Two rules — that `requires` resolves, and that the dependency graph is acyclic — cannot be
  expressed in JSON Schema, so a document can pass a stock validator and still be invalid.
- **A conformance corpus**, treated as part of the specification rather than as an internal test
  fixture. Conformance is self-certified: run it and report what it says.
- **A parser and validator (`@openquest/core`)** — in progress, not released. It is the first
  implementation intended to enforce the semantic rules a stock validator cannot.

There is **no CLI and no code generator yet.** Engine generators — Unity first — are planned and
unbuilt.

## Getting started

Point any JSON Schema 2020-12 validator at the schema in the repository; you do not need to install
anything from this project.

```bash
check-jsonschema --schemafile packages/schema/openquest-0.1-draft.schema.json examples/riverwood.json
```

Read next, in the repository:

- [`packages/schema/SPECIFICATION.md`](https://github.com/msmith-game-dev/OpenQuestSpec/blob/main/packages/schema/SPECIFICATION.md) — the prose
- [`examples/riverwood.json`](https://github.com/msmith-game-dev/OpenQuestSpec/blob/main/examples/riverwood.json) — a complete valid document
- [`docs/adr/`](https://github.com/msmith-game-dev/OpenQuestSpec/tree/main/docs/adr) — why it is the way it is

## Contributing

Changes to the format, the schema, or the corpus go to the
[OpenQuestSpec repository](https://github.com/msmith-game-dev/OpenQuestSpec), not to this one. Only
this overview page is maintained here.

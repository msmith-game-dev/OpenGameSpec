# OpenGameSpec Documentation

The umbrella documentation for the OpenGameSpec family. **No specification is defined here.** Each
one lives in its own repository; this folder records which specifications exist, what state they are
in, and where to find them ([ADR-0001](adr/0001-federated-spec-repositories.md)).

## The specifications

| Specification | Covers | Status | Version | Repository |
|---|---|---|---|---|
| [OpenQuestSpec](openquest/) | Quests, objectives, rewards | Draft | `0.1-draft` | [msmith-game-dev/OpenQuestSpec](https://github.com/msmith-game-dev/OpenQuestSpec) |
| [OpenDialogSpec](opendialog/) | Dialogue trees, speakers, conditions | Planned | — | — |
| [OpenItemSpec](openitem/) | Items, stats, inventory semantics | Planned | — | — |

**Planned means the work has not started.** There is no repository, no schema, and no timeline. The
folder exists so the shape of the family is legible and so the idea has somewhere to accumulate
notes — not as a promise.

This table is the human-readable view of [`specs.json`](specs.json). **They change together.**

## How this folder works

| Path | What it holds |
|---|---|
| [`specs.json`](specs.json) | The registry — machine-readable, and what the website renders |
| [`initiative-backlog.md`](initiative-backlog.md) | Cross-cutting work with a rationale and a definition of done |
| [`idea-backlog.md`](idea-backlog.md) | Raw ideas, one line each, committed to nothing |
| `<spec>/README.md` | Overview, status, and links for one specification |
| [`adr/`](adr/) | Why this repository is shaped the way it is |

## What belongs where

The distinction that matters most, because getting it wrong creates two sources of truth for the same
fact:

- **A `<spec>/README.md` describes a specification. It never defines one.** It says what the format
  is for, what state it is in, and where the authoritative artifacts are. The moment it states a rule
  — a field name, a validity constraint, a version compatibility promise — that rule exists in two
  repositories and one of them will drift. Link to the rule instead of restating it.
- **The specification's own repository is authoritative** for its schema, its prose, its corpus, and
  its version.

The same split applies to the backlogs:

- **`idea-backlog.md`** — one line, no rationale, no owner. The bar is "someone thought of it."
  Nothing here is committed to, and nothing here is a plan.
- **`initiative-backlog.md`** — a cross-cutting piece of work with an argument for why it matters and
  a stated definition of done. The bar is "we could start this tomorrow and know when it is
  finished."

Ideas are promoted into initiatives; initiatives are promoted into milestones in whichever repository
does the work. Nothing is ever deleted from either file — a dropped idea keeps its line and gains a
reason, because the second person to have an idea deserves to know why the first one was declined.

## Adding a specification

1. The idea earns a line in `idea-backlog.md`.
2. It earns an entry in `initiative-backlog.md` with scope and a definition of done.
3. Only then: a repository, an entry in `specs.json`, and a folder here.

The test for step 2 is not "would this be useful." It is **does this need to be interchangeable
between studios?** A format only one team will read is a schema, and it is cheaper to keep it inside
the game that uses it. See [CONTRIBUTING.md](../CONTRIBUTING.md).

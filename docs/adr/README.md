# Architecture Decision Records

Why this repository is shaped the way it is. Each record is immutable once accepted — a changed
decision means a new ADR that supersedes the old one, never an edit to the original.

Status: **Proposed** (awaiting `/adr-review`) · **Accepted** · **Rejected** · **Superseded** · **Deprecated**

| # | Title | Status | Date |
|---|---|---|---|
| [0001](0001-federated-spec-repositories.md) | Each specification lives in its own repository; OpenGameSpec describes, never defines | **Accepted** | 2026-08-25 |
| [0002](0002-vite-react-website.md) | Build the website with Vite, React, and Tailwind | **Accepted** | 2026-08-25 |
| [0003](0003-two-backlogs.md) | Separate the idea backlog from the initiative backlog | ~~Rejected~~ | 2026-08-25 |

## Scope

**Records here bind the family.** A decision that constrains every specification — how one references
another, what versioning scheme they share, what conformance means — belongs in this folder, and
reversing it means changing every repository that adopted it. Expect a correspondingly high bar.

**Records that bind a single specification belong in that specification's own `docs/adr/`.** See
[OpenQuestSpec's ADRs](https://github.com/msmith-game-dev/OpenQuestSpec/tree/main/docs/adr) for the
existing set; they are worth reading before proposing anything here, because several of this
family's shared conventions were first argued there.

Nothing currently enforces a specification adopting a family-level decision. That gap is recorded as
a follow-up in ADR-0001 and is a governance question.

## Reading order

0001 first — it decides what this repository *is*, and 0002 is a consequence of it: the stack was
only settleable once 0001 removed specification prose from the site's requirements.

**0003 was rejected on scope, not on merit.** The two backlogs it describes exist and are in use;
what was rejected is recording their organisation as an architecture decision, since it binds no
specification and costs a `git mv` to reverse. Read its rejection reason for where the substance
lives — and read it before proposing anything here, because it is the clearest statement of what this
folder is not for.

Both accepted records carry `## Review notes` describing what the review changed. In each case the
decision survived and the *argument* did not: 0001 was beating a strawman version of git submodules,
and 0002 had omitted Next.js, the option most readers would look for first. Neither changed the
outcome. Both are worth reading as a record of how thin an unreviewed alternatives section can be.

## Where things live

| File | Question it answers |
|---|---|
| `docs/adr/` | **Why** this repository is the way it is, and what was rejected |
| `ARCHITECTURE.md` | **What** the resulting rules are, stated prescriptively |
| `docs/initiative-backlog.md` | What the initiative does next, and how it will know it is done |
| `docs/idea-backlog.md` | What has merely been thought of |
| `docs/specs.json` | Which specifications exist and what state they are in |

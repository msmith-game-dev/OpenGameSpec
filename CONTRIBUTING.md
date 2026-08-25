# Contributing to OpenGameSpec

This repository holds the umbrella documentation and the website. **It does not hold any
specification.** Before opening a pull request, check you are in the right place:

| You want to change | Go to |
|---|---|
| A rule in the quest format, its schema, or its corpus | [OpenQuestSpec](https://github.com/msmith-game-dev/OpenQuestSpec) |
| The overview page, status, or links for a specification | `docs/<spec>/README.md` here |
| What the initiative works on next | `docs/initiative-backlog.md` here |
| A rough idea nobody has committed to | `docs/idea-backlog.md` here |
| The website | the site source here (not built yet — see ADR-0002) |

Editing `docs/openquest/README.md` to describe a schema rule that the OpenQuestSpec repository does
not enforce creates two sources of truth for the same fact. The overview page describes a
specification; it never defines one.

## Sign off your commits

Every commit must carry a `Signed-off-by:` trailer:

```bash
git commit -s -m "Your message"
```

Sign-off is a **Developer Certificate of Origin** — it certifies you have the right to submit the work
under this project's licence. It transfers nothing: you keep copyright in your contribution, and the
project holds an Apache 2.0 licence to it like everyone else.

The full DCO text is at <https://developercertificate.org/>. In short, you certify that the work is
yours to give, or that you received it under a compatible licence and are passing it on with its
history intact.

## Proposing a new specification

A new specification starts as **one line in `docs/idea-backlog.md`**, not as a repository. The bar
for a line in the backlog is deliberately near zero; the bar for a repository is not.

Promotion goes idea → initiative → repository:

1. **Idea** — a line in `docs/idea-backlog.md`. Costs nothing, commits to nothing.
2. **Initiative** — an entry in `docs/initiative-backlog.md` with a rationale, scope, and what
   "done" means. This is where the argument gets made.
3. **Repository** — its own repo, its own version line, an entry in `docs/specs.json`, and an
   overview folder under `docs/`.

The question that decides whether an idea becomes an initiative is not "would this be useful" — it is
**does this need to be interchangeable between studios?** A format only two people will ever read is
a schema, not a specification, and it costs less to keep it in the game that uses it.

## Keeping the registry honest

`docs/specs.json` is the machine-readable list of specifications, and it is what the website renders.
When a specification's status or version changes, that file changes in the same commit as the
overview page. A registry that disagrees with the page next to it is worse than no registry, because
the website will confidently publish the wrong one.

## Decisions

Anything expensive to reverse, or that constrains more than one specification, gets an Architecture
Decision Record in [`docs/adr/`](docs/adr/). The index there explains the format. Records are written
as `Proposed` and reviewed separately; nothing is binding until accepted.

Decisions that bind a **single** specification belong in that specification's own `docs/adr/`.
Decisions recorded here bind the family — expect a higher bar, because reversing one means changing
every specification that adopted it.

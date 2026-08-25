# OpenGameSpec

Open specifications for game content — and the home of the initiative that produces them.

Game studios rebuild the same content formats on every project. Quests, dialogue, items, loot tables:
each one gets a bespoke schema, a bespoke editor, and a bespoke importer, and none of it survives the
engine it was written for. OpenGameSpec exists to make those formats **portable, versioned, and
implementable by anyone** — the model is [OpenAPI](https://www.openapis.org/), which did the same for
HTTP APIs.

> ## ⚠ Early — one specification exists, and it is a draft
>
> [OpenQuestSpec](docs/openquest/) is at `0.1-draft` and promises **no compatibility between draft
> versions**. Everything else on this page is planned, not built. Nothing here should be treated as
> stable.

## The specifications

| Specification | Covers | Status | Repository |
|---|---|---|---|
| [OpenQuestSpec](docs/openquest/) | Quests, objectives, rewards | `0.1-draft` | [msmith-game-dev/OpenQuestSpec](https://github.com/msmith-game-dev/OpenQuestSpec) |
| [OpenDialogSpec](docs/opendialog/) | Dialogue trees, speakers, conditions | Planned | — |
| [OpenItemSpec](docs/openitem/) | Items, stats, inventory semantics | Planned | — |

Each specification lives in **its own repository** and is versioned independently. This repository is
the umbrella: it holds the overview for each specification, the shared conventions they follow, and
the backlog of what the initiative does next. It does not hold the specifications themselves — see
[ADR-0001](docs/adr/0001-federated-spec-repositories.md) for why.

## What is in this repository

```
docs/
  README.md               index of every specification and how this folder works
  specs.json              machine-readable registry — the source the website renders
  initiative-backlog.md   cross-cutting work: what the initiative does next
  idea-backlog.md         raw ideas, one line each, not committed to
  openquest/              overview, status, and links for OpenQuestSpec
  opendialog/             ditto — planned
  openitem/               ditto — planned
  adr/                    why this repository is shaped the way it is
```

The website source will live at the root of this repository alongside `docs/`. It is **not built
yet**; the stack is decided and recorded in [ADR-0002](docs/adr/0002-vite-react-website.md).

## What these specifications have in common

Shared conventions are what make a family of specifications worth more than the sum of its parts. A
tool that understands one should be able to guess correctly at the next.

- **JSON, with a normative JSON Schema.** The schema is the authority; the prose describes it. Anyone
  can validate a document in any language without installing our tooling.
- **Draft versioning until 1.0.** Breaking changes are permitted between drafts and forbidden after.
- **A conformance corpus, self-certified.** No registry, no approval — run the corpus and report what
  it says.
- **`x-` vendor extensions**, carried through as opaque data so studios extend without forking.
- **Apache 2.0**, chosen for its express patent grant — the question a studio's legal review actually
  asks before committing a content pipeline to someone else's format.

These are conventions the existing specification already follows, not rules imposed from here. They
are written down so the second and third specifications do not each reinvent an answer. Where a new
specification has a good reason to diverge, that reason belongs in an ADR.

## Contributing

Contributions require a [DCO](https://developercertificate.org/) sign-off — commit with `git commit -s`.
See [CONTRIBUTING.md](CONTRIBUTING.md).

Proposals for a **new specification** start as an entry in
[`docs/idea-backlog.md`](docs/idea-backlog.md), not as a repository. Changes to an **existing**
specification belong in that specification's own repository.

## Licence

[Apache License 2.0](LICENSE).

The short version: you may implement these specifications, build tooling for them, and ship products
using them, without asking.

Copyright 2026 Arctic Flame Games Ltd — see [NOTICE](NOTICE).

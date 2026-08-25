# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**There are none yet.** No `package.json`, no build, no test suite, no linter. This repository is
currently prose and one JSON file. Do not invent commands or assume a toolchain exists — if a task
seems to need one, that is the website milestone, which has not started.

The one check worth running by hand after editing `docs/`:

```bash
node -e "JSON.parse(require('fs').readFileSync('docs/specs.json','utf8'))"   # registry parses
```

## What this repository is

The umbrella for the OpenGameSpec family — open specifications for game content. It holds the
overview of each specification, the conventions they share, the backlogs, and (in future) the
website.

**No specification is defined here.** Each lives in its own repository, versioned independently
(ADR-0001). Related repos on this machine:

| Repo | Path | Owns |
|---|---|---|
| OpenQuestSpec | `../OpenQuestSpec` | The quest format: schema, prose, corpus, generators |
| arctic-flame-games-website | `../PublicCompanyWebsite` | The stack this site will copy (ADR-0002) |

## The two rules that matter

**1. An overview page describes a specification and never defines one.** `docs/<spec>/README.md` may
say what a format is for, what state it is in, and where the authoritative artifacts live. It may not
state a rule — no field names, no validity constraints, no compatibility promises. Link to the rule
in the specification's own repository instead of restating it. The moment a fact lives in two repos,
one of them starts drifting and the reader cannot tell which.

If asked to change how a quest document works, the answer is in `../OpenQuestSpec`, not here.

**2. `docs/specs.json` and the pages beside it change in the same commit.** The registry duplicates
`status` and `version` from specifications it does not own — the one deliberate duplication in the
repo. It is the website's data source. A stale entry does not fail a build; it publishes something
false. Editing a spec's status means editing both the registry and `docs/README.md`'s table.

## Layout

```
docs/
  README.md               index + what-belongs-where
  specs.json              THE REGISTRY — website data source
  initiative-backlog.md   cross-repo work: why / scope / done / blockers
  idea-backlog.md         one line per idea, no rationale
  <spec>/README.md        overview only
  adr/                    family-level decisions
```

Note the backlogs live in `docs/`, **not** at the repo root. This departs from the `/idea-backlog`
skill's default of a root-level `idea-backlog.md` — it was an explicit requirement. Maintain them by
hand rather than letting a skill write to the root.

There is no `MILESTONES.md`. Work here is tracked in the initiative backlog until the website
milestone starts.

## Backlog routing

- **One line, no argument** → `docs/idea-backlog.md`
- **Spans repos or creates one, has a definition of done** → `docs/initiative-backlog.md`
- **Inside a single specification** → that repository's `MILESTONES.md`

Never delete a backlog entry. Move it to `Promoted` or `Dropped` with a date and a reason.

## ADR scope

Records in `docs/adr/` **bind the whole family** — reversing one means changing every specification
that adopted it, so the bar is high. A decision binding one specification belongs in that
specification's `docs/adr/`.

ADRs are written `Proposed` and accepted only by `/adr-review`. 0001–0003 are currently Proposed.

## Conventions

- **Commits:** Conventional Commits, imperative, subject ≤ 50 chars. **DCO sign-off required** —
  `git commit -s`. Never `--no-verify`.
- **Line endings:** LF everywhere, enforced by `.gitattributes`. This is a Windows machine; do not
  fight it.
- **Licence:** Apache 2.0, for the express patent grant.
- **Markdown:** wrap prose at 100 characters. Relative links between docs, absolute links to other
  repositories.

## Writing voice

The docs argue rather than announce. Applies to anything added here:

- State the cost of a decision, not just its benefit. Every ADR's `Negative` section is real.
- Never overpromise. A `planned` specification says *this does not exist*, with no timeline — the
  family has one draft specification and credibility is the only asset it has.
- Prefer the concrete failure mode over the abstract principle: "a stale status publishes a lie"
  beats "keep documentation in sync."

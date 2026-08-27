# OpenDialogSpec

A format for describing dialogue: speakers, lines, branches, and the conditions that gate them.

| | |
|---|---|
| **Status** | **Scaffolded** — no schema yet |
| **Version** | — |
| **Repository** | [msmith-game-dev/OpenDialogSpec](https://github.com/msmith-game-dev/OpenDialogSpec) |
| **Licence** | Apache 2.0 |

> ## There is no format yet
>
> The repository exists as of 2026-08-27 and contains **no schema, no prose, and no version** — a
> licence, contribution rules, workspace tooling, and an empty conformance corpus. **Do not build
> against this. There is nothing to build against.**
>
> It was scaffolded so the work has somewhere to start and so the open questions below have a home,
> not because the work has started.

## Why it is on the list

Dialogue is, after quests, the most-rebuilt content format in games — and the one where the format
most often outlives the project, because writers accumulate tooling habits that survive an engine
change. It is also where the family's central problem gets real: dialogue that cannot start a quest,
check an item, or set a flag is dialogue nobody ships. A dialogue format designed without an answer
to *how it points at things another specification owns* would have to break to get one.

## What has to be decided first

Recorded now so the eventual design work does not start by rediscovering them.

- **How a line references something outside the dialogue** — a quest, an item, a world flag. This is
  the [cross-specification reference](../initiative-backlog.md) problem, and dialogue is where it
  becomes unavoidable.
- **Whether conditions and effects are expressions or declarations.** An expression language is more
  capable and drags in parsing, evaluation-order semantics, and a security surface. A declarative
  vocabulary is duller and portable. The prior art splits on exactly this line.
- **Whether presentation belongs in the format at all** — portraits, camera, voice-over ids, timing.
  Including it makes the format engine-flavoured; excluding it means every studio bolts on `x-`
  fields for the same handful of things.
- **How localization works**, given a dialogue document is mostly translatable strings. This is the
  one place where getting the format wrong is unrecoverable in production.

## Prior art worth studying before writing anything

[Yarn Spinner](https://www.yarnspinner.dev/), [Ink](https://www.inklestudios.com/ink/), and
[Twine](https://twinery.org/) all solved this and made different, defensible choices. Any proposal
that has not accounted for why writers like those tools is starting behind, not ahead — a format that
is technically superior and unpleasant to write does not get adopted.

## Blocked on

OpenQuestSpec reaching a state where its patterns are worth copying. The family's shared conventions
are currently observations drawn from a sample of one; starting a second specification before the
first has a working validator means guessing twice instead of learning once.

See [`initiative-backlog.md`](../initiative-backlog.md) for the full entry.

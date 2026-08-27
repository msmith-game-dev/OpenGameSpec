# OpenItemSpec

A format for describing items: their identity, their stats, and their inventory semantics.

| | |
|---|---|
| **Status** | **Scaffolded** — no schema yet |
| **Version** | — |
| **Repository** | [msmith-game-dev/OpenItemSpec](https://github.com/msmith-game-dev/OpenItemSpec) |
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

Items are the family's shared vocabulary. A quest reward is an item. A loot table drops items. A shop
sells them, a recipe consumes them, a dialogue check requires one. That makes OpenItemSpec the format
everything else points at — and the one whose mistakes propagate furthest, because a bad decision
here is inherited by every specification that references it rather than staying local.

That is also the argument for **not** rushing it. A widely-referenced format designed early, from one
game's assumptions, is the most expensive thing this family could ship.

## What has to be decided first

Recorded now so the eventual design work does not start by rediscovering them.

- **Item definition versus item instance.** "Iron Sword" the type and "the iron sword in slot 3 with
  47 durability" are different things, and formats that conflate them cannot describe a save file.
  Whether instances are in scope at all is the first fork in the road.
- **Whether stats are a fixed vocabulary or open strings.** Damage and weight generalise; *stagger
  resistance* does not. OpenQuestSpec chose open strings for objective types and deferred the
  vocabulary — the same tension, and the same choice is available.
- **How much inventory semantics belong in an item format** — stacking, weight, slots, equip rules.
  These are game-design decisions wearing data's clothing, and every one included narrows how many
  games can use the format.
- **Modifiers and derived values.** The moment an item can carry "+10% fire damage", the format needs
  an opinion on evaluation and stacking, which is a rules engine, not a data format.

## Blocked on

The [cross-specification reference](../initiative-backlog.md) decision. Items are the thing
everything else points at, so designing them before deciding how pointing works is the wrong order —
the reference design would end up derived from whatever OpenItemSpec happened to do first.

See [`initiative-backlog.md`](../initiative-backlog.md) for the full entry.

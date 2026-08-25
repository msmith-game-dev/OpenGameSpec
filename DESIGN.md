# Design

> Last updated: 2026-08-25
>
> The visual identity for the OpenGameSpec website. `ARCHITECTURE.md` says how the site is built;
> this says how it looks and why. Where the two disagree about a token name, this file is the
> source and the code is the bug.

## The problem this design solves

The site has two audiences and they want opposite things.

**Game developers** need it to feel like it belongs in their world. A specification site that looks
like enterprise middleware gets closed before the first paragraph, because nothing about it suggests
the author has ever shipped a game.

**Studio tech leads and legal reviewers** are the people ADR-0009 identifies as deciding whether to
commit a content pipeline to this format. They are evaluating whether this project will still exist
in three years. Arcade kitsch reads as a hobby.

**The resolution: the game-ness is functional, never decorative.** Every game-derived device on this
site encodes real information. Rarity colors carry specification maturity. HUD framing marks the
boundary between authored content and machine-read data. Validation states use the pass/fail
language the product itself is about. Nothing is here because it looks like a game — it is here
because it is the clearest way to say something true, and it happens to look like a game because
this *is* a game project.

That is the test for anything added later. **If a device carries no information, cut it.**

---

## Color

### Base

Not neutral gray. Game UI darks carry a cast, and this one is violet-black — cold, deep, and
distinct from the slate every developer tool defaults to.

| Token | Hex | Use |
|---|---|---|
| `--void` | `#07060F` | Page background. The floor. |
| `--panel` | `#0E0D1B` | Panels, cards, code blocks. |
| `--panel-raised` | `#16142A` | Hover states, nested surfaces, active rows. |
| `--edge` | `#262244` | Hairline borders and HUD rules. |
| `--edge-bright` | `#3D3768` | Focus and hover borders. |
| `--ink` | `#F2F0FF` | Primary text. Not pure white — takes the base's cast. |
| `--ink-dim` | `#A7A3C4` | Body copy and secondary text. |
| `--ink-faint` | `#6A668A` | Captions, metadata, disabled. |

### The rarity ramp

The core system. Every game player already knows this vocabulary, and it maps onto specification
maturity with no explanation required.

| Tier | Hex | Meaning here |
|---|---|---|
| Common | `#8B93A7` | Exists in name only |
| Uncommon | `#3FD07C` | *Reserved* |
| Rare | `#3B9DFF` | Usable, not final |
| Epic | `#B265FF` | *Reserved* |
| Legendary | `#FF8A1F` | Proven, stable |
| Junk | `#5A5F70` | Superseded |

**Uncommon and Epic are reserved deliberately, not left over.** They are the runway for statuses the
family does not have yet — an `experimental` tier below draft, or a `candidate` tier between draft
and stable. Adding one later should be a token assignment, not a palette redesign.

### Status mapping

The registry's four `status` values, and nothing else, appear on the site:

| Registry status | Tier | Chip label |
|---|---|---|
| `planned` | Common `#8B93A7` | `COMMON` |
| `draft` | Rare `#3B9DFF` | `RARE` |
| `stable` | Legendary `#FF8A1F` | `LEGENDARY` |
| `deprecated` | Junk `#5A5F70` | `JUNK` |

**`planned` must never read as anticipation.** Common is a muted gray with a dashed border and no
glow. It is the visual equivalent of an empty inventory slot. The family has one draft specification,
and a coming-soon treatment on the other two would be the overpromise this project cannot afford.

`deprecated` gets Junk gray plus reduced opacity. Struck-through text is *not* used — it hurts
legibility and a deprecated specification still needs to be readable by the people migrating off it.

### Brand accent

**Legendary orange `#FF8A1F` is the brand accent**, and the tie is not arbitrary: it is the flame in
Arctic Flame Games, and it is the tier the whole project is climbing toward. Primary buttons, the
logo mark, active navigation, and link hover all use it.

Consequence to accept: when a specification reaches `stable`, its rarity chip is the same color as
the brand. That is the point — the accent means *arrived*.

### Signal colors

The product is about documents being valid or invalid. That deserves its own colors, not repurposed
rarity tiers.

| Token | Hex | Use |
|---|---|---|
| `--valid` | `#3FD07C` | Passes validation. Corpus green. |
| `--invalid` | `#FF3D6E` | Fails validation. Diagnostics, errors. |
| `--warn` | `#FFC53D` | Valid but suspect. Draft warnings, lint. |

`--valid` shares a hex with Uncommon. That is fine and intended: both mean "this is good," and the
contexts never collide — one appears in a rarity chip, the other beside a line of JSON.

### Rules

- **One accent per view.** A page may use the brand orange or a rarity color as its highlight, not
  both competing.
- **Rarity colors never decorate.** A rarity color on the page means a specification's maturity is
  being stated. Never use Legendary orange as a rarity signal on something that is not a spec.
- **Glow is reserved for `stable` and focus.** A soft outer shadow at 12% is the only glow in the
  system. Applying it everywhere makes it mean nothing.
- **Contrast floor is 4.5:1 for text on `--void` or `--panel`.** Every ink and rarity token above
  clears it at 14px and up. Chip labels are 11px and therefore carry a border rather than relying on
  color alone.

---

## Typography

| Role | Face | Weights |
|---|---|---|
| Display | **Chakra Petch** | 600, 700 |
| Body | **Inter** | 400, 500, 600 |
| Data | **JetBrains Mono** | 400, 500 |

Chakra Petch has squared terminals and a slight technical compression — it reads as game UI without
costume. It is used with restraint: headings and chrome labels only, never body copy, where its
character becomes fatigue.

Self-host via `@fontsource`. No external font request — a spec site that cannot render without
calling Google is making a claim about dependencies it should not make.

### The mono rule

**Anything a machine reads is set in JetBrains Mono.** Version strings, specification ids, field
names, JSON, file paths, diagnostic codes.

This is the typographic expression of the whole product. `0.1-draft` is not prose, it is an
identifier with exact characters that matter, and setting it in mono says so before anyone reads it.
Applied consistently, a reader learns the rule without being told.

### Scale

| Token | Size / line | Face | Use |
|---|---|---|---|
| `display` | 56 / 1.05 | Chakra Petch 700 | Hero headline only |
| `h1` | 40 / 1.1 | Chakra Petch 700 | Page titles |
| `h2` | 28 / 1.2 | Chakra Petch 600 | Section headings |
| `h3` | 20 / 1.3 | Chakra Petch 600 | Card and subsection titles |
| `eyebrow` | 12 / 1 | Chakra Petch 600 | Uppercase, `0.18em` tracking |
| `body-lg` | 18 / 1.65 | Inter 400 | Hero subhead, intros |
| `body` | 16 / 1.65 | Inter 400 | Default |
| `small` | 14 / 1.55 | Inter 400 | Captions, metadata |
| `chip` | 11 / 1 | Chakra Petch 600 | Uppercase, `0.12em` tracking |
| `code` | 14 / 1.6 | JetBrains Mono 400 | JSON and inline identifiers |

Display drops to 36 below 640px. Nothing else changes size — the scale is tight enough to hold.

---

## HUD layout language

### The notch

**The signature structural device.** Panels are cut at two opposite corners — top-left and
bottom-right — never all four.

```
 ╱────────────────────────┐
│                         │
│                         │
└────────────────────────╱
```

```css
clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
```

The asymmetry is the point. Four cut corners reads as a generic sci-fi frame; two reads as a
deliberate object with an orientation. Used on spec cards, panels, and primary buttons. **Not** on
code blocks — clipping a scrollable region cuts its content.

### Corner brackets

A 1px bracket in `--edge-bright` at the two *uncut* corners, 16px per leg. On hover the legs extend
to 24px. This is the only place the interface moves without being asked.

### Data rows

The HUD idiom for stating a fact: label left, value right, hairline between.

```
STATUS                              RARE
VERSION                        0.1-draft
LICENCE                        Apache-2.0
```

Label in `eyebrow`, `--ink-faint`. Value in `code`, `--ink`, or the rarity color when it is a status.
Used on spec pages and anywhere a short list of machine facts is presented — never for prose.

### Grid and spacing

- Content max width `1120px`, prose max width `680px`. Specification overviews are long-form reading
  and must not run to full width.
- Spacing scale: `4 8 12 16 24 32 48 64 96 128`. Section padding is `96` desktop, `64` mobile.
- Radius: `0` on notched panels, `6px` on chips and inputs, `8px` on code blocks. The system is
  angular by default — rounding is the exception and is only there where a notch would cut content.

---

## Components

### Rarity chip

The most-used component on the site and the clearest expression of the system.

```
┌──────────────────┐
│ ◆ RARE  0.1-draft│
└──────────────────┘
```

- 1px border in the tier color, background at 10% tier color, label in tier color.
- Leading `◆` glyph. `planned` uses `◇` (hollow) and a dashed border — the empty-slot signal.
- Version in `code` immediately after the label, `--ink-dim`. Omitted entirely when null; no
  placeholder dash, because a dash implies a value is coming.
- `stable` gains the 12% outer glow. No other tier does.

### Spec card

Notched panel, corner brackets, rarity-colored top edge (2px). Title in `h3`, summary in `body`
clamped to three lines, then a data row for version and a link row.

On hover: border to the rarity color, brackets extend, panel lifts to `--panel-raised`. A `planned`
card does not lift or brighten — it stays inert, because there is nothing behind it to go to.

### Buttons

- **Primary** — Legendary orange fill, `--void` text, notched. One per view.
- **Secondary** — `--edge` border, `--ink` text, notched. Border to `--edge-bright` on hover.
- **Ghost** — text only, `--ink-dim` to `--ink`.

Labels are Chakra Petch 600, sentence case, and name the action exactly: "Read the specification,"
never "Learn more."

### Code block

`--panel` background, `8px` radius, 1px `--edge` border, no notch. A `JSON` label in `eyebrow` sits
in the top-right at `--ink-faint`. Syntax colors draw from the signal palette so a document that
demonstrates validity looks like the validator's own output.

---

## The signature: the document, rendering itself

The hero is not a headline over a gradient. **It is the product's thesis, shown.**

Two panels, side by side, fed by the same data:

```
┌─ QUEST DOCUMENT ──────────┐  ╱─ QUEST LOG ─────────────┐
│ {                         │ │  ◆ Clear the Bandit Camp │
│   "openquest": "0.1-draft"│ │                          │
│   "quests": {             │ │  ☑ Reach the camp        │
│     "bandit-camp": {      │ │  │                       │
│       "objectives": {     │ │  └─☐ Defeat the leader   │
│         "reach-camp": {…} │ │       requires reach-camp│
│         "defeat-leader":{…}│ │                          │
│       },                  │ │  REWARD        250 gold  │
│       "rewards": [ … ]    │ │                          │
│ }                         │ │  ● VALID  schema + seman.│
└───────────────────────────┘ └─────────────────────────╱
```

Left: the actual JSON, syntax-coloured. Right: the same quest as a game HUD tracker — objectives with
checkboxes, the `requires` dependency drawn as a connector line, the reward as a data row, and a
validation state in `--valid`.

**Why this and not a headline.** Every other framing has to *claim* the value proposition. This one
demonstrates it in one glance: one document, two presentations, machine-checkable. It is also
unmistakably a game screenshot and unmistakably a developer artifact at the same time — which is
precisely the two-audience problem this design exists to solve.

The connector line between `reach-camp` and `defeat-leader` is the detail worth getting right. It is
the visual form of the one rule a JSON Schema validator cannot check, and it is why this project
needs a specification rather than a schema.

---

## Motion

One orchestrated sequence, not scattered effects.

**Page load.** Panels boot in over `420ms`: clip-path wipe from the notched corner, corner brackets
draw in over `180ms`, content fades at `120ms`. Staggered `60ms` apart, top to bottom. It reads as a
HUD initialising, and it happens once.

**Hover.** Corner brackets extend `16px → 24px` over `160ms`. Border color shifts. Nothing scales,
nothing rotates.

**Never animated:** rarity chips, validation states, body text. A status that pulses implies activity
where there is none.

**`prefers-reduced-motion: reduce` disables the boot sequence and bracket extension entirely.** Final
states render immediately. This is a floor, not an enhancement.

---

## Voice

The repository already has a voice — it argues rather than announces, and states costs alongside
benefits. Site copy matches it, compressed.

- **Name the artifact.** "A quest document," not "your content." "The schema," not "our technology."
- **Never oversell scale.** One draft specification is one draft specification. The landing page says
  how many exist and how many have not started, from the registry, so it cannot drift into flattery.
- **Buttons name the action and keep the name.** A button that says "Read the specification" leads to
  a page headed the same way.
- **Empty and planned states are invitations or plain facts, never mood.** "No repository yet" beats
  "Coming soon" because it is true and it tells the reader what to do next: nothing.

---

## Accessibility floor

Not optional and not a later pass.

- 4.5:1 contrast for all text; 3:1 for borders and non-text indicators.
- **Rarity is never the only signal.** Every chip carries a text label, so the system works in
  grayscale and for the ~8% of male players with red-green colour deficiency — a share of this
  audience too large to treat as an edge case.
- Visible keyboard focus everywhere: 2px `--edge-bright` outline, 2px offset. The notch does not clip
  the focus ring.
- Reduced motion respected as above.
- Responsive to 360px. The hero's two panels stack, document above log.

---

## Rejected

Recorded so they are not re-proposed.

- **Scanlines, CRT curvature, chromatic aberration.** Belongs to the arcade direction that was not
  chosen. Adds texture, encodes nothing, and dates fast.
- **Pixel type for headings.** Illegible above two words, and it signals retro rather than current —
  the specifications target Unity and Unreal, not the NES.
- **Specification mascots.** A charming mascot per spec would be genuinely fun and is the single
  fastest way to lose the studio tech lead in the second audience.
- **Parchment and fantasy ornament.** Fits OpenQuestSpec and actively fights OpenItemSpec and any
  sci-fi studio evaluating it. The family cannot be one genre.
- **Full-bleed hero video of gameplay.** This project has no game to show. Borrowing footage would
  imply adoption that does not exist.

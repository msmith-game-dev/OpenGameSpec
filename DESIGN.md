# Design

> Last updated: 2026-08-25
>
> Visual identity for the OpenGameSpec website. `ARCHITECTURE.md` says how the site is built; this
> says how it looks and why. Where the two disagree about a token, this file is the source.

## The concept

**A game manual is a specification.** It tells you what the objects are, what they do, and how the
rules fit together — printed, versioned, and shipped in the box. That is the same job OpenGameSpec
does for content formats, so the instruction booklet is not a costume borrowed from games. It is the
correct form for the thing being made.

Everything below comes from that one idea. The manual's own devices — numbered callouts, figure
captions, warning panels, contents with dot leaders — are the site's structural language, because
each of them already exists to explain a system to someone encountering it for the first time.

## The two audiences

The site serves game developers, who need it to feel native to their world, and studio tech leads
and legal reviewers, who ADR-0009 identifies as deciding whether to commit a content pipeline to
this format. Those audiences want opposite things from a design.

The manual resolves it. It is unmistakably games and unmistakably a serious document, because that
is exactly what a manual is. Nothing has to be dialled back to stay credible.

**The test for anything added later: does it explain something?** A manual has no ornament — every
device on the page is there to teach. Halftones, crop marks and stock texture look right and explain
nothing. If a device carries no information, cut it.

---

## Colour

Four inks on paper. The constraint is authentic — booklets were printed in limited spot colours —
and it forces every colour to mean something.

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#FFFFFF` | Page. |
| `--stock` | `#F1F2F4` | Panels, code blocks, table stripes. Cool, never cream. |
| `--ink` | `#111318` | All body text and rules. |
| `--ink-mid` | `#4A4F5A` | Secondary text, captions. |
| `--ink-light` | `#8A9099` | Metadata, disabled, leader lines. |
| `--red` | `#E8442B` | **Brand.** Primary actions, logo, callout numbers, links. |
| `--blue` | `#1B4FD8` | Verified and stable. |
| `--yellow` | `#FFC400` | Caution. Draft state, warning panels. |

### Yellow is a fill, never ink

`#FFC400` on white is 1.7:1 — it fails contrast badly as text. In print, yellow was always a fill
behind black type, never the type itself. Same rule here: yellow blocks, panels, and highlights with
`--ink` on top. **Never yellow text, never yellow on a dark ground.**

### Status

No rarity tiers. Manual-native labelling: a stamped box with a fill and a word.

| Registry status | Treatment | Label |
|---|---|---|
| `draft` | `--yellow` fill, `--ink` text | `DRAFT` |
| `stable` | `--blue` fill, `--paper` text | `STABLE` |
| `planned` | No fill. 1px dashed `--ink-light` outline, `--ink-light` text | `NOT IN THIS RELEASE` |
| `deprecated` | `--stock` fill, `--ink-mid` text | `WITHDRAWN` |

**`planned` is an unfilled box.** No colour, no glow, nothing to click toward. `NOT IN THIS RELEASE`
is borrowed from print and is the most honest phrasing available — it states a fact about now and
promises nothing about later. The family has one draft specification; a coming-soon treatment on the
other two is the overpromise this project cannot afford.

`deprecated` reads `WITHDRAWN` and is never struck through. People migrating off a withdrawn format
still have to read it.

### Rules

- **One red per view.** Red is the action colour. A page with three red things has no primary action.
- Blue means *verified by something*: a stable spec, a passing corpus, a resolved reference. Never
  decorative.
- Rules and borders are `--ink` at full strength. Manuals used solid black rules, not grey hairlines,
  and the weight is load-bearing: it is what makes the page read as printed rather than as a website
  with borders.

---

## Typography

| Role | Face | Weight |
|---|---|---|
| Display | **Archivo Black** | 400 (single weight by design) |
| Body | **Archivo** | 400, 500, 600 |
| Data | **IBM Plex Mono** | 400, 500 |

Archivo Black is a heavy grotesque with tight apertures — booklet-cover weight. Archivo is the same
family at text weight, so headings and body are visibly related without a pairing seam. IBM Plex Mono
carries more print texture than the usual developer monospace and sits correctly next to a grotesque.

Self-host via `@fontsource`. A specification site that cannot render without calling Google is making
a claim about dependencies it should not make.

### The mono rule

**Anything a machine reads is set in IBM Plex Mono.** Version strings, specification ids, field
names, JSON, file paths, diagnostic codes.

`0.1-draft` is not prose. It is an identifier whose exact characters matter, and mono says so before
anyone reads a word. Applied consistently, the reader learns the rule without being told.

### Scale

| Token | Size / line | Face | Use |
|---|---|---|---|
| `cover` | 72 / 0.95 | Archivo Black | Hero only. Uppercase, `-0.02em`. |
| `h1` | 44 / 1.05 | Archivo Black | Page titles. Uppercase. |
| `h2` | 30 / 1.15 | Archivo Black | Section headings. |
| `h3` | 19 / 1.3 | Archivo 600 | Card and subsection titles. |
| `eyebrow` | 12 / 1 | Archivo 600 | Uppercase, `0.16em` tracking. Section numbers. |
| `body-lg` | 18 / 1.6 | Archivo 400 | Intros. |
| `body` | 16 / 1.65 | Archivo 400 | Default. |
| `caption` | 13 / 1.45 | Archivo 500 | Figure captions. Uppercase. |
| `code` | 14 / 1.6 | IBM Plex Mono | JSON and identifiers. |

`cover` drops to 40 below 640px. Nothing else resizes.

---

## Manual devices

The structural language. Each is used only where its meaning is true.

### Numbered callouts

The signature device. A red circled numeral with a leader line pointing at part of a figure, and a
matching numbered entry beneath it.

```
       ┌──────────────────────────┐
   ①───┼─▸ "openquest": "0.1-draft"
       │                          │
   ②───┼─▸ "objectives": { … }    │
       └──────────────────────────┘
   FIG 1. A QUEST DOCUMENT

   ① Declares the format version. Draft versions promise
     no compatibility with one another.
   ② Objectives are keyed by id, not listed in an array.
```

Numerals: Archivo Black, `--paper` on a `--red` disc, 22px. Leader lines: 1px `--ink-light`,
orthogonal only — horizontal then vertical, never diagonal or curved. Print leader lines were drawn
with a set square, and the constraint is what makes it read as a manual rather than as an infographic.

**Callouts are numbered because they are a reading order.** Sequence is real information here. Do not
use numbering anywhere it is not.

### Figures

Any example document, diagram, or screenshot is a figure with a caption: `FIG 1. A QUEST DOCUMENT`.
Caption style, uppercase, `--ink-mid`, above a 2px `--ink` rule. Figures are numbered per page and
referenced in prose as "FIG 1", the way a manual does.

### Warning panels

Yellow fill, 3px `--ink` border, `--ink` text, a `⚠` at 20px. Reserved for statements about
instability and breakage — the draft-version warning is the reason this device exists:

> **⚠ 0.1-draft — nothing here is stable.** No compatibility is promised between draft versions.
> A document that validates today may not validate tomorrow.

Never used for marketing emphasis. A warning panel that has cried wolf once is furniture.

### Contents with dot leaders

The specification index is a table of contents.

```
1  OPENQUESTSPEC ....................... DRAFT   0.1-draft
2  OPENDIALOGSPEC ...................... NOT IN THIS RELEASE
3  OPENITEMSPEC ........................ NOT IN THIS RELEASE
```

Number in `eyebrow`, name in Archivo 600, dot leaders in `--ink-light`, status right-aligned. Dot
leaders are honest here: this is a contents list, and that is what contents lists do.

### Rules

2px `--ink` above section headings, 1px `--ink-light` between list rows. Sections are separated by
rules, not by whitespace alone — the page should read as a printed spread.

---

## The signature: the annotated document

The hero is not a headline over an illustration. **It is FIG 1.**

A real quest document, set in mono on stock, with numbered callouts pointing at the parts that carry
the argument, and the numbered explanations beneath. Captioned `FIG 1. A QUEST DOCUMENT`.

**Why this.** Every other hero has to *claim* the value proposition. This one teaches the format in
the time it takes to read four lines, which is the actual promise — that a designer can read one of
these documents and understand it. It is also the manual's most recognisable page, so the concept
announces itself without a word of explanation.

The callout worth getting right points at `"requires": ["reach-camp"]`. Its note says that this is
one of two rules a JSON Schema validator cannot check. That single annotation is the reason this
project publishes a specification rather than a schema, and putting it in the hero states the thesis
where a headline would only assert it.

---

## Components

### Status stamp

Rectangular, 3px `--ink` border, 4px radius, `chip` type uppercase. Fill per the status table.
Version follows in `code`, outside the stamp, `--ink-mid`. Omitted entirely when null — no
placeholder dash, because a dash implies a value is coming.

### Spec entry

Not a floating card. A **contents row** that expands into a block: number, name, dot leaders, status
stamp. On hover the row takes `--stock` and the name goes `--red`. Rows are separated by 1px rules,
edge to edge.

A `planned` row does not highlight on hover. There is nothing behind it.

### Buttons

- **Primary** — `--red` fill, `--paper` text, 3px `--ink` border, 0 radius. One per view.
- **Secondary** — `--paper` fill, `--ink` text, 3px `--ink` border.
- **Ghost** — `--ink` text with a 2px underline that goes `--red` on hover.

The heavy border on both filled buttons is the print signature: booklet buttons and diagrams were
outlined because cheap printing needed the register to hide.

Labels: Archivo 600, sentence case, naming the action exactly. "Read the specification," never
"Learn more."

### Code block

`--stock` background, 3px `--ink` border, `code` type. A `JSON` tag sits top-right in `eyebrow` on
`--ink`, `--paper` text — a printed tab on the block. Syntax uses `--blue` for keys, `--ink` for
punctuation, `--red` for string values. Three inks, like the rest of the page.

---

## Motion

**A manual is print. It does not animate.** That constraint is the design direction, not a
limitation to work around, and it keeps the site from feeling like every other animated landing page.

Permitted, and nothing else:

- **Leader lines draw in** on first view of a figure, 220ms, linear, staggered 80ms by callout
  number. Mechanical, not eased — a line being ruled, not a thing springing.
- **Hover** changes fill and colour instantly. No transition longer than 120ms, no transform.

Never animated: status stamps, warning panels, body text. A status that moves implies activity that
is not happening.

`prefers-reduced-motion: reduce` renders leader lines in their final state immediately.

---

## Voice

The repository argues rather than announces and states costs alongside benefits. Site copy matches,
compressed, with the manual's flat instructional register.

- **Name the artifact.** "A quest document," not "your content."
- **Never oversell scale.** The landing page states how many specifications exist and how many have
  not started, read from the registry, so it cannot drift into flattery.
- **Buttons keep their name.** "Read the specification" leads to a page headed the same way.
- **Empty and planned states are facts, not mood.** "No repository yet" beats "Coming soon" — it is
  true, and it tells the reader what to do next: nothing.

---

## Accessibility floor

Not a later pass.

- 4.5:1 for text, 3:1 for borders and non-text indicators. The light ground makes this easy; the one
  trap is yellow, handled by the fill-only rule above.
- **Status is never colour alone.** Every stamp carries a word, so the system works in greyscale and
  for the ~8% of male players with red-green colour deficiency — too large a share of this audience
  to treat as an edge case. Red and blue are also the safest pair for deuteranopia.
- Visible keyboard focus: 3px `--ink` outline, 2px offset.
- Leader lines are decorative SVG and `aria-hidden`; every callout note is a real ordered-list item,
  so the sequence survives with images off and reads correctly to a screen reader.
- Responsive to 360px. Below 720px the hero figure stacks above its notes and leader lines are
  dropped — inline numeric markers replace them, because a leader line to an off-screen target is
  worse than none.

---

## Rejected

Recorded so they are not re-proposed.

- **Dark background with a single bright accent.** The first attempt at this site. It is the default
  look for a developer tool, it made the project look like every other spec site, and it is what
  prompted the rebrief.
- **Rarity tiers as the colour system.** Genuinely fun and a clean mapping, but it needed a dark
  ground to work and imported an RPG loot vocabulary that OpenItemSpec and a sci-fi studio would
  both have to argue with.
- **Halftone dots, crop marks, registration marks, paper texture.** Correct period detail that
  explains nothing. First things cut under the manual's own rule.
- **Cream stock with a serif.** The other default. `--stock` is deliberately cool.
- **Specification mascots.** The fastest way to lose the second audience.
- **Full-bleed gameplay video.** This project has no game to show, and borrowed footage would imply
  adoption that does not exist.

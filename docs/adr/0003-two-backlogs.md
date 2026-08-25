# ADR-0003: Separate the idea backlog from the initiative backlog

- **Status:** Proposed
- **Date:** 2026-08-25
- **Deciders:** Project owner (@msmith-game-dev)
- **Note:** **Not selected from options by the owner.** The requirement was for the docs folder to
  hold both an initiative backlog and an idea backlog; the distinction between them was derived and
  is written up here for review rather than accepted by default.

## Context

This repository holds two backlogs by requirement: `docs/idea-backlog.md` and
`docs/initiative-backlog.md`. Two lists of future work sitting in one folder is a maintenance hazard
unless the boundary between them is explicit — otherwise every entry becomes a judgement call, items
get filed by mood, and within a few months both files contain the same things in different formats.

There is also an existing convention to reconcile. OpenQuestSpec keeps `idea-backlog.md` at its root,
with `Open` / `Promoted` / `Dropped` sections and a one-line-per-idea rule, feeding `MILESTONES.md`.
That pipeline works and should not be forked gratuitously.

The gap the second file fills is real: under ADR-0001 the family spans multiple repositories, and
work like "decide how one specification references another" belongs to no single one of them. A
per-repository `MILESTONES.md` has nowhere to put it, and an idea backlog's one-line entries are too
thin to carry the argument such work needs before anyone starts it.

## Decision

Two files, separated by **the bar for entry**, not by subject matter.

**`docs/idea-backlog.md`** — one line per idea, no rationale, no owner, no estimate. The bar is
"someone thought of it." Grouped by area for scanning. Follows OpenQuestSpec's existing
`Open` / `Promoted` / `Dropped` structure so the convention is shared rather than forked.

**`docs/initiative-backlog.md`** — cross-cutting work, each entry carrying **why it matters**,
**scope**, **definition of done**, and any **blockers**. The bar is "we could start this tomorrow and
know when it is finished." An initiative is work that spans more than one repository or creates one;
work inside a single specification belongs in that repository's `MILESTONES.md`.

The pipeline is **idea → initiative → milestone**, with milestones living in whichever repository
does the work. Entries are never deleted: a dropped item keeps its line and gains a reason and a
date.

## Alternatives considered

### One backlog with a status column

A single file, each entry tagged `idea` / `initiative`. Fewer files, one place to look, no routing
decision for a contributor.

Rejected because the two have incompatible formats. An idea is one line and a hundred of them are
scannable; an initiative is four paragraphs and ten of them are already a long document. Mixed in one
file, either the ideas drown the initiatives or the initiatives are compressed to one line and lose
the argument that is their entire purpose. The status column would exist to compensate for a format
mismatch it cannot fix.

### Skip the idea backlog; put everything in the initiative backlog

Every entry earns a rationale or it does not get recorded. Guarantees the file is uniformly
high-quality.

Rejected because the cost of capture is what determines whether capture happens. Requiring a
rationale before an idea can be written down means ideas are not written down — they are held in
someone's head until forgotten. The one-line backlog is valuable precisely because it is nearly free,
and the low bar is the feature, not a compromise.

### Use GitHub Issues for both

Native tooling, labels, assignment, cross-repository references, and no files to maintain.

Rejected for now on visibility rather than capability. These files are read by the same tooling that
reads `ARCHITECTURE.md` and the ADRs, in the same checkout, without network access or authentication.
A backlog that only exists behind an API is invisible to that workflow. Issues remain the right
answer once there are outside contributors who need to see and claim work — at which point these
files become the summary and Issues become the detail.

## Consequences

**Positive**

- Each file has one format and one bar, so filing an entry is mechanical rather than a judgement
  call.
- Ideas cost nothing to record, so they get recorded.
- Initiatives carry a definition of done, so "is this finished" has an answer written before the work
  starts rather than negotiated after.
- The `Promoted` and `Dropped` sections preserve the reasoning history — the second person to have an
  idea learns why the first one was declined.
- Cross-repository work finally has a home, which under ADR-0001 it otherwise does not.

**Negative**

- Two files means an entry can be filed in the wrong one, and promotion is a manual copy nobody is
  assigned to do.
- Backlogs that are never groomed become archaeology. Nothing here schedules grooming.
- Split from the per-repository backlogs, so the full picture of planned work spans several files
  across several repositories — an instance of the general cost accepted in ADR-0001.
- `Promoted` and `Dropped` sections grow without bound, since nothing is ever deleted.

**Follow-up**

- Decide whether the existing `/idea-backlog` skill convention should be pointed at `docs/` in this
  repository, given it assumes a root-level `idea-backlog.md`. Until then, entries here are
  maintained by hand.
- Revisit GitHub Issues when the first outside contributor appears.
- Consider rendering the initiative backlog as a public roadmap page on the website. Adopters
  evaluating a format ask what is coming, and the answer already exists in a file.

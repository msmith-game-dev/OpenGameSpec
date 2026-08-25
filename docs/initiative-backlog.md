# Initiative Backlog

> Cross-cutting work for the OpenGameSpec family. Each entry has a rationale and a definition of
> done. Nothing is ordered — pick by argument, not by position.
>
> An initiative is work that **spans more than one repository, or creates one**. Work inside a single
> specification belongs in that repository's `MILESTONES.md`. Raw ideas belong in
> [`idea-backlog.md`](idea-backlog.md).

## Open

### The website

**Why.** The family has one specification and no public face. Adoption of a format is not a technical
problem — OpenAPI won because a reader could understand what it was in ninety seconds and find the
schema in two clicks. Right now that reader has a GitHub repository and a README, which asks them to
already care.

**Scope.** The openapis.org analogue: a landing page making the case, a specification index rendered
from `docs/specs.json`, and a page per specification. Stack decided in
[ADR-0002](adr/0002-vite-react-website.md); the open implementation question is how Vite renders
markdown living outside `src/`.

**Done when.** The site builds and deploys, the index renders from the registry rather than
hardcoded markup, a `planned` specification renders visibly as *not started* rather than as
coming-soon, and CI fails on a broken link or a malformed registry entry.

**Not in scope.** Hosting the specification prose itself. The site links to specification
repositories; it does not become a second copy of them (ADR-0001).

---

### Cross-specification references

**Why.** This is the initiative's actual thesis, and it is currently unaddressed. A quest reward is
an item. A dialogue branch completes a quest objective. If each specification invents its own way to
point at another's entities, the family is three unrelated formats sharing a prefix — and the whole
argument for an umbrella collapses.

OpenQuestSpec already has the problem in miniature: `params.target` holds `"npc.bandit-leader"`, an
opaque string only the game understands. That is correct for 0.1-draft and will not survive contact
with a second specification that has an opinion about what an NPC is.

**Scope.** Decide how a document in one specification names an entity defined in another: the
reference syntax, whether resolution is in scope for validators at all, and what a tool that
understands only one of the two specifications is required to do with a reference it cannot follow.
The answer binds every specification, so it is an ADR here, not a schema change there.

**Done when.** An ADR is accepted, and OpenQuestSpec has an issue tracking its adoption.

**Warning.** This is the highest-leverage and highest-risk item in this file. Getting it wrong early
is cheap; getting it wrong late means breaking every specification at once. Getting it *too early* is
also a failure — the design should be pulled by a second real specification, not guessed at from one.

---

### Stable schema URLs

**Why.** Editor autocomplete is the cheapest adoption mechanism a JSON format has. It requires the
schema to be resolvable at a permanent URL. Every specification will need this, and the URL scheme is
a one-way door: once documents in the wild carry a `$schema` pointing at a host, that host is a
permanent commitment.

**Scope.** Decide the URL scheme (`spec.opengamespec.org/openquest/0.1-draft.json` or similar),
where it is served from, and the immutability rule for a published version. Set it up for
OpenQuestSpec first, as the proof.

**Done when.** The scheme is recorded in an ADR, OpenQuestSpec's schema resolves at its permanent
URL, and a `$schema` reference gives autocomplete in VS Code with nothing installed.

**Depends on.** A domain. Also on the website initiative, if the two share hosting.

---

### OpenDialogSpec

**Why.** Dialogue is the second-most rebuilt content format in games after quests, and it is the one
with the most existing prior art to learn from (Yarn Spinner, Ink, Twine). It is also the natural
proving ground for cross-specification references, because dialogue that cannot start a quest is
dialogue nobody ships.

**Scope.** Repository, `0.1-draft` schema, specification prose, conformance corpus — following the
shared conventions in `ARCHITECTURE.md`.

**Done when.** The repository exists, the corpus runs green, and the registry lists it as `draft`.

**Blocked on.** OpenQuestSpec reaching a state where its patterns are worth copying. Starting a
second specification before the first has a working validator means guessing twice instead of
learning once — and the conventions this family shares are currently observations from a sample of
one.

---

### OpenItemSpec

**Why.** Items are the shared vocabulary of quest rewards, loot tables, shops, and inventory. Almost
every other specification ends up referring to them, which makes it the family's most reused format
and the one whose mistakes propagate furthest.

**Scope.** As OpenDialogSpec.

**Done when.** As OpenDialogSpec.

**Blocked on.** The cross-specification reference decision. Items are the thing everything else
points at, so designing them before deciding how pointing works is the wrong order.

---

### Governance

**Why.** A studio evaluating a long-lived content-pipeline dependency asks two questions: who decides
what enters the specification, and what happens if the maintainer stops. Right now both answers are
"one person, and nothing." That is survivable while there are no external adopters and becomes the
blocker the moment there are — and it is easier to answer before there is anyone to negotiate with.
Flagged as a follow-up in OpenQuestSpec's ADR-0009 and deferred there.

**Scope.** How a change enters a specification, who accepts an ADR, and what the family does with a
specification whose maintainer disappears. Also trademark: who may call an implementation
"OpenQuestSpec-conformant" — permissive licensing does nothing to prevent an incompatible fork
claiming the name, and trademark is the instrument that does.

**Done when.** A `GOVERNANCE.md` exists at this repository's root and each specification's
CONTRIBUTING links to it.

**Not urgent, and it should not pretend to be.** Inventing committee structure for a one-person
project is theatre. The trigger is the first outside contributor or the first studio asking.

## Promoted

<!-- Move entries here when they become milestones. Record the date and the target repository. -->

_None yet._

## Dropped

<!-- Move entries here rather than deleting them. Record the date and the reason. -->

_None yet._

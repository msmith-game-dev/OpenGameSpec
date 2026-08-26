import type { ReactNode } from 'react'

/**
 * FIG 1 — the site's signature.
 *
 * A real quest document with numbered callouts pointing at the parts that carry the argument.
 * Every other hero has to claim the value proposition; this one teaches the format in the time it
 * takes to read four lines, which is the actual promise (DESIGN.md).
 *
 * Leader lines are orthogonal and built from layout rather than SVG paths — a gutter, a rule, then
 * the code. Print leader lines were drawn with a set square, and the constraint is what makes this
 * read as a manual rather than an infographic. Below `sm` they are dropped entirely: a leader line
 * to an off-screen target is worse than none.
 */

interface Line {
  text: string
  callout?: number
}

const LINES: Line[] = [
  { text: '{' },
  { text: '  "openquest": "0.1-draft",', callout: 1 },
  { text: '  "quests": {' },
  { text: '    "bandit-camp": {' },
  { text: '      "objectives": {', callout: 2 },
  { text: '        "reach-camp": { "type": "reach-location" },' },
  { text: '        "defeat-leader": {' },
  { text: '          "type": "defeat",' },
  { text: '          "requires": ["reach-camp"]', callout: 3 },
  { text: '        }' },
  { text: '      }' },
  { text: '    }' },
  { text: '  }' },
  { text: '}' },
]

const NOTES: { n: number; body: ReactNode }[] = [
  {
    n: 1,
    body: (
      <>
        Declares the format version. Draft versions promise{' '}
        <strong className="font-semibold">no compatibility</strong> with one another.
      </>
    ),
  },
  {
    n: 2,
    body: (
      <>
        Objectives are keyed by id, not listed in an array. An id is a name, and names are how
        anything else refers to this objective.
      </>
    ),
  },
  {
    n: 3,
    body: (
      <>
        The dependency — and one of two rules{' '}
        <strong className="font-semibold">no JSON Schema validator can check</strong>. Nothing in a
        schema can tell you whether <code className="font-mono text-sm">reach-camp</code> exists.
        That is why this project publishes a specification and not just a schema.
      </>
    ),
  },
]

/** Three inks, like the rest of the page: keys blue, string values red, punctuation ink. */
function highlight(line: string) {
  const parts = line.split(/("(?:[^"\\]|\\.)*"\s*:?)/g)
  return parts.map((part, i) => {
    if (!part.startsWith('"')) {
      return <span key={i}>{part}</span>
    }
    const isKey = part.trimEnd().endsWith(':')
    return (
      <span key={i} className={isKey ? 'text-blue' : 'text-red'}>
        {part}
      </span>
    )
  })
}

function Disc({ n }: { n: number }) {
  return (
    <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-red font-display text-[12px] leading-none text-paper">
      {n}
    </span>
  )
}

export default function AnnotatedDocument() {
  return (
    <figure className="m-0">
      {/* The tab is anchored to the bordered box, not to the scrolling content — pinning it inside
          the min-w-max track put it at the content's right edge, off-screen and clipped. */}
      <div className="relative border-[3px] border-ink bg-stock">
        <span className="eyebrow absolute right-0 top-0 z-10 bg-ink px-2 py-1 text-paper">JSON</span>

        <div className="overflow-x-auto">
          <div className="min-w-max py-5 pr-5">
            {LINES.map((line, i) => (
              <div key={i} className="flex items-center">
                <span className="flex w-9 shrink-0 justify-center sm:w-11">
                  {line.callout ? <Disc n={line.callout} /> : null}
                </span>
                {/* The leader. Orthogonal, hairline, and only where a callout exists. */}
                <span
                  aria-hidden="true"
                  className={`hidden w-5 shrink-0 border-t sm:block ${
                    line.callout ? 'border-ink-light' : 'border-transparent'
                  }`}
                />
                <code className="whitespace-pre pl-2 font-mono text-[13px] leading-[1.9] sm:pl-0 sm:text-sm">
                  {highlight(line.text)}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>

      <figcaption className="caption mt-0 border-t-2 border-ink pt-2 text-ink-mid">
        Fig 1. A quest document
      </figcaption>

      <ol className="mt-6 space-y-4">
        {NOTES.map(({ n, body }) => (
          <li key={n} className="flex gap-3">
            <Disc n={n} />
            <p className="flex-1 text-[15px] leading-relaxed text-ink-mid">{body}</p>
          </li>
        ))}
      </ol>
    </figure>
  )
}

import { Link } from 'react-router-dom'
import type { Spec } from '../data/specs'
import StatusStamp from './StatusStamp'

/**
 * Not a floating card — a contents row. The specification index is a table of contents, so dot
 * leaders are honest here: that is what contents lists do (DESIGN.md).
 *
 * Takes a Spec as a prop and knows nothing about the registry — per ARCHITECTURE.md, a component
 * that imports specs.json cannot be reused and will not survive the registry's first schema change.
 */
export default function SpecRow({ spec, index }: { spec: Spec; index: number }) {
  const planned = spec.status === 'planned'

  return (
    <Link
      to={`/specifications/${spec.id}`}
      className={`group block border-b border-ink-light/40 px-2 py-5 transition-colors duration-100 ${
        /* A planned row does not highlight. There is nothing behind it. */
        planned ? '' : 'hover:bg-stock'
      }`}
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <span className="eyebrow w-6 shrink-0 text-ink-light">
          {String(index + 1).padStart(2, '0')}
        </span>

        <span
          className={`font-display text-lg uppercase tracking-tight sm:text-xl ${
            planned ? 'text-ink-light' : 'text-ink group-hover:text-red'
          }`}
        >
          {spec.name}
        </span>

        <span
          aria-hidden="true"
          className="relative -top-1 hidden min-w-8 flex-1 border-b-2 border-dotted border-ink-light/60 sm:block"
        />

        <StatusStamp status={spec.status} version={spec.version} />
      </div>

      <p className="mt-2 max-w-2xl pl-9 text-[15px] leading-relaxed text-ink-mid">{spec.summary}</p>
    </Link>
  )
}

import { Link } from 'react-router-dom'
import type { Spec } from '../data/specs'
import StatusBadge from './StatusBadge'

/**
 * One specification in the index. Takes a Spec as a prop and knows nothing about the registry —
 * per ARCHITECTURE.md, a component that imports specs.json cannot be reused and will not survive
 * the registry's first schema change.
 */
export default function SpecCard({ spec }: { spec: Spec }) {
  const planned = spec.status === 'planned'

  return (
    <article
      className={`flex flex-col rounded-2xl border p-6 transition ${
        planned
          ? 'border-slate-800 bg-slate-900/30'
          : 'border-slate-800 bg-slate-900/70 hover:border-flame-500/50 hover:bg-slate-900'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className={`text-xl font-semibold ${planned ? 'text-slate-400' : 'text-white'}`}>
          {spec.name}
        </h3>
        <StatusBadge status={spec.status} version={spec.version} />
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{spec.summary}</p>

      <div className="mt-5 flex items-center gap-4 text-sm">
        <Link
          to={`/specifications/${spec.id}`}
          className="font-medium text-flame-400 hover:text-flame-300"
        >
          Read the overview →
        </Link>
        {spec.repository ? (
          <a
            href={spec.repository}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white"
          >
            Repository
          </a>
        ) : (
          /* No repository exists. Saying so is more useful than omitting the row. */
          <span className="text-slate-600">No repository yet</span>
        )}
      </div>
    </article>
  )
}

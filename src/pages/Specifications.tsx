import { specs, specsUpdated } from '../data/specs'
import SpecCard from '../components/SpecCard'

export default function Specifications() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight text-white">Specifications</h1>
      <p className="mt-5 max-w-2xl leading-relaxed text-slate-400">
        Every specification in the family, its current state, and where its authoritative artifacts
        live. Each is versioned independently — a draft promises no compatibility between draft
        versions, and semantic versioning begins at 1.0.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {specs.map((spec) => (
          <SpecCard key={spec.id} spec={spec} />
        ))}
      </div>

      <p className="mt-12 text-sm text-slate-500">
        <strong className="text-slate-400">Not started</strong> means exactly that: no repository, no
        schema, and no timeline. The entry exists so the shape of the family is legible, not as a
        commitment.
      </p>
      <p className="mt-3 text-xs text-slate-600">Registry last updated {specsUpdated}.</p>
    </div>
  )
}

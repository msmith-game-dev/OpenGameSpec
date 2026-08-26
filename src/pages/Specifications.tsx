import { specs, specsUpdated } from '../data/specs'
import SpecRow from '../components/SpecRow'

export default function Specifications() {
  return (
    <div className="mx-auto max-w-[1120px] px-6 py-16">
      <p className="eyebrow text-ink-light">Contents</p>
      <h1 className="mt-3 break-words font-display text-3xl uppercase tracking-tight sm:text-[2.75rem]">
        Specifications
      </h1>
      <p className="mt-5 max-w-2xl leading-relaxed text-ink-mid">
        Every specification in the family, its current state, and where its authoritative artifacts
        live. Each is versioned independently — a draft promises no compatibility between draft
        versions, and semantic versioning begins at 1.0.
      </p>

      <div className="mt-10 border-t-2 border-ink">
        {specs.map((spec, i) => (
          <SpecRow key={spec.id} spec={spec} index={i} />
        ))}
      </div>

      <p className="mt-10 max-w-2xl text-[15px] leading-relaxed text-ink-mid">
        <strong className="font-semibold text-ink">Not in this release</strong> means exactly that:
        no repository, no schema, and no timeline. The entry exists so the shape of the family is
        legible, not as a commitment.
      </p>
      <p className="mt-3 font-mono text-xs text-ink-light">Registry updated {specsUpdated}</p>
    </div>
  )
}

import type { SpecStatus } from '../data/specs'

/**
 * A stamped box with a fill and a word. No rarity tiers — manual-native labelling.
 *
 * `planned` is an unfilled, dashed box reading NOT IN THIS RELEASE. That phrasing is borrowed from
 * print and is the most honest available: it states a fact about now and promises nothing about
 * later. A coming-soon treatment on two unstarted specifications is the overpromise this family
 * cannot afford while it has one draft (DESIGN.md).
 *
 * `deprecated` reads WITHDRAWN and is never struck through — people migrating off a withdrawn
 * format still have to read it.
 */

const STAMPS: Record<SpecStatus, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'bg-yellow text-ink border-ink' },
  stable: { label: 'Stable', className: 'bg-blue text-paper border-ink' },
  planned: {
    label: 'Not in this release',
    className: 'bg-transparent text-ink-light border-ink-light border-dashed',
  },
  deprecated: { label: 'Withdrawn', className: 'bg-stock text-ink-mid border-ink-mid' },
}

interface Props {
  status: SpecStatus
  version?: string | null
}

export default function StatusStamp({ status, version }: Props) {
  const { label, className } = STAMPS[status]

  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <span
        data-testid="status-stamp"
        className={`eyebrow inline-block border-[3px] px-2 py-1 ${className}`}
      >
        {label}
      </span>
      {/* No placeholder dash when null — a dash implies a value is coming. */}
      {version ? <span className="font-mono text-sm text-ink-mid">{version}</span> : null}
    </span>
  )
}

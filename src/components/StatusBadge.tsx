import type { SpecStatus } from '../data/specs'

/**
 * The four registry statuses, rendered honestly.
 *
 * `planned` is the one that matters. It means the work has not started — no repository, no schema,
 * no timeline — and it is rendered as a muted, dashed outline rather than an accented pill. A
 * coming-soon treatment here would be the overpromise this family cannot afford while it has one
 * shipped specification.
 */

const STYLES: Record<SpecStatus, { label: string; className: string }> = {
  planned: {
    label: 'Not started',
    className: 'border-dashed border-slate-600 text-slate-400',
  },
  draft: {
    label: 'Draft',
    className: 'border-flame-500/60 bg-flame-500/10 text-flame-300',
  },
  stable: {
    label: 'Stable',
    className: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300',
  },
  deprecated: {
    label: 'Deprecated',
    className: 'border-slate-600 bg-slate-800/60 text-slate-400 line-through',
  },
}

interface Props {
  status: SpecStatus
  version?: string | null
}

export default function StatusBadge({ status, version }: Props) {
  const { label, className } = STYLES[status]

  return (
    <span
      data-testid="status-badge"
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${className}`}
    >
      {label}
      {version ? <span className="font-mono opacity-80">{version}</span> : null}
    </span>
  )
}

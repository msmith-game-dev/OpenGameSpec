import type { ReactNode } from 'react'

/**
 * Yellow fill, 3px ink border, ink text. Reserved for statements about instability and breakage.
 * Never used for marketing emphasis — a warning panel that has cried wolf once is furniture.
 */
export default function WarningPanel({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 border-[3px] border-ink bg-yellow px-5 py-4 text-ink">
      <span aria-hidden="true" className="text-xl leading-tight">
        ⚠
      </span>
      <div className="text-[15px] leading-relaxed">{children}</div>
    </div>
  )
}

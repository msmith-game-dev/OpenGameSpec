import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import StatusBadge from './StatusBadge'
import type { SpecStatus } from '../data/specs'

/**
 * A badge with four states gets four assertions. The `planned` case carries a product rule rather
 * than a styling preference — it must read as "not started", never as "coming soon".
 */
describe('StatusBadge', () => {
  const cases: Array<[SpecStatus, string]> = [
    ['planned', 'Not started'],
    ['draft', 'Draft'],
    ['stable', 'Stable'],
    ['deprecated', 'Deprecated'],
  ]

  it.each(cases)('renders %s as "%s"', (status, label) => {
    render(<StatusBadge status={status} />)
    expect(screen.getByTestId('status-badge')).toHaveTextContent(label)
  })

  it('never describes a planned specification as coming soon', () => {
    render(<StatusBadge status="planned" />)
    expect(screen.getByTestId('status-badge').textContent).not.toMatch(/coming|soon/i)
  })

  it('shows a version when one is given', () => {
    render(<StatusBadge status="draft" version="0.1-draft" />)
    expect(screen.getByTestId('status-badge')).toHaveTextContent('0.1-draft')
  })

  it('renders nothing extra when version is null', () => {
    render(<StatusBadge status="planned" version={null} />)
    expect(screen.getByTestId('status-badge')).toHaveTextContent('Not started')
  })
})

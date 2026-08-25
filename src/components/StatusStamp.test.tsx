import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import StatusStamp from './StatusStamp'
import type { SpecStatus } from '../data/specs'

/**
 * Four statuses, four assertions. The `planned` cases carry a product rule rather than a styling
 * preference: it must read as not-started, never as anticipation (DESIGN.md).
 */
describe('StatusStamp', () => {
  const cases: Array<[SpecStatus, string]> = [
    ['planned', 'Not in this release'],
    ['draft', 'Draft'],
    ['stable', 'Stable'],
    ['deprecated', 'Withdrawn'],
  ]

  it.each(cases)('stamps %s as "%s"', (status, label) => {
    render(<StatusStamp status={status} />)
    expect(screen.getByTestId('status-stamp')).toHaveTextContent(label)
  })

  it('never describes a planned specification as coming soon', () => {
    render(<StatusStamp status="planned" />)
    expect(screen.getByTestId('status-stamp').textContent).not.toMatch(/coming|soon|shortly/i)
  })

  it('never strikes through a withdrawn specification', () => {
    // People migrating off a withdrawn format still have to read it.
    render(<StatusStamp status="deprecated" />)
    expect(screen.getByTestId('status-stamp').className).not.toMatch(/line-through/)
  })

  it('shows a version when one is given', () => {
    render(<StatusStamp status="draft" version="0.1-draft" />)
    expect(screen.getByText('0.1-draft')).toBeInTheDocument()
  })

  it('renders no placeholder when version is null', () => {
    // A dash would imply a value is coming.
    const { container } = render(<StatusStamp status="planned" version={null} />)
    expect(container.textContent).toBe('Not in this release')
  })
})

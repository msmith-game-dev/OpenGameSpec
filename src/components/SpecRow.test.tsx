import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SpecRow from './SpecRow'
import type { Spec } from '../data/specs'

const draft: Spec = {
  id: 'openquest',
  name: 'OpenQuestSpec',
  summary: 'A format for describing game quests.',
  status: 'draft',
  version: '0.1-draft',
  repository: 'https://github.com/msmith-game-dev/OpenQuestSpec',
  docs: 'docs/openquest',
}

const planned: Spec = {
  id: 'opendialog',
  name: 'OpenDialogSpec',
  summary: 'A format for describing dialogue.',
  status: 'planned',
  version: null,
  repository: null,
  docs: 'docs/opendialog',
}

const renderRow = (spec: Spec, index = 0) =>
  render(
    <MemoryRouter>
      <SpecRow spec={spec} index={index} />
    </MemoryRouter>,
  )

describe('SpecRow', () => {
  it('links to the overview', () => {
    renderRow(draft)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/specifications/openquest')
  })

  it('numbers rows from 01 for the contents list', () => {
    renderRow(draft, 0)
    expect(screen.getByText('01')).toBeInTheDocument()
  })

  it('pads the number past nine', () => {
    renderRow(draft, 9)
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('stamps a draft with its version', () => {
    renderRow(draft)
    expect(screen.getByTestId('status-stamp')).toHaveTextContent('Draft')
    expect(screen.getByText('0.1-draft')).toBeInTheDocument()
  })

  it('stamps a planned specification as not in this release, with no version', () => {
    renderRow(planned)
    expect(screen.getByTestId('status-stamp')).toHaveTextContent('Not in this release')
    expect(screen.queryByText('0.1-draft')).not.toBeInTheDocument()
  })

  it('does not offer a hover highlight on a planned row', () => {
    // Nothing behind it to go to.
    const { unmount } = renderRow(planned)
    expect(screen.getByRole('link').className).not.toMatch(/hover:bg-stock/)
    unmount()

    renderRow(draft)
    expect(screen.getByRole('link').className).toMatch(/hover:bg-stock/)
  })
})

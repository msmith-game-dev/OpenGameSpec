import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SpecCard from './SpecCard'
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

const renderCard = (spec: Spec) =>
  render(
    <MemoryRouter>
      <SpecCard spec={spec} />
    </MemoryRouter>,
  )

describe('SpecCard', () => {
  it('links a published specification to its repository', () => {
    renderCard(draft)
    expect(screen.getByRole('link', { name: 'Repository' })).toHaveAttribute('href', draft.repository)
  })

  it('states plainly that a planned specification has no repository', () => {
    renderCard(planned)
    expect(screen.queryByRole('link', { name: 'Repository' })).not.toBeInTheDocument()
    expect(screen.getByText('No repository yet')).toBeInTheDocument()
  })

  it('always links to the overview, planned or not', () => {
    renderCard(planned)
    expect(screen.getByRole('link', { name: /Read the overview/ })).toHaveAttribute(
      'href',
      '/specifications/opendialog',
    )
  })

  it('shows the version for a published specification and none for a planned one', () => {
    const { unmount } = renderCard(draft)
    expect(screen.getByTestId('status-badge')).toHaveTextContent('0.1-draft')
    unmount()

    renderCard(planned)
    expect(screen.getByTestId('status-badge')).toHaveTextContent('Not started')
  })
})

import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import SpecPage from './SpecPage'

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/specifications/:id" element={<SpecPage />} />
      </Routes>
    </MemoryRouter>,
  )

describe('SpecPage', () => {
  it('renders the overview markdown from docs/, not a copy in the component', () => {
    renderAt('/specifications/openquest')
    expect(screen.getByRole('heading', { level: 1, name: 'OpenQuestSpec' })).toBeInTheDocument()
    // Text that exists only in docs/openquest/README.md.
    expect(screen.getByText(/independently of any engine/i)).toBeInTheDocument()
  })

  it('links a published specification to its repository', () => {
    renderAt('/specifications/openquest')
    expect(screen.getByRole('link', { name: 'View the repository' })).toHaveAttribute(
      'href',
      'https://github.com/msmith-game-dev/OpenQuestSpec',
    )
  })

  it('offers no repository link for a planned specification', () => {
    renderAt('/specifications/opendialog')
    expect(screen.queryByRole('link', { name: 'View the repository' })).not.toBeInTheDocument()
    expect(screen.getByTestId('status-badge')).toHaveTextContent('Not started')
  })

  it('falls back to 404 for an unknown specification', () => {
    renderAt('/specifications/openspaceship')
    expect(screen.getByRole('heading', { name: 'Nothing here' })).toBeInTheDocument()
  })
})

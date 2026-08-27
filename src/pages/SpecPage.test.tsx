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

  it('links a scaffolded specification to its repository but claims no version', () => {
    // Scaffolded is the one status where the repository is real and the format is not, so the
    // page must offer the link and still say plainly there is nothing to build against.
    renderAt('/specifications/opendialog')
    expect(screen.getByRole('link', { name: 'View the repository' })).toHaveAttribute(
      'href',
      'https://github.com/msmith-game-dev/OpenDialogSpec',
    )
    expect(screen.getByTestId('status-stamp')).toHaveTextContent('No schema yet')
    expect(screen.getByTestId('status-stamp').textContent).not.toMatch(/draft|coming|soon/i)
  })

  it('falls back to 404 for an unknown specification', () => {
    renderAt('/specifications/openspaceship')
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
  })
})

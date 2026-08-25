import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import AnnotatedDocument from './AnnotatedDocument'

/**
 * FIG 1 is the site's signature and its accessibility floor is the part most likely to rot: the
 * leader lines are decorative, so the callout notes must carry the sequence on their own.
 */
describe('AnnotatedDocument', () => {
  it('renders the quest document', () => {
    const { container } = render(<AnnotatedDocument />)
    // Syntax highlighting splits each line across spans, so assert on the assembled text.
    expect(container.textContent).toContain('"openquest": "0.1-draft"')
    expect(container.textContent).toContain('"requires": ["reach-camp"]')
  })

  it('colours keys and string values differently — three inks, like the rest of the page', () => {
    const { container } = render(<AnnotatedDocument />)
    expect(container.querySelector('.text-blue')?.textContent).toMatch(/^"[^"]+"\s*:$/)
    expect(container.querySelector('.text-red')).toBeTruthy()
  })

  it('captions the figure', () => {
    render(<AnnotatedDocument />)
    expect(screen.getByText(/Fig 1\. A quest document/i)).toBeInTheDocument()
  })

  it('carries the callout notes as a real ordered list, so the sequence survives without the lines', () => {
    render(<AnnotatedDocument />)
    const notes = within(screen.getByRole('list')).getAllByRole('listitem')
    expect(notes).toHaveLength(3)
  })

  it('states the thesis: requires is what a schema cannot check', () => {
    render(<AnnotatedDocument />)
    expect(screen.getByText(/no JSON Schema validator can check/i)).toBeInTheDocument()
  })

  it('hides the leader lines from assistive technology', () => {
    const { container } = render(<AnnotatedDocument />)
    // Every decorative rule is aria-hidden; none carries text.
    for (const el of container.querySelectorAll('[aria-hidden="true"]')) {
      expect(el.textContent).toBe('')
    }
  })
})

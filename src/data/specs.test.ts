import { describe, expect, it } from 'vitest'
import {
  availableSpecs,
  getOverview,
  getOverviewBody,
  getSpec,
  plannedSpecs,
  specs,
  stripLeadingHeading,
} from './specs'

/**
 * These assert the wiring between the registry and the docs folder, which is the seam ADR-0001
 * accepted duplication at. If a registry entry ever names a folder that is not there, the site
 * renders a blank page — so it is checked here as well as in the build-time validator.
 */
describe('registry', () => {
  it('loads every specification from docs/specs.json', () => {
    expect(specs.length).toBeGreaterThan(0)
    expect(specs.map((s) => s.id)).toContain('openquest')
  })

  it('has overview prose for every specification, including planned ones', () => {
    for (const spec of specs) {
      expect(getOverview(spec.id), `no overview loaded for ${spec.id}`).toBeTruthy()
    }
  })

  it('renders the actual docs file rather than a copy', () => {
    // If this ever fails, the site has stopped reading docs/openquest/README.md.
    expect(getOverview('openquest')).toContain('# OpenQuestSpec')
  })

  it('finds a specification by id and returns undefined for an unknown one', () => {
    expect(getSpec('openquest')?.name).toBe('OpenQuestSpec')
    expect(getSpec('nonexistent')).toBeUndefined()
    expect(getSpec(undefined)).toBeUndefined()
  })

  it('splits available from planned without losing any', () => {
    expect(availableSpecs().length + plannedSpecs().length).toBe(specs.length)
  })

  it('gives planned specifications no version and no repository', () => {
    for (const spec of plannedSpecs()) {
      expect(spec.version).toBeNull()
      expect(spec.repository).toBeNull()
    }
  })
})

describe('stripLeadingHeading', () => {
  it('removes a leading h1 so the page has only one', () => {
    expect(stripLeadingHeading('# Title\n\nBody text')).toBe('Body text')
  })

  it('leaves later headings alone', () => {
    expect(stripLeadingHeading('# Title\n\n## Section\n')).toBe('## Section\n')
  })

  it('does nothing when the document does not start with a heading', () => {
    expect(stripLeadingHeading('Body first\n\n# Later')).toBe('Body first\n\n# Later')
  })

  it('does not strip an h2 masquerading as the title', () => {
    expect(stripLeadingHeading('## Not the title\n\nBody')).toBe('## Not the title\n\nBody')
  })

  it('drops the title from every overview, leaving content behind', () => {
    for (const spec of specs) {
      const body = getOverviewBody(spec.id)
      expect(body, `no overview body for ${spec.id}`).toBeTruthy()
      expect(body?.startsWith(`# ${spec.name}`)).toBe(false)
      expect(getOverview(spec.id)?.startsWith(`# ${spec.name}`)).toBe(true)
    }
  })
})

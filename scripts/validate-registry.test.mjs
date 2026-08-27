import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'
import { validateRegistry } from './validate-registry.mjs'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/** Every folder exists, so tests isolate the rule under test rather than the filesystem. */
const allExist = { overviewExists: () => true }

const valid = (over = {}) => ({
  id: 'openquest',
  name: 'OpenQuestSpec',
  summary: 'A format for describing game quests.',
  status: 'draft',
  version: '0.1-draft',
  repository: 'https://github.com/msmith-game-dev/OpenQuestSpec',
  docs: 'docs/openquest',
  ...over,
})

const errorsFor = (spec, deps = allExist) => validateRegistry({ specs: [spec] }, deps)

describe('validateRegistry', () => {
  it('accepts the real registry as committed', () => {
    const registry = JSON.parse(readFileSync(join(repoRoot, 'docs', 'specs.json'), 'utf8'))
    const errors = validateRegistry(registry, {
      overviewExists: (docsPath) =>
        // Resolve against the real repo, so this test fails if a docs folder is deleted.
        existsSyncSafe(join(repoRoot, docsPath, 'README.md')),
    })
    expect(errors).toEqual([])
  })

  it('accepts a well-formed draft entry', () => {
    expect(errorsFor(valid())).toEqual([])
  })

  it('accepts a well-formed planned entry', () => {
    expect(
      errorsFor(valid({ status: 'planned', version: null, repository: null })),
    ).toEqual([])
  })

  it('accepts a well-formed scaffolded entry', () => {
    expect(
      errorsFor(valid({ status: 'scaffolded', version: null })),
    ).toEqual([])
  })

  describe('scaffolded means repository yes, schema no', () => {
    it('rejects a scaffolded spec carrying a version', () => {
      const errors = errorsFor(valid({ status: 'scaffolded', version: '0.1-draft' }))
      expect(errors.join()).toMatch(/scaffolded specification must have "version": null/)
    })

    it('rejects a scaffolded spec with no repository', () => {
      const errors = errorsFor(valid({ status: 'scaffolded', version: null, repository: null }))
      expect(errors.join()).toMatch(/scaffolded means the repository exists/)
    })
  })

  it('rejects a registry with no specs array', () => {
    expect(validateRegistry({}, allExist)).toHaveLength(1)
    expect(validateRegistry(null, allExist)).toHaveLength(1)
  })

  describe('status', () => {
    it('rejects an unknown status', () => {
      const errors = errorsFor(valid({ status: 'coming-soon' }))
      expect(errors.join()).toMatch(/"status" must be one of/)
    })

    it('rejects a missing status', () => {
      expect(errorsFor(valid({ status: undefined })).join()).toMatch(/status/)
    })
  })

  describe('planned entries must not overpromise', () => {
    it('rejects a planned spec carrying a version', () => {
      const errors = errorsFor(valid({ status: 'planned', version: '0.1-draft', repository: null }))
      expect(errors.join()).toMatch(/planned specification must have "version": null/)
    })

    it('rejects a planned spec carrying a repository', () => {
      const errors = errorsFor(
        valid({ status: 'planned', version: null, repository: 'https://example.com' }),
      )
      expect(errors.join()).toMatch(/planned specification must have "repository": null/)
    })
  })

  describe('non-planned entries must be complete', () => {
    it('rejects a draft spec with no version', () => {
      expect(errorsFor(valid({ version: null })).join()).toMatch(/must have a version string/)
    })

    it('rejects a draft spec with no repository', () => {
      expect(errorsFor(valid({ repository: null })).join()).toMatch(/https repository URL/)
    })

    it('rejects a non-https repository', () => {
      expect(errorsFor(valid({ repository: 'git@github.com:x/y.git' })).join()).toMatch(
        /https repository URL/,
      )
    })
  })

  describe('ids and folders', () => {
    it('rejects a non-kebab-case id', () => {
      expect(errorsFor(valid({ id: 'OpenQuest', docs: 'docs/OpenQuest' })).join()).toMatch(
        /kebab-case/,
      )
    })

    it('rejects duplicate ids', () => {
      const errors = validateRegistry({ specs: [valid(), valid()] }, allExist)
      expect(errors.join()).toMatch(/duplicate id "openquest"/)
    })

    it('rejects a docs path that does not match the id', () => {
      expect(errorsFor(valid({ docs: 'docs/quests' })).join()).toMatch(/must be docs\/openquest/)
    })

    it('rejects a docs folder with no README', () => {
      const errors = errorsFor(valid(), { overviewExists: () => false })
      expect(errors.join()).toMatch(/does not exist/)
    })
  })

  it('reports every problem, not just the first', () => {
    const errors = errorsFor(valid({ id: 'Bad_Id', docs: 'docs/wrong', version: null }))
    expect(errors.length).toBeGreaterThan(2)
    expect(errors.join()).toMatch(/kebab-case/)
    expect(errors.join()).toMatch(/must be docs\//)
    expect(errors.join()).toMatch(/version string/)
  })

  it('skips version and repository rules when the status is unknown', () => {
    // Deliberate: which rule applies depends on whether the status is `planned`, so with an
    // unrecognised status there is no correct check to run. The status error is the only honest
    // thing to report — inventing a second one would send the author chasing a phantom.
    const errors = errorsFor(valid({ status: 'nope', version: null, repository: null }))
    expect(errors).toHaveLength(1)
    expect(errors[0]).toMatch(/"status" must be one of/)
  })
})

function existsSyncSafe(p) {
  try {
    readFileSync(p)
    return true
  } catch {
    return false
  }
}

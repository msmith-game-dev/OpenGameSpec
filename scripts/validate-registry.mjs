#!/usr/bin/env node
/**
 * Validates docs/specs.json before the site builds.
 *
 * The registry is the one file in this repository capable of publishing something false: it
 * duplicates `status` and `version` from specifications it does not own (ADR-0001), and it is the
 * site's only data source. A malformed or inconsistent entry does not break a build on its own —
 * it renders confidently and wrongly. This runs first in `npm run build` so it breaks one.
 *
 * The rules live in `validateRegistry`, which is pure and takes its filesystem check as an
 * argument. That is what makes the failure modes testable without writing broken files to disk.
 */

import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

export const STATUSES = ['planned', 'draft', 'stable', 'deprecated']

const ID_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/

/**
 * @param {unknown} registry parsed docs/specs.json
 * @param {{ overviewExists: (docsPath: string) => boolean }} deps
 * @returns {string[]} every problem found, not just the first
 */
export function validateRegistry(registry, { overviewExists }) {
  const errors = []
  const fail = (msg) => errors.push(msg)

  if (!registry || typeof registry !== 'object' || !Array.isArray(registry.specs)) {
    return ['docs/specs.json must have a "specs" array']
  }

  const seen = new Set()

  for (const [i, spec] of registry.specs.entries()) {
    const at = `specs[${i}]${spec?.id ? ` (${spec.id})` : ''}`

    for (const field of ['id', 'name', 'summary', 'status', 'docs']) {
      if (typeof spec?.[field] !== 'string' || spec[field].trim() === '') {
        fail(`${at}: "${field}" must be a non-empty string`)
      }
    }

    if (typeof spec?.id === 'string') {
      if (!ID_PATTERN.test(spec.id)) fail(`${at}: "id" must be kebab-case`)
      if (seen.has(spec.id)) fail(`${at}: duplicate id "${spec.id}"`)
      seen.add(spec.id)
    }

    if (!STATUSES.includes(spec?.status)) {
      fail(
        `${at}: "status" must be one of ${STATUSES.join(', ')} — got ${JSON.stringify(spec?.status)}`,
      )
    }

    // The overview folder must exist, and must be the one named by the id. A registry entry
    // pointing at a folder that is not there renders an empty page rather than an error.
    if (typeof spec?.docs === 'string') {
      if (!overviewExists(spec.docs)) {
        fail(`${at}: "docs" path ${spec.docs}/README.md does not exist`)
      }
      if (typeof spec.id === 'string' && spec.docs !== `docs/${spec.id}`) {
        fail(`${at}: "docs" must be docs/${spec.id} — got ${spec.docs}`)
      }
    }

    // Planned means the work has not started. A planned entry carrying a version or a repository
    // is the overpromise this family cannot afford at one shipped specification.
    if (spec?.status === 'planned') {
      if (spec.version !== null) {
        fail(`${at}: a planned specification must have "version": null — got ${JSON.stringify(spec.version)}`)
      }
      if (spec.repository !== null) {
        fail(`${at}: a planned specification must have "repository": null — got ${JSON.stringify(spec.repository)}`)
      }
    } else if (STATUSES.includes(spec?.status)) {
      if (typeof spec.version !== 'string' || spec.version.trim() === '') {
        fail(`${at}: a ${spec.status} specification must have a version string`)
      }
      if (typeof spec.repository !== 'string' || !spec.repository.startsWith('https://')) {
        fail(`${at}: a ${spec.status} specification must have an https repository URL`)
      }
    }
  }

  return errors
}

function main() {
  const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const registryPath = join(repoRoot, 'docs', 'specs.json')

  if (!existsSync(registryPath)) {
    console.error(`FAIL  docs/specs.json does not exist at ${registryPath}`)
    process.exit(1)
  }

  let registry
  try {
    registry = JSON.parse(readFileSync(registryPath, 'utf8'))
  } catch (err) {
    console.error(`FAIL  docs/specs.json is not valid JSON: ${err.message}`)
    process.exit(1)
  }

  const errors = validateRegistry(registry, {
    overviewExists: (docsPath) => existsSync(join(repoRoot, docsPath, 'README.md')),
  })

  if (errors.length > 0) {
    console.error(`\nFAIL  docs/specs.json — ${errors.length} problem${errors.length === 1 ? '' : 's'}:\n`)
    for (const e of errors) console.error(`  - ${e}`)
    console.error('')
    process.exit(1)
  }

  console.log(`OK    docs/specs.json — ${registry.specs.length} specifications`)
}

// Only run as a CLI, so importing this from a test does not exit the process.
if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  main()
}

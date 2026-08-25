/**
 * The registry, typed.
 *
 * Per ARCHITECTURE.md this is the ONLY module that reaches outside `src/`. Components and pages
 * take what they need as props or via these helpers — nothing else imports `docs/`.
 *
 * `scripts/validate-registry.mjs` guarantees the shape at build time, so nothing here re-validates.
 */

import registry from '../../docs/specs.json'

export type SpecStatus = 'planned' | 'draft' | 'stable' | 'deprecated'

export interface Spec {
  id: string
  name: string
  summary: string
  status: SpecStatus
  /** null when planned — the work has not started. */
  version: string | null
  /** null when planned — no repository exists. */
  repository: string | null
  /** Repo-relative path to the overview folder, e.g. `docs/openquest`. */
  docs: string
}

export const specs: Spec[] = registry.specs as Spec[]

export const specsUpdated: string = registry.updated

/**
 * Overview prose, keyed by spec id.
 *
 * Vite's `?raw` reads each `docs/<id>/README.md` as a string at build time, so the site renders the
 * actual file rather than a copy of it (ADR-0001). The glob is eager and pattern-based: a new
 * specification folder is picked up with no wiring, which is the same property that makes adding a
 * registry entry sufficient to add a page.
 */
const overviews = import.meta.glob('../../docs/*/README.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const overviewById = new Map<string, string>(
  Object.entries(overviews).flatMap(([path, content]) => {
    const id = path.match(/docs\/([^/]+)\/README\.md$/)?.[1]
    return id ? [[id, content] as [string, string]] : []
  }),
)

export function getSpec(id: string | undefined): Spec | undefined {
  return id ? specs.find((s) => s.id === id) : undefined
}

export function getOverview(id: string): string | undefined {
  return overviewById.get(id)
}

/**
 * Removes a leading `# Title` from markdown.
 *
 * Every overview file opens with the specification's name, which is correct for a file read on
 * GitHub and wrong on a page that already renders that name as its `<h1>`. Without this the page
 * ships two level-one headings, which is a genuine accessibility defect rather than a styling
 * quibble. Only the first heading is touched, and only if the document starts with one.
 */
export function stripLeadingHeading(markdown: string): string {
  return markdown.replace(/^\s*#\s+.*\r?\n+/, '')
}

/** Overview prose with its title removed, for rendering beneath a page heading. */
export function getOverviewBody(id: string): string | undefined {
  const raw = overviewById.get(id)
  return raw === undefined ? undefined : stripLeadingHeading(raw)
}

/** Specifications that exist and can be read today, in registry order. */
export function availableSpecs(): Spec[] {
  return specs.filter((s) => s.status !== 'planned')
}

/** Specifications with no repository yet. Rendered as not started, never as coming soon. */
export function plannedSpecs(): Spec[] {
  return specs.filter((s) => s.status === 'planned')
}

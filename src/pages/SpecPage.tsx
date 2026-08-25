import { Link, useParams } from 'react-router-dom'
import { getOverviewBody, getSpec } from '../data/specs'
import Markdown from '../components/Markdown'
import StatusStamp from '../components/StatusStamp'
import NotFound from './NotFound'

/**
 * One specification's page. The body is `docs/<id>/README.md` rendered as-is — the site shows the
 * actual file rather than a copy of it, so there is one place to edit and nothing to keep in sync
 * (ADR-0001).
 */
export default function SpecPage() {
  const { id } = useParams()
  const spec = getSpec(id)

  if (!spec) return <NotFound />

  // The file's own `# Name` heading is dropped — this page already renders it as the h1.
  const overview = getOverviewBody(spec.id)

  return (
    <div className="mx-auto max-w-[1120px] px-6 py-12">
      <Link
        to="/specifications"
        className="eyebrow text-ink-mid transition-colors duration-100 hover:text-red"
      >
        ← All specifications
      </Link>

      <div className="mt-6 border-b-2 border-ink pb-8">
        <h1 className="font-display text-4xl uppercase tracking-tight sm:text-5xl">{spec.name}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-mid">{spec.summary}</p>

        {/* Data rows — the manual idiom for stating machine facts. */}
        <dl className="mt-8 max-w-md">
          <div className="flex items-center justify-between gap-4 border-t border-ink-light/40 py-2.5">
            <dt className="eyebrow text-ink-light">Status</dt>
            <dd>
              <StatusStamp status={spec.status} version={spec.version} />
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-ink-light/40 py-2.5">
            <dt className="eyebrow text-ink-light">Repository</dt>
            <dd className="font-mono text-sm">
              {spec.repository ? (
                <a
                  href={spec.repository}
                  target="_blank"
                  rel="noreferrer"
                  className="text-red underline decoration-2 underline-offset-2"
                >
                  View the repository
                </a>
              ) : (
                <span className="text-ink-light">None yet</span>
              )}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4 border-y border-ink-light/40 py-2.5">
            <dt className="eyebrow text-ink-light">Licence</dt>
            <dd className="font-mono text-sm text-ink-mid">Apache-2.0</dd>
          </div>
        </dl>
      </div>

      <div className="mt-10 max-w-[680px]">
        {overview ? (
          <Markdown>{overview}</Markdown>
        ) : (
          /* The registry validator makes this unreachable in a passing build. It exists because a
             blank page is a worse failure than an explicit one if that ever stops being true. */
          <p className="text-ink-mid">
            No overview found at <code className="font-mono">{spec.docs}/README.md</code>.
          </p>
        )}

        <p className="caption mt-12 border-t-2 border-ink pt-3 text-ink-light">
          <a
            href={`https://github.com/msmith-game-dev/OpenGameSpec/blob/main/${spec.docs}/README.md`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-red"
          >
            Edit this page
          </a>
        </p>
      </div>
    </div>
  )
}

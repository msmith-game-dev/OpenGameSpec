import { Link, useParams } from 'react-router-dom'
import { getOverviewBody, getSpec } from '../data/specs'
import Markdown from '../components/Markdown'
import StatusBadge from '../components/StatusBadge'
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
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link
        to="/specifications"
        className="text-sm text-slate-400 transition hover:text-white"
      >
        ← All specifications
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-white">{spec.name}</h1>
        <StatusBadge status={spec.status} version={spec.version} />
      </div>

      <p className="mt-4 text-lg leading-relaxed text-slate-400">{spec.summary}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        {spec.repository ? (
          <a
            href={spec.repository}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-flame-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-flame-400"
          >
            View the repository
          </a>
        ) : null}
        <a
          href={`https://github.com/msmith-game-dev/OpenGameSpec/blob/main/${spec.docs}/README.md`}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-flame-500/60 hover:text-white"
        >
          Edit this page
        </a>
      </div>

      <hr className="my-10 border-slate-800" />

      {overview ? (
        <Markdown>{overview}</Markdown>
      ) : (
        /* The registry validator makes this unreachable in a passing build. It exists because a
           blank page is a worse failure than an explicit one if that ever stops being true. */
        <p className="text-slate-400">
          No overview found at <code className="text-flame-300">{spec.docs}/README.md</code>.
        </p>
      )}
    </div>
  )
}

import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[680px] px-6 py-28">
      <p className="eyebrow text-red">Error 404</p>
      <h1 className="mt-4 font-display text-4xl uppercase tracking-tight">Page not found</h1>
      <p className="mt-4 leading-relaxed text-ink-mid">
        That page does not exist. It may never have, or a specification may have moved.
      </p>
      <Link
        to="/specifications"
        className="mt-8 inline-block border-[3px] border-ink bg-red px-5 py-2.5 font-semibold text-paper transition-colors duration-100 hover:bg-ink"
      >
        Read the specifications
      </Link>
    </div>
  )
}

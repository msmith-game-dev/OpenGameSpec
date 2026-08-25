import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-32 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-flame-400">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">Nothing here</h1>
      <p className="mt-4 text-slate-400">
        That page does not exist. It may never have, or a specification may have moved.
      </p>
      <Link
        to="/specifications"
        className="mt-8 inline-block rounded-lg bg-flame-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-flame-400"
      >
        Browse specifications
      </Link>
    </div>
  )
}

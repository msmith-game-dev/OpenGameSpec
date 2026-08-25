import { Link, NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm transition ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`

export default function NavBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-white">
          <span className="h-2.5 w-2.5 rounded-full bg-flame-500" aria-hidden="true" />
          OpenGameSpec
        </Link>

        <div className="flex items-center gap-6">
          <NavLink to="/specifications" className={linkClass}>
            Specifications
          </NavLink>
          <a
            href="https://github.com/msmith-game-dev/OpenGameSpec"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  )
}

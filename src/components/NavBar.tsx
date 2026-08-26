import { Link, NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `eyebrow transition-colors duration-100 ${isActive ? 'text-red' : 'text-ink hover:text-red'}`

export default function NavBar() {
  return (
    <header className="sticky top-0 z-20 border-b-2 border-ink bg-paper">
      <nav className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-6 w-6 shrink-0 items-center justify-center bg-red font-display text-[13px] leading-none text-paper"
          >
            G
          </span>
          {/* The mark carries the brand below 400px; the wordmark would collide with the links. */}
          <span className="hidden font-display text-base uppercase tracking-tight min-[400px]:inline">
            OpenGameSpec
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-4 sm:gap-6">
          <NavLink to="/specifications" className={linkClass}>
            Specifications
          </NavLink>
          <a
            href="https://github.com/msmith-game-dev/OpenGameSpec"
            target="_blank"
            rel="noreferrer"
            className="eyebrow text-ink transition-colors duration-100 hover:text-red"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  )
}

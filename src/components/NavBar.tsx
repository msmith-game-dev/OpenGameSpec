import { Link, NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `eyebrow transition-colors duration-100 ${isActive ? 'text-red' : 'text-ink hover:text-red'}`

export default function NavBar() {
  return (
    <header className="sticky top-0 z-20 border-b-2 border-ink bg-paper">
      <nav className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-6 w-6 items-center justify-center bg-red font-display text-[13px] leading-none text-paper"
          >
            G
          </span>
          <span className="font-display text-base uppercase tracking-tight">OpenGameSpec</span>
        </Link>

        <div className="flex items-center gap-6">
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

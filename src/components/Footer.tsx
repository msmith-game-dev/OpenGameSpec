import { Link } from 'react-router-dom'

const REPO = 'https://github.com/msmith-game-dev/OpenGameSpec'

const linkClass = 'text-ink-mid hover:text-red hover:underline decoration-2 underline-offset-2'

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-paper">
      <div className="mx-auto max-w-[1120px] px-6 py-12">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 items-center justify-center bg-red font-display text-[13px] leading-none text-paper"
              >
                G
              </span>
              <span className="font-display text-base uppercase tracking-tight">OpenGameSpec</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-mid">
              Open specifications for game content. Each specification is versioned independently and
              lives in its own repository.
            </p>
          </div>

          <div className="flex gap-12 text-sm">
            <div>
              <h4 className="eyebrow text-ink">Project</h4>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link to="/specifications" className={linkClass}>
                    Specifications
                  </Link>
                </li>
                <li>
                  <a href={REPO} target="_blank" rel="noreferrer" className={linkClass}>
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={`${REPO}/blob/main/CONTRIBUTING.md`}
                    target="_blank"
                    rel="noreferrer"
                    className={linkClass}
                  >
                    Contributing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="eyebrow text-ink">Reference</h4>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href={`${REPO}/tree/main/docs/adr`}
                    target="_blank"
                    rel="noreferrer"
                    className={linkClass}
                  >
                    Decision records
                  </a>
                </li>
                <li>
                  <a
                    href={`${REPO}/blob/main/docs/initiative-backlog.md`}
                    target="_blank"
                    rel="noreferrer"
                    className={linkClass}
                  >
                    Roadmap
                  </a>
                </li>
                <li>
                  <a
                    href={`${REPO}/blob/main/LICENSE`}
                    target="_blank"
                    rel="noreferrer"
                    className={linkClass}
                  >
                    Apache 2.0
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t-2 border-ink pt-5 text-xs leading-relaxed text-ink-light">
          Copyright 2026 Arctic Flame Games Ltd. Licensed under Apache 2.0 — you may implement these
          specifications, build tooling for them, and ship products using them, without asking.
        </p>
      </div>
    </footer>
  )
}

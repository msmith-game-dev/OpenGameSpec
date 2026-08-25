import { Link } from 'react-router-dom'

const REPO = 'https://github.com/msmith-game-dev/OpenGameSpec'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col justify-between gap-8 sm:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 font-semibold text-white">
              <span className="h-2.5 w-2.5 rounded-full bg-flame-500" aria-hidden="true" />
              OpenGameSpec
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Open specifications for game content. Each specification is versioned independently and
              lives in its own repository.
            </p>
          </div>

          <div className="flex gap-12 text-sm">
            <div>
              <h4 className="font-semibold text-white">Project</h4>
              <ul className="mt-3 space-y-2 text-slate-400">
                <li>
                  <Link to="/specifications" className="hover:text-white">
                    Specifications
                  </Link>
                </li>
                <li>
                  <a href={REPO} target="_blank" rel="noreferrer" className="hover:text-white">
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={`${REPO}/blob/main/CONTRIBUTING.md`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white"
                  >
                    Contributing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white">Reference</h4>
              <ul className="mt-3 space-y-2 text-slate-400">
                <li>
                  <a
                    href={`${REPO}/tree/main/docs/adr`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white"
                  >
                    Decision records
                  </a>
                </li>
                <li>
                  <a
                    href={`${REPO}/blob/main/docs/initiative-backlog.md`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white"
                  >
                    Roadmap
                  </a>
                </li>
                <li>
                  <a
                    href={`${REPO}/blob/main/LICENSE`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white"
                  >
                    Apache 2.0
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-slate-900 pt-6 text-xs text-slate-600">
          Copyright 2026 Arctic Flame Games Ltd. Licensed under Apache 2.0 — you may implement these
          specifications, build tooling for them, and ship products using them, without asking.
        </p>
      </div>
    </footer>
  )
}

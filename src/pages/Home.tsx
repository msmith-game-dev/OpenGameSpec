import { Link } from 'react-router-dom'
import { availableSpecs, plannedSpecs, specs } from '../data/specs'
import SpecCard from '../components/SpecCard'

/**
 * The landing page. Composition only — the derivation lives in `data/specs.ts`.
 *
 * Structure follows openapis.org: a hero with one call to action per specification, a plain
 * statement of what this is, the argument for why it matters, then the index.
 */
export default function Home() {
  const available = availableSpecs()
  const planned = plannedSpecs()

  return (
    <>
      {/* Hero */}
      <section className="border-b border-slate-800/80 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-flame-400">
            Open Game Specifications
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Game content formats that outlive the engine they were written for
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            Quests, dialogue, items — described once, in versioned JSON with a normative schema, and
            implementable by anyone. The model is OpenAPI, for game content.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/specifications"
              className="rounded-lg bg-flame-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-flame-400"
            >
              All specifications
            </Link>
            {available.map((spec) => (
              <Link
                key={spec.id}
                to={`/specifications/${spec.id}`}
                className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-flame-500/60 hover:text-white"
              >
                View {spec.name}
              </Link>
            ))}
            <a
              href="https://github.com/msmith-game-dev/OpenGameSpec"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-flame-500/60 hover:text-white"
            >
              How to get involved
            </a>
          </div>

          {/* Honest about scale. One draft specification is not a family yet, and pretending
              otherwise is the fastest way to lose a reader who checks. */}
          <p className="mt-8 text-sm text-slate-500">
            {available.length} specification{available.length === 1 ? '' : 's'} published
            {planned.length > 0 ? `, ${planned.length} planned and not yet started` : null}.
          </p>
        </div>
      </section>

      {/* What is it */}
      <section className="border-b border-slate-800/80">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold tracking-tight text-white">What is OpenGameSpec?</h2>
          <div className="mt-6 grid gap-10 lg:grid-cols-2">
            <div className="space-y-4 text-slate-400">
              <p className="leading-relaxed">
                Game studios rebuild the same content formats on every project. Each one gets a
                bespoke schema, a bespoke editor, and a bespoke importer — and none of it survives
                the engine it was written for.
              </p>
              <p className="leading-relaxed">
                OpenGameSpec makes that content a <strong className="text-white">document</strong>:
                readable by a designer, diffable in review, valid or invalid without running the
                game, and portable to whatever the studio ships on next.
              </p>
            </div>
            <div className="space-y-4 text-slate-400">
              <p className="leading-relaxed">
                Every specification is JSON with a{' '}
                <strong className="text-white">normative JSON Schema</strong>. The schema is the
                authority and the prose describes it, so anyone can validate a document in any
                language without installing our tooling.
              </p>
              <p className="leading-relaxed">
                Each specification is versioned independently and lives in its own repository. This
                site describes them; it never defines them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="border-b border-slate-800/80 bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold tracking-tight text-white">Why a shared format</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Tooling that outlasts a project',
                body: 'An editor, validator, or importer written against a published format keeps working on the next game, and the one after. Bespoke schemas throw that away every time.',
              },
              {
                title: 'Engine changes stop being rewrites',
                body: 'Content described independently of the engine moves with the studio. What changes is the generator, not the thousands of documents behind it.',
              },
              {
                title: 'Errors before the game runs',
                body: 'A document is valid or invalid without launching anything. A quest whose objective can never be completed is caught in review rather than in playtest.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The specifications */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-3xl font-bold tracking-tight text-white">The specifications</h2>
            <Link
              to="/specifications"
              className="shrink-0 text-sm font-medium text-flame-400 hover:text-flame-300"
            >
              View all →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {specs.map((spec) => (
              <SpecCard key={spec.id} spec={spec} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

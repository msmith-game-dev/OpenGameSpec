import { Link } from 'react-router-dom'
import { availableSpecs, plannedSpecs, specs } from '../data/specs'
import AnnotatedDocument from '../components/AnnotatedDocument'
import SpecRow from '../components/SpecRow'
import WarningPanel from '../components/WarningPanel'

/**
 * The landing page. Composition only — derivation lives in `data/specs.ts`.
 *
 * The hero is FIG 1 rather than a headline over an illustration: the manual's most recognisable
 * page, teaching the format instead of claiming a value proposition (DESIGN.md).
 */
export default function Home() {
  const available = availableSpecs()
  const planned = plannedSpecs()

  return (
    <>
      {/* Cover */}
      <section className="border-b-2 border-ink">
        {/* min-w-0 on both columns: grid children default to min-width:auto, so the code block's
            min-w-max would otherwise widen the whole page and force a horizontal scroll. */}
        <div className="mx-auto grid max-w-[1120px] gap-14 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="min-w-0">
            <p className="eyebrow text-red">Open Game Specifications</p>
            <h1 className="cover mt-5 max-w-xl text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem]">
              The manual for your game content
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-mid">
              Quests, dialogue, items — described once, in versioned JSON with a normative schema,
              and readable by anyone. Valid or invalid without running the game.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/specifications"
                className="border-[3px] border-ink bg-red px-5 py-2.5 font-semibold text-paper transition-colors duration-100 hover:bg-ink"
              >
                Read the specifications
              </Link>
              <a
                href="https://github.com/msmith-game-dev/OpenGameSpec"
                target="_blank"
                rel="noreferrer"
                className="border-[3px] border-ink bg-paper px-5 py-2.5 font-semibold text-ink transition-colors duration-100 hover:bg-stock"
              >
                How to get involved
              </a>
            </div>

            <p className="mt-8 font-mono text-sm text-ink-light">
              {available.length} published
              {planned.length > 0 ? ` · ${planned.length} not started` : null}
            </p>
          </div>

          <div className="min-w-0">
            <AnnotatedDocument />
          </div>
        </div>
      </section>

      {/* Warning — the device exists for this. */}
      <section className="border-b-2 border-ink bg-stock">
        <div className="mx-auto max-w-[1120px] px-6 py-10">
          <WarningPanel>
            <strong className="font-semibold">0.1-draft — nothing here is stable.</strong> No
            compatibility is promised between draft versions. Fields may be renamed, removed, or
            change meaning with no migration path. A document that validates today may not validate
            tomorrow. Semantic versioning begins at 1.0.
          </WarningPanel>
        </div>
      </section>

      {/* What it is */}
      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-[1120px] px-6 py-16">
          <p className="eyebrow text-ink-light">Section 01</p>
          <h2 className="mt-3 font-display text-3xl uppercase">What this is</h2>

          <div className="mt-8 grid max-w-4xl gap-10 md:grid-cols-2">
            <div className="space-y-4 text-ink-mid">
              <p className="leading-relaxed">
                Studios rebuild the same content formats on every project. Each one gets a bespoke
                schema, a bespoke editor, and a bespoke importer — and none of it survives the engine
                it was written for.
              </p>
              <p className="leading-relaxed">
                OpenGameSpec makes that content a{' '}
                <strong className="font-semibold text-ink">document</strong>: readable by a designer,
                diffable in review, and portable to whatever the studio ships on next.
              </p>
            </div>
            <div className="space-y-4 text-ink-mid">
              <p className="leading-relaxed">
                Every specification is JSON with a{' '}
                <strong className="font-semibold text-ink">normative JSON Schema</strong>. The schema
                is the authority and the prose describes it, so anyone can validate a document in any
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

      {/* Why */}
      <section className="border-b-2 border-ink bg-stock">
        <div className="mx-auto max-w-[1120px] px-6 py-16">
          <p className="eyebrow text-ink-light">Section 02</p>
          <h2 className="mt-3 font-display text-3xl uppercase">Why a shared format</h2>

          <div className="mt-10 grid gap-px border-[3px] border-ink bg-ink md:grid-cols-3">
            {[
              {
                title: 'Tooling outlasts the project',
                body: 'An editor, validator, or importer written against a published format keeps working on the next game. Bespoke schemas throw that away every time.',
              },
              {
                title: 'Engine changes stop being rewrites',
                body: 'Content described independently of the engine moves with the studio. What changes is the generator, not the thousands of documents behind it.',
              },
              {
                title: 'Errors before the game runs',
                body: 'A document is valid or invalid without launching anything. A quest whose objective can never be completed is caught in review, not in playtest.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-paper p-6">
                <h3 className="font-sans text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-mid">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contents */}
      <section>
        <div className="mx-auto max-w-[1120px] px-6 py-16">
          <p className="eyebrow text-ink-light">Section 03</p>
          <h2 className="mt-3 font-display text-3xl uppercase">Contents</h2>

          <div className="mt-8 border-t-2 border-ink">
            {specs.map((spec, i) => (
              <SpecRow key={spec.id} spec={spec} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

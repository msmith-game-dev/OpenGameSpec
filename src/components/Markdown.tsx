import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

/**
 * Renders a docs/ markdown file. Styling lives in `.md` in input.css, since generated markup has
 * no JSX to hang utility classes on.
 *
 * GFM is on for tables — the overview pages and the registry documentation both use them heavily.
 * External links open in a new tab; relative links are left alone deliberately, because a relative
 * link inside a docs file points at another repository file, not a site route.
 */
export default function Markdown({ children }: { children: string }) {
  return (
    <div className="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Overview tables carry repository URLs and long version strings. Without a scroll
          // container they widen the whole page at 360px — caught by e2e/layout.spec.ts.
          table: ({ node: _node, ...props }) => (
            <div className="overflow-x-auto">
              <table {...props} />
            </div>
          ),
          a: ({ href, children: linkChildren, ...props }) => {
            const external = href?.startsWith('http')
            return (
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                {...props}
              >
                {linkChildren}
              </a>
            )
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  tags?: string[];
  impact?: string[];
  links?: { label: string; href: string }[];
  onOpen?: () => void;
}

export default function ProjectCard({
  title,
  description,
  tech,
  tags = [],
  impact = [],
  links = [],
  onOpen,
}: ProjectCardProps) {
  return (
    <div
      className="
        p-6
        bg-[var(--color-card-primary)]
        text-[var(--color-text-dark)]
        border border-[var(--color-card-secondary)]
        rounded-2xl
        shadow-md
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        h-full
        min-h-[340px]
        flex
        flex-col
        justify-between
      "
    >
      <div>
        <h3 className="text-2xl font-extrabold mb-2 leading-snug">
          {title}
          <span className="block w-12 h-[3px] bg-[var(--color-card-accent)] mt-2 rounded-full" />
        </h3>

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-[color:rgba(31,42,68,0.10)] border border-[color:rgba(31,42,68,0.18)]"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <p className="mt-4 text-sm leading-relaxed">{description}</p>

        {impact.length > 0 && (
          <ul className="mt-4 space-y-1 text-sm list-disc list-inside">
            {impact.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        )}

        <p className="mt-4 text-xs opacity-80">
          <span className="font-semibold">Tech:</span> {tech.join(', ')}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 font-semibold
              text-[var(--color-card-accent)]
              hover:text-[var(--color-card-secondary)]
              transition-colors
            "
          >
            {l.label} →
          </a>
        ))}

        {onOpen && (
          <button
            onClick={onOpen}
            className="
              ml-auto
              px-4 py-2 rounded-xl font-semibold
              border border-[color:rgba(31,42,68,0.22)]
              hover:border-[var(--color-card-secondary)]
              transition
            "
          >
            Open Case Study →
          </button>
        )}
      </div>
    </div>
  );
}

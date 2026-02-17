export default function Footer() {
  return (
    <footer className="py-10 text-center border-t border-[var(--color-border)] bg-[var(--color-surface-3)] mt-14">
      <div className="text-sm text-[var(--color-text-2)]">
        © {new Date().getFullYear()} Shivam Joshi. Built using Next.js & Tailwind CSS.
      </div>

      <div className="mt-2 text-xs text-[var(--color-text-3)]">
        Designed &amp; Developed by{' '}
        <a
          href="https://www.linkedin.com/in/shivamjoshi89/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-accent-1)] hover:text-[var(--color-accent-2)] underline underline-offset-4 transition-colors"
        >
          Shivam Joshi
        </a>
      </div>
    </footer>
  );
}

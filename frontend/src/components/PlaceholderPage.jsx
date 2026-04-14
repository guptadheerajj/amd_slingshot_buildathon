// Simple placeholder page for routes not yet implemented
export default function PlaceholderPage({ title, icon }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
      <span
        className="material-symbols-outlined text-6xl"
        style={{ color: 'var(--color-outline-variant)' }}
      >
        {icon}
      </span>
      <h2
        className="text-2xl font-extrabold font-headline"
        style={{ color: 'var(--color-on-surface-variant)' }}
      >
        {title}
      </h2>
      <p className="text-sm" style={{ color: 'var(--color-outline)' }}>
        Coming soon — this section is under construction.
      </p>
    </div>
  )
}

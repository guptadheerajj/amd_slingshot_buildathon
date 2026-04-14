import { useLocation } from 'react-router-dom'

const titleMap = {
  '/dashboard': 'Dashboard',
  '/insights':  'Meal Insights',
  '/history':   'History',
  '/recipes':   'Recipes',
  '/profile':   'Profile',
}

export default function TopBar() {
  const { pathname } = useLocation()
  const title = titleMap[pathname] ?? 'NutriLens'

  return (
    <header
      className="glass sticky top-0 z-40 shadow-sm"
      style={{ borderBottom: 'none' }}
    >
      <div className="flex justify-between items-center w-full px-6 py-3 max-w-[1440px] mx-auto">
        <h1
          className="text-2xl font-extrabold tracking-tight font-headline"
          style={{ color: 'var(--color-primary)' }}
        >
          {title}
        </h1>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden lg:block">
            <span
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg"
              style={{ color: 'var(--color-outline)' }}
            >
              search
            </span>
            <input
              type="text"
              placeholder="Search data..."
              className="rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 w-56"
              style={{
                backgroundColor: 'var(--color-surface-container-highest)',
                border: 'none',
                color: 'var(--color-on-surface)',
                '--tw-ring-color': 'var(--color-primary)',
              }}
            />
          </div>

          {/* Icon buttons */}
          {['notifications', 'settings'].map((icon) => (
            <button
              key={icon}
              className="p-2 rounded-full transition-colors hover:opacity-70"
              style={{ backgroundColor: 'transparent' }}
            >
              <span className="material-symbols-outlined" style={{ color: 'var(--color-on-surface-variant)' }}>
                {icon}
              </span>
            </button>
          ))}

          {/* Avatar */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
            style={{
              backgroundColor: 'var(--color-primary-container)',
              color: 'var(--color-on-primary-container)',
            }}
          >
            D
          </div>
        </div>
      </div>
    </header>
  )
}

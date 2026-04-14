import { NavLink, useNavigate } from 'react-router-dom'
import clsx from 'clsx'

const navItems = [
  { icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { icon: 'history',   label: 'History',   path: '/history'   },
  { icon: 'restaurant_menu', label: 'Recipes', path: '/recipes' },
  { icon: 'person',    label: 'Profile',   path: '/profile'   },
]

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside
      className="h-screen w-64 fixed left-0 top-0 overflow-y-auto flex-col p-6 gap-2 z-50 hidden md:flex"
      style={{ backgroundColor: 'var(--color-surface-container-low)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <span
          className="material-symbols-outlined material-symbols-filled text-2xl"
          style={{ color: 'var(--color-primary)' }}
        >
          lens
        </span>
        <span
          className="text-xl font-extrabold tracking-tight font-headline"
          style={{ color: 'var(--color-primary)' }}
        >
          NutriLens
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-grow">
        {navItems.map(({ icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm',
                isActive
                  ? 'font-bold translate-x-1'
                  : 'hover:translate-x-1'
              )
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? 'rgba(161,58,0,0.08)' : 'transparent',
              color: isActive
                ? 'var(--color-primary)'
                : 'var(--color-on-surface-variant)',
            })}
          >
            <span className="material-symbols-outlined text-xl">{icon}</span>
            <span className="font-headline">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Pro upgrade card */}
      <div className="mt-auto">
        <div
          className="p-5 rounded-2xl shadow-lg"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <p
            className="text-xs font-bold uppercase tracking-wider mb-1"
            style={{ color: 'var(--color-on-primary)', opacity: 0.75 }}
          >
            Pro Concierge
          </p>
          <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--color-on-primary)' }}>
            Upgrade to unlock clinical macro-precision.
          </p>
          <button
            className="w-full py-2 rounded-full text-xs font-bold transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-surface-container-lowest)',
              color: 'var(--color-primary)',
            }}
          >
            Upgrade Now
          </button>
        </div>

        {/* Scan CTA */}
        <button
          onClick={() => navigate('/scanner')}
          className="mt-4 w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 btn-gradient transition-all active:scale-95 shadow-ambient"
          style={{ color: 'var(--color-on-primary)' }}
        >
          <span className="material-symbols-outlined material-symbols-filled">photo_camera</span>
          Scan Meal
        </button>
      </div>
    </aside>
  )
}

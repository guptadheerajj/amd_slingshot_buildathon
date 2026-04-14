import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Simple confetti pieces
const CONFETTI_COLORS = ['#fd7b40', '#fecb00', '#96f4dc', '#a13a00', '#006857']
const PIECES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 1.5}s`,
  size: Math.random() * 8 + 6,
  rotate: Math.random() * 360,
}))

export default function LogConfirmation() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [stats, setStats] = useState({ calories: 0, streak: 1 })

  useEffect(() => {
    const raw = sessionStorage.getItem('lastSuccessLog')
    if (raw) {
      const data = JSON.parse(raw)
      setStats({
        calories: Math.round(data.calories),
        streak: data.streak
      })
    }

    // slight delay so entrance is visible
    const t1 = setTimeout(() => setShow(true), 100)
    const t2 = setTimeout(() => navigate('/dashboard'), 5000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [navigate])

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      {/* ... (Confetti remains the same) */}

      {/* Card */}
      <div
        className="relative z-10 text-center px-12 py-16 rounded-3xl shadow-ambient transition-all duration-700"
        style={{
          backgroundColor: 'var(--color-surface-container-lowest)',
          opacity: show ? 1 : 0,
          transform: show ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
          maxWidth: 480,
          width: '90%',
        }}
      >
        {/* Animated checkmark */}
        {/* ... (SVG remains the same) ... */}

        <p
          className="font-bold uppercase tracking-widest text-xs mb-3"
          style={{ color: 'var(--color-secondary)' }}
        >
          Meal Logged
        </p>

        <h1
          className="text-3xl font-extrabold font-headline mb-3"
          style={{ color: 'var(--color-on-surface)' }}
        >
          Great choice today! 🎉
        </h1>

        <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--color-on-surface-variant)' }}>
          Your meal has been logged and your daily summary is updated. { stats.calories > 500 ? "Powering through!" : "Nicely balanced." }
        </p>

        {/* Stats row */}
        <div className="flex justify-center gap-6 mb-8">
          {[
            { label: 'Calories', val: `${stats.calories} kcal`, color: 'var(--color-primary)' },
            { label: 'Streak',   val: `🔥 ${stats.streak} days`, color: 'var(--color-tertiary)' },
          ].map(({ label, val, color }) => (
            <div key={label} className="text-center">
              <p className="font-extrabold font-headline text-xl" style={{ color }}>{val}</p>
              <p className="text-xs" style={{ color: 'var(--color-outline)' }}>{label}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="w-full py-4 rounded-2xl font-bold transition-all active:scale-95 btn-gradient"
          style={{ color: 'var(--color-on-primary)' }}
        >
          Back to Dashboard
        </button>

        <p className="text-xs mt-4" style={{ color: 'var(--color-on-surface-variant)', opacity: 0.5 }}>
          Redirecting automatically in a moment…
        </p>
      </div>
    </div>
  )
}

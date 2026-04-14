import { useNavigate } from 'react-router-dom'

// ── Macro Ring ──────────────────────────────────────────────────────────────
function MacroRing({ pct, color, label, value }) {
  const r = 40
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct / 100)
  return (
    <div
      className="rounded-2xl p-6 text-center group transition-colors cursor-default"
      style={{ backgroundColor: 'var(--color-surface-container-low)' }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-container)'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-container-low)'}
    >
      <div className="relative w-24 h-24 mx-auto mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r={r} fill="transparent" stroke="var(--color-outline-variant)" strokeWidth="8" strokeOpacity="0.3" />
          <circle
            cx="48" cy="48" r={r} fill="transparent"
            stroke={color} strokeWidth="8"
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold text-lg font-headline" style={{ color }}>{pct}%</span>
        </div>
      </div>
      <p className="font-bold text-sm mb-0.5" style={{ color: 'var(--color-on-surface)' }}>{label}</p>
      <p className="text-xs" style={{ color: 'var(--color-outline)' }}>{value}</p>
    </div>
  )
}

// ── Meal Log Row ─────────────────────────────────────────────────────────────
function MealLogRow({ emoji, name, time, meal, tag, tagStyle, kcal, protein, carbs }) {
  return (
    <div
      className="rounded-2xl p-4 flex items-center gap-4 shadow-ambient group transition-shadow hover:shadow-md"
      style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
    >
      <div
        className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center text-3xl"
        style={{ backgroundColor: 'var(--color-surface-container-low)' }}
      >
        {emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1 gap-2">
          <div>
            <h4 className="font-bold font-headline text-base truncate" style={{ color: 'var(--color-on-surface)' }}>{name}</h4>
            <p className="text-xs" style={{ color: 'var(--color-outline)' }}>{meal} · {time}</p>
          </div>
          <span
            className="text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex-shrink-0"
            style={tagStyle}
          >
            {tag}
          </span>
        </div>
        <div className="flex gap-4 mt-1">
          {[
            { dot: 'var(--color-primary)', val: `${kcal} kcal` },
            { dot: 'var(--color-secondary)', val: `${protein}g P` },
            { dot: 'var(--color-tertiary)', val: `${carbs}g C` },
          ].map(({ dot, val }) => (
            <div key={val} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: dot }} />
              <span className="text-xs font-semibold" style={{ color: 'var(--color-on-surface-variant)' }}>{val}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="p-2 transition-colors hover:opacity-60" style={{ color: 'var(--color-outline)' }}>
        <span className="material-symbols-outlined text-lg">more_vert</span>
      </button>
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate()

  const macros = [
    { label: 'Calories', value: '1,850 / 2,200 kcal', pct: 85, color: 'var(--color-primary)' },
    { label: 'Protein',  value: '90g / 150g',          pct: 60, color: 'var(--color-secondary)' },
    { label: 'Carbs',    value: '120g / 300g',          pct: 40, color: 'var(--color-tertiary)' },
    { label: 'Fats',     value: '35g / 70g',            pct: 50, color: 'var(--color-on-surface-variant)' },
  ]

  const logs = [
    {
      emoji: '🥑', name: 'Avocado Toast & Egg', time: '8:30 AM', meal: 'Breakfast',
      tag: 'High Protein',
      tagStyle: { backgroundColor: 'var(--color-secondary-container)', color: 'var(--color-on-secondary-container)' },
      kcal: 420, protein: 18, carbs: 32,
    },
    {
      emoji: '🥗', name: 'Quinoa Chicken Salad', time: '1:15 PM', meal: 'Lunch',
      tag: 'Balanced',
      tagStyle: { backgroundColor: 'var(--color-surface-container)', color: 'var(--color-on-surface-variant)' },
      kcal: 580, protein: 34, carbs: 45,
    },
    {
      emoji: '🍎', name: 'Apple & Almonds', time: '3:30 PM', meal: 'Snack',
      tag: 'Sugar Alert',
      tagStyle: { backgroundColor: 'rgba(251,81,81,0.12)', color: 'var(--color-error)' },
      kcal: 210, protein: 5, carbs: 28,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-12">

      {/* ── Hero Bento ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Habit Insight Nudge */}
        <section
          className="lg:col-span-8 rounded-2xl p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden"
          style={{ backgroundColor: 'var(--color-tertiary-container)' }}
        >
          {/* Background icon decoration */}
          <div className="absolute -right-6 -bottom-6 opacity-10 scale-150 pointer-events-none">
            <span className="material-symbols-outlined text-[120px]" style={{ color: 'var(--color-on-tertiary-container)' }}>lightbulb</span>
          </div>

          <div className="flex-1 z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-lg" style={{ color: 'var(--color-on-tertiary-container)' }}>tips_and_updates</span>
              <span className="font-bold uppercase tracking-widest text-xs" style={{ color: 'var(--color-on-tertiary-container)' }}>Habit Insight Nudge</span>
            </div>
            <h2 className="text-2xl font-extrabold font-headline leading-tight mb-3" style={{ color: 'var(--color-on-tertiary-container)' }}>
              You've had high-sugar snacks 3 times this week around 3 PM.
            </h2>
            <p className="text-lg mb-6 leading-relaxed" style={{ color: 'rgba(88,69,0,0.8)' }}>
              Tomorrow, try swapping the candy for an apple to avoid the 4 PM crash.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                className="font-bold px-6 py-3 rounded-full text-sm shadow-lg transition-all active:scale-95"
                style={{ backgroundColor: 'var(--color-on-tertiary-container)', color: 'var(--color-surface-container-lowest)' }}
              >
                Set Reminder
              </button>
              <button
                className="font-semibold px-6 py-3 rounded-full text-sm transition-colors hover:opacity-60"
                style={{ color: 'var(--color-on-tertiary-container)' }}
              >
                Dismiss
              </button>
            </div>
          </div>
        </section>

        {/* Scan Meal CTA Card */}
        <section
          className="lg:col-span-4 rounded-2xl p-8 flex flex-col justify-between group cursor-pointer active:scale-95 transition-all"
          style={{ backgroundColor: 'var(--color-primary)' }}
          onClick={() => navigate('/scanner')}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
            style={{ backgroundColor: 'rgba(255,239,234,0.15)' }}
          >
            <span
              className="material-symbols-outlined material-symbols-filled text-4xl"
              style={{ color: 'var(--color-on-primary)' }}
            >
              photo_camera
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold font-headline mb-2" style={{ color: 'var(--color-on-primary)' }}>Scan Meal</h3>
            <p className="mb-6 text-sm" style={{ color: 'rgba(255,239,234,0.75)' }}>Log your nutrition instantly with NutriLens AI.</p>
            <div className="flex items-center gap-2 font-bold" style={{ color: 'var(--color-on-primary)' }}>
              <span>Get Started</span>
              <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </div>
          </div>
        </section>
      </div>

      {/* ── Daily Summary Rings ── */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-bold uppercase tracking-widest text-xs mb-1" style={{ color: 'var(--color-primary)' }}>Today's Progress</p>
            <h2 className="text-3xl font-extrabold font-headline" style={{ color: 'var(--color-on-surface)' }}>Daily Summary</h2>
          </div>
          <p className="font-medium text-sm" style={{ color: 'var(--color-outline)' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {macros.map(m => <MacroRing key={m.label} {...m} />)}
        </div>
      </section>

      {/* ── Recent Logs ── */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold font-headline" style={{ color: 'var(--color-on-surface)' }}>Recent Logs</h2>
          <button className="font-bold text-sm hover:underline" style={{ color: 'var(--color-primary)' }}>View History</button>
        </div>
        <div className="space-y-4">
          {logs.map(log => <MealLogRow key={log.name} {...log} />)}
        </div>
      </section>

      {/* ── Mobile FAB ── */}
      <button
        onClick={() => navigate('/scanner')}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-50 btn-gradient"
        style={{ color: 'var(--color-on-primary)' }}
      >
        <span className="material-symbols-outlined material-symbols-filled text-2xl">photo_camera</span>
      </button>
    </div>
  )
}

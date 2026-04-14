import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ITEMS = [
  { id: 1, icon: 'bakery_dining', name: 'Whole Wheat Pasta', weight: '240g', kcal: 380, portion: 1.0 },
  { id: 2, icon: 'nutrition',     name: 'Marinara Sauce',    weight: '180ml', kcal: 160, portion: 1.2 },
  { id: 3, icon: 'opacity',       name: 'Olive Oil',         weight: '1 tbsp', kcal: 100, portion: 1.0 },
]

// ── Feel-Good Gauge ────────────────────────────────────────────────────────
function EnergyGauge({ state }) {
  const states = {
    crash:    { label: 'Sugar Crash', color: 'var(--color-error)',     rotation: -70, emoji: '📉' },
    balanced: { label: 'Stable',      color: 'var(--color-secondary)', rotation:  0,  emoji: '🔋' },
    sluggish: { label: 'Sluggish',    color: 'var(--color-tertiary)',   rotation: -40, emoji: '🥱' },
  }
  const { label, color, rotation, emoji } = states[state] ?? states.crash

  return (
    <div className="flex flex-col items-center py-4">
      <div className="relative w-52 h-28 overflow-hidden mb-4">
        {/* Track */}
        <div
          className="absolute inset-0 rounded-t-full"
          style={{ border: '14px solid var(--color-surface-container-high)' }}
        />
        {/* Coloured arc fill */}
        <div
          className="absolute inset-0 rounded-t-full transition-all duration-700"
          style={{
            border: `14px solid ${color}`,
            clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
            opacity: 0.35,
          }}
        />
        {/* Needle */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 origin-bottom transition-transform duration-700"
          style={{ transform: `translateX(-50%) rotate(${rotation}deg)`, width: 4, height: 80 }}
        >
          <div className="w-1 h-20 rounded-full mx-auto" style={{ backgroundColor: 'var(--color-on-surface)' }} />
        </div>
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full"
          style={{ backgroundColor: 'var(--color-on-surface)' }}
        />
      </div>
      <span className="text-3xl font-extrabold font-headline mb-1" style={{ color }}>{emoji} {label}</span>
      <p className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>Post-Meal Energy Status</p>
    </div>
  )
}

// ── Portion Stepper ────────────────────────────────────────────────────────
function FoodItem({ icon, name, weight, kcal, portion, onChangePortion }) {
  return (
    <div
      className="p-5 rounded-2xl flex items-center justify-between transition-all"
      style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: 'rgba(161,58,0,0.08)', color: 'var(--color-primary)' }}
        >
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          <h4 className="font-bold" style={{ color: 'var(--color-on-surface)' }}>{name}</h4>
          <p className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
            {weight} · {Math.round(kcal * portion)} kcal
          </p>
        </div>
      </div>
      <div
        className="flex items-center gap-1 rounded-full px-2 py-1"
        style={{ backgroundColor: 'var(--color-surface-container-low)' }}
      >
        <button
          onClick={() => onChangePortion(-0.1)}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-70"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          <span className="material-symbols-outlined text-lg">remove</span>
        </button>
        <span className="text-sm font-bold w-10 text-center" style={{ color: 'var(--color-on-surface)' }}>
          {portion.toFixed(1)}x
        </span>
        <button
          onClick={() => onChangePortion(0.1)}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:opacity-70"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          <span className="material-symbols-outlined text-lg">add</span>
        </button>
      </div>
    </div>
  )
}

export default function Insights() {
  const navigate = useNavigate()
  const [items, setItems] = useState(ITEMS)

  const totalKcal = Math.round(items.reduce((s, i) => s + i.kcal * i.portion, 0))

  const updatePortion = (id, delta) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, portion: Math.max(0.1, Math.round((item.portion + delta) * 10) / 10) }
          : item
      )
    )
  }

  return (
    <div className="max-w-none" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-[1280px] mx-auto p-6 lg:p-8 grid grid-cols-12 gap-6 lg:gap-8">

        {/* ── Hero meal image (col 8) ── */}
        <section className="col-span-12 lg:col-span-8 overflow-hidden rounded-3xl relative h-[380px]">
          <img
            src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=80"
            alt="Scanned Meal – Spicy Marinara Pasta"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute bottom-0 left-0 right-0 p-8"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)' }}
          >
            <p className="text-sm font-medium uppercase tracking-widest mb-1 text-white opacity-80">Scanning Complete</p>
            <h2 className="text-4xl font-extrabold font-headline text-white">Spicy Marinara Pasta</h2>
          </div>
        </section>

        {/* ── Card B: Feel-Good Forecast (col 4) ── */}
        <section className="col-span-12 lg:col-span-4">
          <div
            className="p-8 rounded-3xl shadow-ambient flex flex-col h-full"
            style={{
              backgroundColor: 'var(--color-surface-container-lowest)',
              border: '1px solid var(--color-surface-container-high)',
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold font-headline" style={{ color: 'var(--color-on-surface)' }}>
                Feel-Good Forecast
              </h3>
              <span className="material-symbols-outlined material-symbols-filled" style={{ color: 'var(--color-primary-container)' }}>bolt</span>
            </div>

            <EnergyGauge state="crash" />

            <div
              className="mt-6 p-5 rounded-2xl"
              style={{ backgroundColor: 'rgba(179,27,37,0.07)', border: '1px solid rgba(251,81,81,0.2)' }}
            >
              <div className="flex gap-3">
                <span className="material-symbols-outlined mt-0.5" style={{ color: 'var(--color-error)' }}>trending_down</span>
                <p className="text-sm font-semibold leading-relaxed" style={{ color: 'var(--color-on-error-container)' }}>
                  Sugar Crash Alert:{' '}
                  <span className="font-normal opacity-90">
                    You'll likely feel a sharp energy drop in about 90 minutes.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Card A: Nutrition Breakdown (col 7) ── */}
        <section className="col-span-12 lg:col-span-7">
          <div
            className="p-8 rounded-3xl h-full"
            style={{ backgroundColor: 'var(--color-surface-container-low)' }}
          >
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-2xl font-bold font-headline" style={{ color: 'var(--color-on-surface)' }}>
                  Nutrition Breakdown
                </h3>
                <p className="text-sm mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>
                  {items.length} items identified from photo
                </p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-extrabold font-headline" style={{ color: 'var(--color-primary)' }}>
                  {totalKcal}
                </span>
                <span className="text-sm font-bold ml-1" style={{ color: 'var(--color-on-surface-variant)' }}>kcal</span>
              </div>
            </div>

            <div className="space-y-3">
              {items.map(item => (
                <FoodItem
                  key={item.id}
                  {...item}
                  onChangePortion={delta => updatePortion(item.id, delta)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Card C: Smart Suggestions + Actions (col 5) ── */}
        <section className="col-span-12 lg:col-span-5 flex flex-col gap-5">

          {/* Smart Suggestions */}
          <div
            className="p-8 rounded-3xl flex flex-col gap-4"
            style={{
              backgroundColor: 'rgba(150,244,220,0.2)',
              border: '1px solid rgba(0,104,87,0.1)',
            }}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined material-symbols-filled" style={{ color: 'var(--color-secondary)' }}>tips_and_updates</span>
              <h3 className="text-xl font-bold font-headline" style={{ color: 'var(--color-on-secondary-container)' }}>
                Smart Suggestions
              </h3>
            </div>
            <p className="leading-relaxed text-sm" style={{ color: 'var(--color-on-secondary-container)', opacity: 0.9 }}>
              Add a side of{' '}
              <strong style={{ color: 'var(--color-secondary)' }}>grilled chicken</strong>{' '}
              or{' '}
              <strong style={{ color: 'var(--color-secondary)' }}>broccoli</strong>{' '}
              to lower the glycemic spike and stay full longer.
            </p>
            <button
              className="mt-2 flex items-center gap-2 font-bold text-sm w-fit transition-transform hover:translate-x-1"
              style={{ color: 'var(--color-secondary)' }}
            >
              Add to Meal
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-auto">
            <button
              onClick={() => navigate('/logged')}
              className="w-full btn-gradient py-5 px-8 rounded-3xl font-extrabold text-lg flex items-center justify-center gap-3 shadow-ambient transition-all active:scale-95"
              style={{ color: 'var(--color-on-primary)' }}
            >
              Accept &amp; Log
              <span className="material-symbols-outlined">check_circle</span>
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/scanner')}
                className="flex items-center justify-center gap-2 py-4 px-5 rounded-2xl font-bold text-sm transition-colors hover:opacity-80"
                style={{ backgroundColor: 'var(--color-surface-container-high)', color: 'var(--color-on-surface)' }}
              >
                <span className="material-symbols-outlined text-lg">edit</span>
                Edit Meal
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center justify-center gap-2 py-4 px-5 rounded-2xl font-bold text-sm transition-colors hover:opacity-70"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                <span className="material-symbols-outlined text-lg">close</span>
                Cancel
              </button>
            </div>
          </div>
        </section>

        {/* Editorial footer */}
        <footer
          className="col-span-12 py-10 mt-4"
          style={{ borderTop: '1px solid var(--color-surface-container-high)' }}
        >
          <div className="max-w-2xl">
            <p className="font-headline italic text-lg leading-relaxed" style={{ color: 'var(--color-on-surface-variant)', opacity: 0.6 }}>
              "Nutrition isn't just about the calories you count, it's about the energy you keep."
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="h-px w-12" style={{ backgroundColor: 'var(--color-surface-container-highest)' }} />
              <span className="uppercase tracking-widest text-xs font-bold" style={{ color: 'var(--color-outline-variant)' }}>
                Clinical Concierge AI
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

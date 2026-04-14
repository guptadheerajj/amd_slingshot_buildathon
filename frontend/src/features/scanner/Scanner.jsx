import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Simulated detected items
const DETECTIONS = [
  { id: 1, label: 'Bowl of Pasta', confidence: 88 },
  { id: 2, label: 'Grated Parmesan', confidence: 94 },
]

export default function Scanner() {
  const navigate = useNavigate()
  const [flash, setFlash] = useState(false)
  const [captured, setCaptured] = useState(false)

  // Shimmer flash on shutter press
  const handleShutter = () => {
    setFlash(true)
    setCaptured(true)
    setTimeout(() => setFlash(false), 200)
    // For mock shutter, we use a default image or currently selected file
    setTimeout(() => navigate('/analyzing'), 800)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]
        sessionStorage.setItem('capturedMealImage', base64String)
        sessionStorage.setItem('capturedMealPreview', reader.result)
        navigate('/analyzing')
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: 'var(--color-on-surface)' }}>
      {/* Invisible File Input */}
      <input
        type="file"
        id="meal-upload"
        className="hidden"
        accept="image/*"
        onChange={handleFileUpload}
      />

      {/* Flash overlay */}
      {flash && <div className="fixed inset-0 bg-white z-[999] pointer-events-none" style={{ opacity: 0.8 }} />}

      {/* Top bar */}
      <header className="glass flex justify-between items-center px-6 py-3 z-50">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 rounded-full transition-opacity hover:opacity-70"
          style={{ color: 'var(--color-on-surface)' }}
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="font-extrabold font-headline text-lg" style={{ color: 'var(--color-primary)' }}>NutriLens</span>
        <button className="p-2 rounded-full hover:opacity-70" style={{ color: 'var(--color-on-surface)' }}>
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      {/* Main layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* ── Viewfinder ── */}
        <div className="relative lg:flex-1 aspect-video lg:aspect-auto bg-stone-900 overflow-hidden">

          {/* Mock camera feed */}
          <img
            src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=80"
            alt="Live camera feed – bowl of pasta"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />

          {/* Scanning overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Laser line */}
            <div className="scanning-line" />

            {/* Corner brackets */}
            {[
              'top-8 left-8 border-t-4 border-l-4 rounded-tl-xl',
              'top-8 right-8 border-t-4 border-r-4 rounded-tr-xl',
              'bottom-8 left-8 border-b-4 border-l-4 rounded-bl-xl',
              'bottom-8 right-8 border-b-4 border-r-4 rounded-br-xl',
            ].map((cls, i) => (
              <div
                key={i}
                className={`absolute w-12 h-12 opacity-80 ${cls}`}
                style={{ borderColor: 'var(--color-primary-container)' }}
              />
            ))}

            {/* AI detection chips */}
            {DETECTIONS.map((d, i) => (
              <div
                key={d.id}
                className="absolute flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg"
                style={{
                  top: i === 0 ? '35%' : undefined,
                  bottom: i === 1 ? '28%' : undefined,
                  left: i === 0 ? '20%' : undefined,
                  right: i === 1 ? '28%' : undefined,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full pulse-dot"
                  style={{ backgroundColor: i === 0 ? 'var(--color-secondary-container)' : 'var(--color-primary-container)' }}
                />
                {d.label} [{d.confidence}%]
              </div>
            ))}

            {/* Scanning status */}
            <div
              className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-2 rounded-full"
              style={{ backgroundColor: 'rgba(46,47,44,0.9)' }}
            >
              <span className="w-2 h-2 rounded-full pulse-dot" style={{ backgroundColor: '#fd7b40' }} />
              <span className="text-xs font-bold uppercase tracking-wide text-white font-headline">Scanning...</span>
            </div>
          </div>

          {/* Camera controls */}
          <div className="absolute bottom-0 inset-x-0 p-8 flex items-center justify-between"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }}
          >
            <button
              className="w-12 h-12 rounded-full flex items-center justify-center text-white border transition-all hover:opacity-80"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.2)' }}
            >
              <span className="material-symbols-outlined">bolt</span>
            </button>

            {/* Shutter */}
            <button
              onClick={handleShutter}
              className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center group active:scale-90 transition-transform"
            >
              <div
                className="w-16 h-16 rounded-full transition-colors"
                style={{ backgroundColor: captured ? 'var(--color-primary-container)' : 'white' }}
              />
            </button>

            <button
              className="w-12 h-12 rounded-full flex items-center justify-center text-white border transition-all hover:opacity-80"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.2)' }}
            >
              <span className="material-symbols-outlined">cameraswitch</span>
            </button>
          </div>
        </div>

        {/* ── Right panel (desktop) ── */}
        <div
          className="hidden lg:flex flex-col gap-6 w-96 p-6 overflow-y-auto"
          style={{ backgroundColor: 'var(--color-surface)' }}
        >
          {/* Header */}
          <div>
            <h1 className="text-3xl font-extrabold font-headline leading-none mb-2" style={{ color: 'var(--color-on-surface)' }}>
              Meal Scanning
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
              Align your meal within the frame for clinical nutritional analysis.
            </p>
          </div>

          {/* Upload button */}
          <button
            onClick={() => document.getElementById('meal-upload').click()}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-colors"
            style={{ backgroundColor: 'var(--color-surface-container-low)', color: 'var(--color-primary)' }}
          >
            <span className="material-symbols-outlined text-lg">upload_file</span>
            Upload from Computer
          </button>

          {/* Clinical Insights card */}
          <div
            className="p-6 rounded-2xl"
            style={{ backgroundColor: 'rgba(254,203,0,0.2)', border: '1px solid rgba(238,190,0,0.2)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined material-symbols-filled text-lg" style={{ color: 'var(--color-tertiary)' }}>auto_awesome</span>
              <h3 className="font-bold font-headline" style={{ color: 'var(--color-on-tertiary-container)' }}>Clinical Insights</h3>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-on-tertiary-container)' }}>
              High-carb Mediterranean dish detected. Consider adding leafy greens to lower glycemic response.
            </p>
            <div className="space-y-2">
              {[
                { label: 'Estimated Calories', val: '640 kcal', color: 'var(--color-primary)' },
                { label: 'Protein Content',    val: '24g',      color: 'var(--color-secondary)' },
              ].map(({ label, val, color }) => (
                <div key={label}
                  className="flex justify-between items-center p-3 rounded-xl"
                  style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
                >
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-on-surface)' }}>{label}</span>
                  <span className="font-extrabold font-headline" style={{ color }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Macros */}
          <div
            className="p-6 rounded-2xl relative overflow-hidden"
            style={{ backgroundColor: 'var(--color-surface-container-low)' }}
          >
            <h3 className="font-bold font-headline text-lg mb-5" style={{ color: 'var(--color-on-surface)' }}>Real-time Macros</h3>
            <div className="space-y-4">
              {[
                { label: 'Carbohydrates', pct: 65, color: 'var(--color-primary-container)' },
                { label: 'Fats', pct: 20, color: 'var(--color-tertiary-fixed-dim)' },
                { label: 'Protein', pct: 15, color: 'var(--color-secondary)' },
              ].map(({ label, pct, color }) => (
                <div key={label} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-on-surface-variant)' }}>{label}</span>
                    <span className="text-xs font-bold" style={{ color: 'var(--color-on-surface-variant)' }}>{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-surface-container-highest)' }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pro tip */}
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(161,58,0,0.06)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--color-primary)' }}>Pro Tip</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>
              Natural light provides 40% more accurate scanning results.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav
        className="lg:hidden flex justify-around items-center px-4 py-3 glass"
        style={{ borderTop: 'none' }}
      >
        {[
          { icon: 'camera', label: 'Scan', active: true },
          { icon: 'dashboard', label: 'Home', active: false },
          { icon: 'history', label: 'Logs', active: false },
        ].map(({ icon, label, active }) => (
          <button key={label} className="flex flex-col items-center gap-1">
            <span
              className={`material-symbols-outlined ${active ? 'material-symbols-filled' : ''}`}
              style={{ color: active ? 'var(--color-primary)' : 'var(--color-on-surface-variant)' }}
            >{icon}</span>
            <span
              className="text-[10px] font-bold uppercase"
              style={{ color: active ? 'var(--color-primary)' : 'var(--color-on-surface-variant)' }}
            >{label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

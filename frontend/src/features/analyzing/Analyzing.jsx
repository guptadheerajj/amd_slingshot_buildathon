import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const STEPS = [
  { icon: 'biotech',        label: 'Identifying ingredients...',    delay: 0    },
  { icon: 'calculate',      label: 'Calculating macros...',         delay: 2000 },
  { icon: 'query_stats',    label: 'Analyzing historical impact...', delay: 4500 },
  { icon: 'auto_awesome',   label: 'Generating forecast...',        delay: 7000 },
]

export default function Analyzing() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(() => {
    const savedPreview = sessionStorage.getItem('capturedMealPreview')
    if (savedPreview) setPreviewUrl(savedPreview)

    const runAnalysis = async () => {
      const imageData = sessionStorage.getItem('capturedMealImage')
      if (!imageData) {
        console.error('No image data found in session storage')
        // navigate('/scanner')
        return
      }

      try {
        const response = await fetch('http://localhost:5000/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: imageData })
        })

        if (!response.ok) throw new Error('Scan failed')
        const data = await response.json()
        
        // Store for Insights
        sessionStorage.setItem('lastScanResult', JSON.stringify(data))
        
        // Ensure we wait at least long enough for the cool animations
        setTimeout(() => navigate('/insights'), 8000)
      } catch (error) {
        console.error('Analysis error:', error)
        // In case of error, maybe show 404 or redirect back
      }
    }

    runAnalysis()

    const timers = []
    STEPS.forEach((step, i) => {
      timers.push(setTimeout(() => {
        setActiveStep(i)
        setProgress(Math.round(((i + 1) / STEPS.length) * 100))
      }, step.delay))
    })

    return () => timers.forEach(clearTimeout)
  }, [navigate])

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      {/* Top bar */}
      <header className="glass sticky top-0 z-50 shadow-sm">
        <div className="flex justify-between items-center px-6 py-3 max-w-[1440px] mx-auto">
          <span className="text-xl font-extrabold font-headline" style={{ color: 'var(--color-primary)' }}>NutriLens</span>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:opacity-60" style={{ color: 'var(--color-on-surface-variant)' }}>
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 rounded-full hover:opacity-60" style={{ color: 'var(--color-on-surface-variant)' }}>
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: 'var(--color-primary-container)', color: 'var(--color-on-primary-container)' }}
            >
              D
            </div>
          </div>
        </div>
      </header>

      {/* Main analysis canvas */}
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-12 lg:gap-20">

          {/* Image + scanning effect */}
          <div
            className="relative w-full md:w-1/2 aspect-square rounded-3xl overflow-hidden shadow-2xl"
            style={{ border: '4px solid var(--color-surface-container)' }}
          >
            <img
              src={previewUrl || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80"}
              alt="Captured Meal being analyzed"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.75)' }}
            />

            {/* gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(46,47,44,0.4), transparent)' }}
            />

            {/* Scanning laser */}
            <div className="scanning-line" />

            {/* AI recognition markers */}
            {[
              { top: '25%', left: '30%', label: 'PROTEIN: SALMON' },
              { bottom: '30%', right: '20%', label: 'LIPID: AVOCADO' },
            ].map(({ label, ...pos }) => (
              <div
                key={label}
                className="absolute flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-white text-[10px] font-bold"
                style={{
                  ...pos,
                  backgroundColor: 'rgba(0,104,87,0.8)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(150,244,220,0.3)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full pulse-dot"
                  style={{ backgroundColor: 'var(--color-secondary-fixed)' }}
                />
                {label}
              </div>
            ))}
          </div>

          {/* Loading steps */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-8">
            <div>
              <p
                className="font-semibold tracking-widest text-sm uppercase mb-2"
                style={{ color: 'var(--color-secondary)' }}
              >
                Clinical Analysis in Progress
              </p>
              <h1
                className="text-4xl lg:text-5xl font-extrabold font-headline leading-tight"
                style={{ color: 'var(--color-on-surface)' }}
              >
                Mapping Your{' '}
                <br />
                <em style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>
                  Nutritional Matrix.
                </em>
              </h1>
            </div>

            <div className="space-y-5">
              {STEPS.map((step, i) => {
                const isDone   = i < activeStep
                const isActive = i === activeStep
                const isPending = i > activeStep
                return (
                  <div
                    key={step.label}
                    className="flex items-center gap-4 transition-opacity duration-500"
                    style={{ opacity: isPending ? 0.35 : 1 }}
                  >
                    <div
                      className="relative w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: isDone
                          ? 'var(--color-secondary-container)'
                          : isActive
                            ? 'var(--color-secondary-container)'
                            : 'var(--color-surface-container-high)',
                        color: isDone || isActive
                          ? 'var(--color-secondary)'
                          : 'var(--color-on-surface-variant)',
                      }}
                    >
                      <span className="material-symbols-outlined text-xl">
                        {isDone ? 'check_circle' : step.icon}
                      </span>
                      {isActive && (
                        <div
                          className="absolute inset-0 rounded-full border-2 border-t-transparent animate-spin"
                          style={{ borderColor: `var(--color-secondary) transparent transparent transparent` }}
                        />
                      )}
                    </div>
                    <span
                      className="text-xl font-headline font-semibold"
                      style={{ color: 'var(--color-on-surface)' }}
                    >
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Progress bar */}
            <div
              className="w-full h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: 'var(--color-surface-container-highest)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-700 btn-gradient"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Nudge bottom card */}
        <div
          className="mt-16 w-full max-w-4xl p-6 rounded-3xl flex items-center gap-5"
          style={{
            backgroundColor: 'rgba(254,203,0,0.15)',
            border: '1px solid rgba(254,203,0,0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'var(--color-tertiary-container)' }}
          >
            <span className="material-symbols-outlined text-2xl" style={{ color: 'var(--color-on-tertiary-container)' }}>
              lightbulb
            </span>
          </div>
          <div>
            <p className="font-bold font-headline text-lg mb-0.5" style={{ color: 'var(--color-on-tertiary-container)' }}>Did you know?</p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(88,69,0,0.8)' }}>
              Scanning within 15 minutes of eating helps our clinical engine better align your glycemic response with your activity data.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

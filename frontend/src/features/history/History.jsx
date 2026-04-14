import { useState, useEffect } from 'react'

export default function History() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const resp = await fetch('http://localhost:5000/api/history')
      const data = await resp.json()
      setLogs(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteLog = async (id) => {
    if (!confirm('Delete this log?')) return
    try {
      await fetch(`http://localhost:5000/api/history/${id}`, { method: 'DELETE' })
      setLogs(logs.filter(l => l.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const formatTime = (d) => new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const formatDate = (d) => new Date(d).toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })

  if (loading) return <div className="p-10 text-center">Loading your history...</div>

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <header className="mb-12">
        <p className="font-bold uppercase tracking-widest text-xs mb-1" style={{ color: 'var(--color-primary)' }}>Your Journey</p>
        <h1 className="text-4xl font-extrabold font-headline" style={{ color: 'var(--color-on-surface)' }}>Meal History</h1>
      </header>

      {logs.length === 0 ? (
        <div className="text-center py-20 bg-surface-container-low rounded-3xl border-2 border-dashed border-outline-variant">
           <span className="material-symbols-outlined text-6xl mb-4 opacity-20">history</span>
           <p className="text-lg font-medium opacity-50">No logs found yet. Start scanning!</p>
        </div>
      ) : (
        <div className="space-y-10 relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-surface-container-high hidden md:block" />

          {logs.map((log, i) => {
            const showDate = i === 0 || formatDate(log.timestamp) !== formatDate(logs[i-1].timestamp)
            return (
              <div key={log.id} className="relative">
                {showDate && (
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-6 bg-surface p-2 sticky top-0 z-10" style={{ color: 'var(--color-outline)' }}>
                    {formatDate(log.timestamp)}
                  </h3>
                )}
                
                <div className="md:pl-16 relative">
                  {/* Timeline dot */}
                  <div className="absolute left-[21px] top-6 w-3 h-3 rounded-full bg-primary hidden md:block border-4 border-surface" />
                  
                  <div 
                    className="p-6 rounded-3xl shadow-ambient flex flex-col md:flex-row gap-6 group hover:shadow-lg transition-shadow"
                    style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
                  >
                    <div className="w-full md:w-32 h-32 rounded-2xl bg-surface-container flex items-center justify-center text-4xl overflow-hidden shrink-0">
                      {log.items?.[0]?.name ? '🍱' : '🍽️'}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-xl font-bold font-headline">{log.items?.[0]?.name || 'Meal'}</h4>
                          <p className="text-sm opacity-60">{log.forecast} · {formatTime(log.timestamp)}</p>
                        </div>
                        <button onClick={() => deleteLog(log.id)} className="opacity-0 group-hover:opacity-100 p-2 text-error transition-opacity">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-4">
                        <Stat val={`${Math.round(log.calories)} kcal`} label="Energy" color="var(--color-primary)" />
                        <Stat val={`${Math.round(log.protein)}g`} label="Protein" color="var(--color-secondary)" />
                        <Stat val={`${Math.round(log.carbs)}g`} label="Carbs" color="var(--color-tertiary)" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Stat({ val, label, color }) {
  return (
    <div>
      <p className="text-sm font-bold" style={{ color }}>{val}</p>
      <p className="text-[10px] uppercase tracking-tighter opacity-50">{label}</p>
    </div>
  )
}

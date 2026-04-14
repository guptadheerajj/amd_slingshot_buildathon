import { useState, useEffect } from 'react'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resp = await fetch('http://localhost:5000/api/dashboard')
        const data = await resp.json()
        setUser(data.user)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  if (loading) return <div className="p-10 text-center">Loading profile...</div>

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <header className="mb-12">
        <p className="font-bold uppercase tracking-widest text-xs mb-1" style={{ color: 'var(--color-primary)' }}>Settings</p>
        <h1 className="text-4xl font-extrabold font-headline" style={{ color: 'var(--color-on-surface)' }}>Your Profile</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Profile Card */}
        <section className="md:col-span-4 rounded-3xl p-8 flex flex-col items-center text-center" style={{ backgroundColor: 'var(--color-surface-container-low)' }}>
           <div className="w-24 h-24 rounded-full bg-primary-container flex items-center justify-center text-4xl mb-4 text-on-primary-container shadow-inner">
              {user?.name?.[0] || 'G'}
           </div>
           <h2 className="text-2xl font-bold font-headline">{user?.name || 'Guest Explorer'}</h2>
           <p className="text-sm opacity-60 mb-6">guest@nutrilens.ai</p>
           
           <div className="flex gap-2 items-center bg-surface-container-high px-4 py-2 rounded-full mb-8">
              <span className="material-symbols-outlined text-tertiary">workspace_premium</span>
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface">Pro Member</span>
           </div>

           <div className="w-full space-y-3">
              <button className="w-full py-3 rounded-xl font-bold text-sm bg-surface-container-highest hover:bg-surface-container-high transition-colors text-on-surface">View Achievements</button>
              <button className="w-full py-3 rounded-xl font-bold text-sm text-error hover:bg-error-container/10 transition-colors">Sign Out</button>
           </div>
        </section>

        {/* Goals Management */}
        <section className="md:col-span-8 space-y-8">
           <div className="p-8 rounded-3xl" style={{ backgroundColor: 'var(--color-surface-container-lowest)', border: '1px solid var(--color-outline-variant)' }}>
              <h3 className="text-xl font-bold font-headline mb-6">Nutrition Goals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <GoalInput label="Daily Calories" val={user?.goals?.calories} unit="kcal" />
                 <GoalInput label="Daily Protein" val={user?.goals?.protein} unit="g" />
                 <GoalInput label="Daily Carbs" val={user?.goals?.carbs} unit="g" />
                 <GoalInput label="Daily Fats" val={user?.goals?.fats} unit="g" />
              </div>
              <button className="mt-8 px-8 py-3 rounded-xl font-bold bg-primary text-on-primary shadow-lg hover:shadow-xl transition-all active:scale-95">Update Goals</button>
           </div>

           <div className="p-8 rounded-3xl" style={{ backgroundColor: 'var(--color-surface-container-lowest)', border: '1px solid var(--color-outline-variant)' }}>
              <h3 className="text-xl font-bold font-headline mb-4">Integrations</h3>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low">
                 <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-3xl opacity-40">fitness_center</span>
                    <div>
                       <p className="font-bold">Apple Health</p>
                       <p className="text-xs opacity-60">Sync your activity data</p>
                    </div>
                 </div>
                 <button className="text-xs font-bold text-primary hover:underline">Connect</button>
              </div>
           </div>
        </section>
      </div>
    </div>
  )
}

function GoalInput({ label, val, unit }) {
  return (
    <div className="space-y-2">
       <label className="text-xs font-bold uppercase tracking-widest opacity-40">{label}</label>
       <div className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-low border border-transparent focus-within:border-primary transition-colors">
          <input type="number" defaultValue={val} className="bg-transparent font-bold text-lg w-full outline-none" />
          <span className="text-xs font-bold opacity-30">{unit}</span>
       </div>
    </div>
  )
}

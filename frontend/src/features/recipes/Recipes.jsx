import { useState, useEffect } from 'react'

export default function Recipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const resp = await fetch('http://localhost:5000/api/recipes/recommendations')
        const data = await resp.json()
        setRecipes(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes()
  }, [])

  if (loading) {
    return (
      <div className="p-20 text-center">
        <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin mx-auto mb-4" style={{ borderColor: 'var(--color-primary) transparent transparent transparent' }} />
        <p className="font-headline font-bold text-xl">NutriLens is calculating your perfect matches...</p>
        <p className="text-sm opacity-60">Analyzing your remaining macro budget</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      <header className="mb-12">
        <p className="font-bold uppercase tracking-widest text-xs mb-1" style={{ color: 'var(--color-primary)' }}>Your Next Move</p>
        <h1 className="text-4xl font-extrabold font-headline mb-4" style={{ color: 'var(--color-on-surface)' }}>Smart Suggestions</h1>
        <p className="max-w-2xl text-lg opacity-70">Based on your activity today, these meals are optimized to hit your targets without causing an energy crash.</p>
      </header>

      {recipes.length === 0 ? (
        <div className="p-12 text-center bg-surface-container-low rounded-3xl">
          <p>We couldn't generate suggestions right now. Try logging some meals first!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recipes.map((recipe, idx) => (
            <div 
              key={idx} 
              className="group rounded-[32px] overflow-hidden shadow-ambient hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
              style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80&sig=${idx}`} 
                  alt={recipe.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-3 py-1 flex items-center gap-1 shadow-sm">
                   <span className="material-symbols-outlined text-sm text-primary">bolt</span>
                   <span className="text-[10px] font-bold uppercase">{recipe.calories} kcal</span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold font-headline mb-3 leading-tight group-hover:text-primary transition-colors">{recipe.title}</h3>
                  <p className="text-sm leading-relaxed opacity-70 mb-6">{recipe.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Ingredients</p>
                    <ul className="flex flex-wrap gap-2">
                       {recipe.ingredients?.map(ing => (
                         <li key={ing} className="text-[11px] font-semibold px-3 py-1 rounded-full bg-surface-container-low opacity-80">{ing}</li>
                       ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-outline-variant flex items-center justify-between">
                   <div className="flex gap-4">
                      <MacroMini val={recipe.macros?.protein} label="P" />
                      <MacroMini val={recipe.macros?.carbs} label="C" />
                   </div>
                   <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transition-transform active:scale-90">
                      <span className="material-symbols-outlined text-xl">favorite</span>
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function MacroMini({ val, label }) {
  return (
    <div className="flex flex-col">
       <span className="text-sm font-bold font-headline">{val}g</span>
       <span className="text-[9px] font-bold opacity-40 -mt-1">{label}</span>
    </div>
  )
}

import axios from 'axios'
import { PrismaClient } from '@prisma/client'
import { getDailySummary } from '../dashboard/dashboard.service.js'

const prisma = new PrismaClient()

/**
 * Service to generate AI recipe recommendations based on remaining macros
 */
export const getRecommendedRecipes = async () => {
  const apiKey = process.env.OPEN_ROUTER_KEP
  const model = 'google/gemini-2.5-flash-preview'

  // 1. Get current progress vs goals
  const user = await prisma.user.findFirst({ where: { email: 'guest@nutrilens.ai' } })
  if (!user) return []

  const summary = await getDailySummary(user.id)
  
  const remaining = {
    calories: Math.max(200, user.goalCalories - summary.calories),
    protein: Math.max(10, user.goalProtein - summary.protein),
    carbs: Math.max(20, user.goalCarbs - summary.carbs),
    fats: Math.max(5, user.goalFats - summary.fats)
  }

  const prompt = `
    You are a professional nutritionist. A user has the following remaining nutritional budget for today:
    - Calories: ${remaining.calories} kcal
    - Protein: ${remaining.protein} g
    - Carbs: ${remaining.carbs} g
    - Fats: ${remaining.fats} g

    Suggest 3 delicious, healthy meal or snack recipes that closely fit within these remaining macros to help them hit their daily target.
    Return a JSON array of objects with exactly this structure:
    [
      {
        "title": "Recipe Name",
        "description": "Short appetizing description",
        "ingredients": ["item 1", "item 2"],
        "calories": 300,
        "macros": { "protein": 20, "carbs": 30, "fats": 10 },
        "why": "Explanation of why this fits their current gap (e.g. 'High protein to hit your target')",
        "imageKeyword": "keyword for food image search"
      }
    ]
  `

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      },
      {
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }
      }
    )

    const content = response.data.choices[0].message.content
    // Handle cases where the AI might wrap in { "recipes": [...] }
    const parsed = JSON.parse(content)
    return Array.isArray(parsed) ? parsed : (parsed.recipes || [])
  } catch (error) {
    console.error('Recipe Recommendation Error:', error?.response?.data || error.message)
    return []
  }
}

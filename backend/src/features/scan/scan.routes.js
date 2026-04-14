import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { analyzeMealImage } from './scan.service.js'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// POST /api/scan - Only performs AI analysis
router.post('/', asyncHandler(async (req, res) => {
  const { image } = req.body

  if (!image) {
    return res.status(400).json({ message: 'Image data is required' })
  }

  // Analyze image via OpenRouter
  const analysis = await analyzeMealImage(image)

  // Return the analysis result (not saved yet)
  res.json({
    ...analysis
  })
}))

// POST /api/scan/save - Persists the meal log
router.post('/save', asyncHandler(async (req, res) => {
  const analysis = req.body // Final adjusted macros from frontend

  // Find or create guest user
  let user = await prisma.user.findFirst({
    where: { email: 'guest@nutrilens.ai' }
  })

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'guest@nutrilens.ai',
        name: 'Guest Explorer',
        streak: 1
      }
    })
  }

  // Store the meal log
  const mealLog = await prisma.mealLog.create({
    data: {
      userId: user.id,
      imageUrl: null, 
      items: JSON.stringify(analysis.items),
      calories: analysis.totalMacros.calories,
      protein: analysis.totalMacros.protein,
      carbs: analysis.totalMacros.carbs,
      fats: analysis.totalMacros.fats,
      sugar: analysis.totalMacros.sugar || 0,
      forecast: analysis.forecast
    }
  })

  res.json({
    id: mealLog.id,
    streak: user.streak,
    caloriesSaved: mealLog.calories
  })
}))

export default router

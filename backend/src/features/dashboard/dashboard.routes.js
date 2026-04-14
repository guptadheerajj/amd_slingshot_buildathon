import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { getDailySummary, generateHabitNudge } from './dashboard.service.js'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// GET /api/dashboard
router.get('/', asyncHandler(async (req, res) => {
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

  const summary = await getDailySummary(user.id)
  const nudge = await generateHabitNudge(user.id)
  const recentLogs = await prisma.mealLog.findMany({
    where: { userId: user.id },
    orderBy: { timestamp: 'desc' },
    take: 5
  })

  // Parse items from stringified JSON
  const recentLogsParsed = recentLogs.map(log => ({
    ...log,
    items: log.items ? JSON.parse(log.items) : []
  }))

  res.json({
    user: {
      name: user.name,
      streak: user.streak,
      goals: {
        calories: user.goalCalories,
        protein: user.goalProtein,
        carbs: user.goalCarbs,
        fats: user.goalFats
      }
    },
    summary,
    recentLogs: recentLogsParsed,
    nudge
  })
}))

export default router

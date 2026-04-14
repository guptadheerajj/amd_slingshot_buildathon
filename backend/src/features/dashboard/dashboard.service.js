import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Aggregates nutrition for today
 */
export const getDailySummary = async (userId) => {
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const logs = await prisma.mealLog.findMany({
    where: {
      userId,
      timestamp: { gte: startOfDay }
    }
  })

  return logs.reduce((acc, log) => ({
    calories: acc.calories + log.calories,
    protein: acc.protein + log.protein,
    carbs: acc.carbs + log.carbs,
    fats: acc.fats + log.fats,
    sugar: acc.sugar + (log.sugar || 0)
  }), { calories: 0, protein: 0, carbs: 0, fats: 0, sugar: 0 })
}

/**
 * Detects patterns for the Habit Insight Nudge
 */
export const generateHabitNudge = async (userId) => {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const logs = await prisma.mealLog.findMany({
    where: {
      userId,
      timestamp: { gte: sevenDaysAgo }
    },
    orderBy: { timestamp: 'desc' }
  })

  // Simple Pattern: High sugar (>15g) in the afternoon (2pm - 5pm)
  const afternoonSugarLogs = logs.filter(log => {
      const hour = log.timestamp.getHours()
      return hour >= 14 && hour <= 17 && (log.sugar || 0) > 15
  })

  if (afternoonSugarLogs.length >= 2) {
      return {
          title: "Afternoon Sugar Spike Detected",
          message: `You've had high-sugar snacks ${afternoonSugarLogs.length} times this week around 3 PM.`,
          suggestion: "Tomorrow, try swapping the candy for an apple to avoid the 4 PM crash.",
          type: "sugar_alert"
      }
  }

  // Fallback / default nudge if new user
  return {
      title: "Fuel for the Long Run",
      message: "Regularly tracking your meals helps NutriLens calibrate your glycemic responses.",
      suggestion: "Scan your next meal to see your real-time forecast.",
      type: "general"
  }
}

import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// GET /api/history - Get all logs for guest user
router.get('/', asyncHandler(async (req, res) => {
  const user = await prisma.user.findFirst({
    where: { email: 'guest@nutrilens.ai' }
  })

  if (!user) return res.json([])

  const logs = await prisma.mealLog.findMany({
    where: { userId: user.id },
    orderBy: { timestamp: 'desc' }
  })

  // Parse items from stringified JSON
  const parsedLogs = logs.map(log => ({
    ...log,
    items: log.items ? JSON.parse(log.items) : []
  }))

  res.json(parsedLogs)
}))

// DELETE /api/history/:id - Delete a log
router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params
  await prisma.mealLog.delete({
    where: { id }
  })
  res.json({ success: true })
}))

export default router

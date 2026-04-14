import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { getRecommendedRecipes } from './recipe.service.js'

const router = Router()

// GET /api/recipes/recommendations
router.get('/recommendations', asyncHandler(async (req, res) => {
  const recommendations = await getRecommendedRecipes()
  res.json(recommendations)
}))

export default router

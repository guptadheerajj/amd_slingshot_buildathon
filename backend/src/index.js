import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import scanRoutes from './features/scan/scan.routes.js'
import dashboardRoutes from './features/dashboard/dashboard.routes.js'
import historyRoutes from './features/history/history.routes.js'
import recipeRoutes from './features/recipes/recipe.routes.js'

dotenv.config({ path: '../.env' })

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Static folder for uploads if needed
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Routes
app.use('/api/scan', scanRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/history', historyRoutes)
app.use('/api/recipes', recipeRoutes)

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'NutriLens API is running' })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

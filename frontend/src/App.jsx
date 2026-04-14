import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import PlaceholderPage from './components/PlaceholderPage'
import Dashboard from './features/dashboard/Dashboard'
import Scanner from './features/scanner/Scanner'
import Analyzing from './features/analyzing/Analyzing'
import Insights from './features/insights/Insights'
import LogConfirmation from './features/confirmation/LogConfirmation'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes with sidebar + topbar layout */}
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/insights"  element={<Insights />} />
          <Route path="/history"   element={<PlaceholderPage title="Meal History" icon="history" />} />
          <Route path="/recipes"   element={<PlaceholderPage title="Recipes" icon="restaurant_menu" />} />
          <Route path="/profile"   element={<PlaceholderPage title="Profile" icon="person" />} />
          <Route path="*"          element={<PlaceholderPage title="Page Not Found" icon="search_off" />} />
        </Route>

        {/* Full-screen routes (no sidebar) */}
        <Route path="/scanner"   element={<Scanner />} />
        <Route path="/analyzing" element={<Analyzing />} />
        <Route path="/logged"    element={<LogConfirmation />} />
      </Routes>
    </BrowserRouter>
  )
}

import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function AppLayout() {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-surface)' }}>
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Content area */}
      <div className="flex-1 flex flex-col md:ml-64">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

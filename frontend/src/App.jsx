import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/cms/ProtectedRoute'
import HomePage      from './pages/HomePage'
import AboutPage     from './pages/AboutPage'
import ServicesPage  from './pages/ServicesPage'
import ProjectsPage  from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ContactPage   from './pages/ContactPage'
import AdminLogin    from './pages/AdminLogin'
import AdminPage     from './pages/AdminPage'

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

// 404 Not Found
function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl font-poppins font-black text-gray-100 mb-4">404</div>
      <h1 className="font-poppins font-black text-navy text-2xl mb-2">Page Not Found</h1>
      <p className="text-gray-400 text-sm mb-8 max-w-sm">The page you're looking for doesn't exist or has been moved.</p>
      <a href="/" className="bg-blue-brand text-white px-6 py-3 rounded font-bold text-sm hover:bg-blue-dark transition-colors">
        ← Back to Home
      </a>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* Public pages */}
        <Route path="/"         element={<HomePage />} />
        <Route path="/about"    element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/contact"  element={<ContactPage />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        } />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

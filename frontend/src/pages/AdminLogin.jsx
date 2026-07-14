import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import logo from '../assets/logo.png'

export default function AdminLogin() {
  const { login } = useAuth()
  const nav = useNavigate()
  const { register, handleSubmit, formState: { isSubmitting } } = useForm()

  const onSubmit = async ({ email, password }) => {
    const ok = await login(email, password)
    if (ok) {
      toast.success('Welcome back!')
      nav('/admin')
    } else {
      toast.error('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage:'linear-gradient(rgba(29,161,242,1) 1px,transparent 1px),linear-gradient(90deg,rgba(29,161,242,1) 1px,transparent 1px)', backgroundSize:'28px 28px' }} />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logo} alt="A1 Construction" className="h-14 w-auto mx-auto mb-4 brightness-0 invert" />
          </Link>
          <p className="text-white/30 text-xs font-inter uppercase tracking-[3px]">CMS Administration</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h1 className="font-poppins font-black text-navy text-xl mb-1">Sign In</h1>
          <p className="text-gray-400 text-xs mb-6">Access the content management dashboard</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Email Address</label>
              <input
                {...register('email', { required: true })}
                type="email"
                placeholder="admin@a1construction.co.in"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-brand transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Password</label>
              <input
                {...register('password', { required: true })}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-brand transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-brand hover:bg-blue-dark text-white py-3.5 rounded-lg font-bold text-sm transition-colors disabled:opacity-60"
            >
              {isSubmitting ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-gray-100 text-center">
            <Link to="/" className="text-gray-400 text-xs hover:text-blue-brand transition-colors">← Back to Website</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

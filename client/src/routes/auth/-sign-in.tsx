import { useState } from 'react'
import { Link } from '@tanstack/react-router'

interface SignInFormData {
  email: string
  password: string
}

export default function SignIn() {
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log("name:", name)
    console.log("value:", value)
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // TODO: Replace with actual API call
    try {
      console.log('Signing in with:', formData)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Signed in!")
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col" style={{ background: 'black' }}>
      <header className="bg-amber-900 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-xl font-bold">Backpacking Gear Tracker</h1>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[440px]">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-3">Sign in</h1>
            <p className="text-gray-400 text-lg">Enter your email to continue</p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 text-sm text-left rounded-lg">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                required
                className="px-5 py-4 text-lg border-2 border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:border-blue-600 placeholder:text-gray-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="px-5 py-4 text-lg border-2 border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:border-blue-600 placeholder:text-gray-500"
              />
            </div>

            <button
              type="submit"
              className="py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg cursor-pointer transition-all hover:bg-blue-700 active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-8 text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/sign-up"
              className="text-blue-500 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <footer className="bg-amber-900 py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-300 text-sm">
            © 2026 Backpacking Gear Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

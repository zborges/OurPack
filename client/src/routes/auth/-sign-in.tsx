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

  const handleSubmit = async (e: SubmitEvent) => {
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
    <div className="flex justify-center items-center min-h-screen p-8">
      <div className="w-full max-w-[420px] p-10 bg-bg border border-border rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-[28px] mb-2">Welcome back</h1>
          <p className="text-text">Sign in to your account to continue</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-600 text-sm text-left rounded-lg">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="email" className="text-sm font-medium text-text-h">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="px-4 py-3 text-base border border-border rounded-lg bg-bg text-text-h focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 placeholder:text-text"
            />
          </div>

          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="password" className="text-sm font-medium text-text-h">
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
              className="px-4 py-3 text-base border border-border rounded-lg bg-bg text-text-h focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 placeholder:text-text"
            />
          </div>

          <button
            type="submit"
            className="py-3.5 text-base font-medium text-white bg-accent border-none rounded-lg cursor-pointer transition-opacity active:scale-[0.98] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="text-center text-sm text-text">
          Don't have an account?{' '}
          <Link
            to="/sign-up"
            className="text-accent no-underline font-medium hover:underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link } from '@tanstack/react-router'

interface SignUpFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function SignUp() {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }

    // TODO: Replace with actual API call
    try {
      console.log('Signing up with:', formData)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-8">
      <div className="w-full max-w-[420px] p-10 bg-bg border border-border rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-[28px] mb-2">Create an account</h1>
          <p className="text-text">Sign up to get started</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-600 text-sm text-left rounded-lg">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="name" className="text-sm font-medium text-text-h">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="px-4 py-3 text-base border border-border rounded-lg bg-bg text-text-h focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 placeholder:text-text"
            />
          </div>

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
              placeholder="Create a password"
              required
              className="px-4 py-3 text-base border border-border rounded-lg bg-bg text-text-h focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 placeholder:text-text"
            />
          </div>

          <div className="flex flex-col gap-2 text-left">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-text-h">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              className="px-4 py-3 text-base border border-border rounded-lg bg-bg text-text-h focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 placeholder:text-text"
            />
          </div>

          <button
            type="submit"
            className="py-3.5 text-base font-medium text-white bg-accent border-none rounded-lg cursor-pointer transition-opacity active:scale-[0.98] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <div className="text-center text-sm text-text">
          Already have an account?{' '}
          <Link
            to="/sign-in"
            className="text-accent no-underline font-medium hover:underline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

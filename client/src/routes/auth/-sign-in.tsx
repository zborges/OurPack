import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { InputText } from '../../components/InputText'

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
      console.log('Signed in!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <header className="py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-xl font-bold">Backpacking Gear Tracker</h1>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[440px]">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-black mb-3">Sign in</h1>
            <p className="text-gray-600 text-lg">Enter your email to continue</p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {error && (
              <div className="error-default">
                {error}
              </div>
            )}

            <InputText
              label="Email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
            />

            <InputText
              label="Password"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

            <button
              type="submit"
              className="py-4 text-lg font-semibold text-white bg-black rounded-lg cursor-pointer transition-all hover:bg-gray-800 active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-8 text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/sign-up"
              className="text-black font-semibold hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <footer className="bg-black py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400 text-sm">
            © 2026 Backpacking Gear Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

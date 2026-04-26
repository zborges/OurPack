import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { InputText } from '../../components/InputText'

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

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
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
    <div className="min-h-screen bg-bg flex flex-col">
      <header className="bg-amber-900 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-xl font-bold">Backpacking Gear Tracker</h1>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[440px]">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-3">Create account</h1>
            <p className="text-gray-400 text-lg">Start your journey</p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {error && (
              <div className="error-default">
                {error}
              </div>
            )}

            <InputText
              label="name"
              type="name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />

            <InputText
              label="email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="johndoe@email.com"
              required
            />

            <InputText
              label="password"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />

            <InputText
              label="confirmPassword"
              type="confirmPassword"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Password"
              required
            />

            <button
              type="submit"
              className="py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg cursor-pointer transition-all hover:bg-blue-700 active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="text-center mt-8 text-gray-400">
            Already have an account?{' '}
            <Link
              to="/"
              className="text-blue-500 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

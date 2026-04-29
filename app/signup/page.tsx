"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { InputText } from '../components/InputText'
import Link from 'next/link'



export default function SignupPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  useEffect(() => {
    setPassword('')
    setPasswordConfirmation('')
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const formPassword = formData.get('password') as string
    const formPasswordConfirmation = formData.get('passwordConfirmation') as string

    if (formPassword !== formPasswordConfirmation) {
      console.log(formPassword, formPasswordConfirmation)
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password: formPassword }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/profile')
      } else {
        if (response.status === 409) {
          setError("User already exists with this email")
        } else if (response.status === 400) {
          setError(data.error || "Invalid input")
        } else {
          setError("Signup failed. Please try again.")
        }
      }
    } catch (err) {
      console.error("Network error during signup:", err)
      setError("Network error. Please check your connection.")
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
            // value={formData.name}
            // onChange={handleChange}
            placeholder="John Doe"
            required
          />

          <InputText
            label="email"
            type="email"
            id="email"
            name="email"
            // value={formData.email}
            // onChange={handleChange}
            placeholder="johndoe@email.com"
            required
          />

          <InputText
            label="password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            autoComplete="new-password"
            required
          />

          <InputText
            label="Password Confirmation"
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            placeholder="Password"
            autoComplete="new-password"
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
            href="/signin"
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

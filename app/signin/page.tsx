"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { InputText } from '../components/InputText'

interface SignInFormData {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
 
  async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
 
    
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
 
    try{

        const response = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
        
        if (response.ok) {
            console.log("Success")
            router.push('/profile')
        } else {
            // Handle errors
            console.log(response)
            console.log("Login Failed")
        }
    } catch (err) {
        console.error("Network error during signup:", err)
        setError("Network error. Please check your connection.")
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
            placeholder="name@example.com"
            required
          />

          <InputText
            label="Password"
            type="password"
            id="password"
            name="password"
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
            href="/signup"
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
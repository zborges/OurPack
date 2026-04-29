"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
 
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
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  )
}
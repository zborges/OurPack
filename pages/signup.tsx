import { useState } from 'react'
import { useRouter } from 'next/router'
 
export default function SignupPage() {
  const router = useRouter()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
 
  async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const passwordConfirmation = formData.get('passwordConfirmation')

    if (password !== passwordConfirmation) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      console.log(JSON.stringify({ name, email, password }))
      const data = await response.json()
      console.log(data)

      if (response.ok) {
        console.log("Signup successful:", data)
        router.push('/profile')
      } else {
        // Handle specific error status codes
        if (response.status === 409) {
          setError("User already exists with this email")
        } else if (response.status === 400) {
          setError(data.error || "Invalid input")
        } else {
          setError("Signup failed. Please try again.")
        }
        setLoading(false)
      }
    } catch (err) {
      console.error("Network error during signup:", err)
      setError("Network error. Please check your connection.")
      setLoading(false)
    }
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <input type="name" name="name" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <input type="passwordConfirmation" name="passwordConfirmation" placeholder="Confirm Password" required />
      <button type="submit">Signup</button>
    </form>
  )
}
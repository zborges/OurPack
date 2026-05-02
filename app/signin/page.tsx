"use client"

import { useState } from 'react'
import { SignInModal } from '../components/SignInModal'
import { SignUpModal } from '../components/SignUpModal'

export default function SignInPage() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-4 px-8 flex justify-end">
        <button
          onClick={() => setIsSignInModalOpen(true)}
          className="text-lg font-semibold text-black hover:underline"
        >
          Sign in
        </button>
      </header>
      <header className="py-4 px-8 flex justify-end">
        <button
          onClick={() => setIsSignUpModalOpen(true)}
          className="text-lg font-semibold text-black hover:underline"
        >
          Sign up
        </button>
      </header>

      {/* Modal */}
      <SignInModal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)} />
      <SignUpModal isOpen={isSignUpModalOpen} onClose={() => setIsSignUpModalOpen(false)} />
    </div>
  )
}

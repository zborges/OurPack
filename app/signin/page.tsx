"use client"

import { useState } from 'react'
import { SignInModal } from '../components/SignInModal'

export default function SignInPage() {
  const [isModalOpen, setIsModalOpen] = useState(true)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-4 px-8 flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-lg font-semibold text-black hover:underline"
        >
          Log in
        </button>
      </header>

      {/* Modal */}
      <SignInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="border-b border-border py-4">
      <nav className="flex gap-4 justify-center">
        <Link to="/" className="text-text hover:text-text-h">
          Home
        </Link>
        <Link to="/" className="text-text hover:text-text-h">
          Sign In
        </Link>
        <Link to="/sign-up" className="text-text hover:text-text-h">
          Sign Up
        </Link>
      </nav>
    </header>
  )
}

import { Outlet, createRootRoute } from '@tanstack/react-router'
import Header from '../components/header'
import Footer from '../components/footer'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="min-h-screen bg-bg text-text font-sans">
      <div className="max-w-[1126px] mx-auto px-4 border-x border-border min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

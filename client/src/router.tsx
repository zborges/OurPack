import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import SignIn from './routes/auth/-sign-in'
import SignUp from './routes/auth/-sign-up'

const rootRoute = createRootRoute()

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sign-in',
  component: SignIn,
})

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sign-up',
  component: SignUp,
})

const routeTree = rootRoute.addChildren([signInRoute, signUpRoute])

const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default router;
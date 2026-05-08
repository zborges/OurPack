import '@testing-library/jest-dom'

// jest-fetch-mock setup
const fetchMock = require('jest-fetch-mock')
fetchMock.enableMocks()

// MSW server setup for tests that need it (only in e2e environment)
if (typeof globalThis.Request !== 'undefined' && process.env.E2E_TEST) {
  const { setupServer } = require('msw/node')
  const { handlers: serverHandlers } = require('./__tests__/mocks/handlers')

  globalThis.server = setupServer(...serverHandlers)

  beforeAll(() => globalThis.server.listen({ onUnhandledRequest: 'bypass' }))
  afterEach(() => globalThis.server.resetHandlers())
  afterAll(() => globalThis.server.close())
}

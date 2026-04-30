import '@testing-library/jest-dom';

// MSW server setup for tests that need it
if (typeof globalThis.Request !== 'undefined') {
  const { setupServer } = require('msw/node');
  const { handlers: serverHandlers } = require('./__tests__/mocks/handlers');

  globalThis.server = setupServer(...serverHandlers);

  beforeAll(() => globalThis.server.listen({ onUnhandledRequest: 'bypass' }));
  afterEach(() => globalThis.server.resetHandlers());
  afterAll(() => globalThis.server.close());
}

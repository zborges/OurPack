import { render, RenderOptions } from '@testing-library/react'
import { ReactElement, ReactNode } from 'react'

// Polyfill for TextEncoder (required by pg/drizzle)
import { TextEncoder, TextDecoder } from 'util'

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  wrapper?: React.ComponentType<{ children: ReactNode }>;
}

export function allTheProviders({ children }: { children: ReactNode }) {
  return <>{children}</>
}

const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions,
) => render(ui, { wrapper: allTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Dummy test to prevent empty file error
describe('test-utils', () => {
  it('exports render', () => {
    expect(render).toBeDefined()
  })
})

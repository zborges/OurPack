import { render, RenderOptions } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';

// Polyfill for TextEncoder (required by pg/drizzle)
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder } = require('util');
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  const { TextDecoder } = require('util');
  global.TextDecoder = TextDecoder;
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  wrapper?: React.ComponentType<{ children: ReactNode }>;
}

export function allTheProviders({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions
) => render(ui, { wrapper: allTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

// Dummy test to prevent empty file error
describe('test-utils', () => {
  it('exports render', () => {
    expect(render).toBeDefined();
  });
});

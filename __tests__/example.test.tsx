import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';

describe('Example', () => {
  it('renders correctly', () => {
    render(<div>Test</div>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});

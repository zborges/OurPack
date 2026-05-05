import { render, screen } from '../test-utils';
import { describe, it, expect } from '@jest/globals';
import { WeightGraph } from '@/app/components/gear/WeightGraph';

describe('WeightGraph', () => {
  it('renders empty state when no items', () => {
    render(<WeightGraph categoryWeights={[]} totalWeight={0} />);
    expect(screen.getByText('Weight Distribution')).toBeInTheDocument();
    expect(screen.getByText('Add items to see weight distribution')).toBeInTheDocument();
  });

  it('renders weight distribution with items', () => {
    const categoryWeights = [
      { category: 'shelter', totalWeight: 2.5, itemCount: 3 },
      { category: 'clothing', totalWeight: 1.5, itemCount: 2 },
    ];
    render(<WeightGraph categoryWeights={categoryWeights} totalWeight={4} />);

    expect(screen.getByText('Weight Distribution')).toBeInTheDocument();
    expect(screen.getByText('Shelter')).toBeInTheDocument();
    expect(screen.getByText('Clothing')).toBeInTheDocument();
    expect(screen.getByText('4.00 lbs')).toBeInTheDocument();
  });

  it('displays correct percentages', () => {
    const categoryWeights = [
      { category: 'shelter', totalWeight: 5, itemCount: 1 },
      { category: 'clothing', totalWeight: 5, itemCount: 1 },
    ];
    render(<WeightGraph categoryWeights={categoryWeights} totalWeight={10} />);

    // Each category should be 50% - use getAllByText since both are displayed
    const percentElements = screen.getAllByText(/50\.0%/);
    expect(percentElements.length).toBe(2);
  });

  it('sorts categories by weight descending', () => {
    const categoryWeights = [
      { category: 'miscellaneous', totalWeight: 1, itemCount: 1 },
      { category: 'shelter', totalWeight: 5, itemCount: 1 },
      { category: 'clothing', totalWeight: 3, itemCount: 1 },
    ];
    render(<WeightGraph categoryWeights={categoryWeights} totalWeight={9} />);

    const labels = screen.getAllByText(/lbs/);
    // Total weight displayed last
    expect(labels[labels.length - 1]).toHaveTextContent('9.00 lbs');
  });
});
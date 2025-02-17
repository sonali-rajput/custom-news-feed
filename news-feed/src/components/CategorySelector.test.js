import React from 'react'
import {render, screen} from '@testing-library/react'
import CategorySelector from './CategorySelector'

describe('CategorySelector Component', () => {
    it('should render the "Select News Categories" heading', () => {
        render(<CategorySelector
        selectedCategories={[]}
        onCategoryChange={() => {}} // Mock function for onCategoryChange prop
        />);

        // Assertion: check if the heading text is in the document
        const headingElement = screen.getByRole('heading', { name: /Select News Categories/i }); // use RTL screen to find the heading
        expect(headingElement).toBeInTheDocument(); // Use jest's expect to assert that the heading element is in the document
    });
});
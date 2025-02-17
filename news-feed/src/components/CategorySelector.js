import React from 'react';

function CategorySelector(props) { // now accepts props


    const { selectedCategories, onCategoryChange } = props; // Destructure props

    const availableCategories = [
        "politics",
        "sports",
        "technology",
        "business",
        "entertainment",
        "health",
        "science",
        "world News"
    ];

    const handleCheckBoxChange = (category) => { // Renamed function to avoid confusion
        let updatedCategories = [...selectedCategories]; // create a coopy to avoid direct state mutation
        if (updatedCategories.includes(category)) {
            updatedCategories = updatedCategories.filter(selectedCat => selectedCat !== category);
        } else {
            updatedCategories = [...updatedCategories, category];
        }
        onCategoryChange(updatedCategories); // call the onCategoryChange prop (passed from App) to update state in App
    };


    return (
        <div className="category-selector">
            <h2>Select News Categories</h2>
            <div className="checkbox-group">
                {availableCategories.map((category) => (
                    <div key={category} className="checkbox-item">
                        <input
                        type="checkbox"
                        id={category}
                        name="categories"
                        value={category}
                        checked={selectedCategories.includes(category)} // now uses selecteCategories prop
                        onChange={() => handleCheckBoxChange(category)} // call handleCheckBox on change, onChange is an event handler
                        />
                        <label htmlFor={category}>{category}</label>
                        </div>
                ))}
            </div>
            <p>Selected Categories: {selectedCategories.join(', ') || 'None'}</p> {/* display selected categories */}
        </div>
    );
}

export default CategorySelector;
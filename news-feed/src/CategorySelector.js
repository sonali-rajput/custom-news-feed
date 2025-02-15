import React, { useState } from 'react';

function CategorySelector(props) { // now accepts props

    // 1. Define categories 
    // const availableCategories = [
    //     "Politics",
    //     "Sports",
    //     "Technology",
    //     "Business",
    //     "Entertainment",
    //     "Health",
    //     "Science",
    //     "World News"
    // ];


    const { selectedCategories, onCategoryChange } = props; // Destructure props

    const availableCategories = [/*... same categories array */];

    const handleCheckBoxChange = (category) => { // Renamed function to avoid confusion
        let updatedCategories = [...selectedCategories]; // create a coopy to avoid direct state mutation
        if (updatedCategories.includes(category)) {
            updatedCategories = updatedCategories.filter(selectedCat => selectedCat !== category);
        } else {
            updatedCategories = [...updatedCategories, category];
        }
        onCategoryChange(updatedCategories); // call the onCategoryChange prop (passed from App) to update state in App
    };

    // 2. State to select manage selected categories
    // const [selectedCategories, setSelectedCategories] = useState([]); // Initially no categories are selected, 
    //                                                                   // selectedCategories is state variable name, setSelectedCategories is the function
    // // Function to handle checkbox changes
    // const handleCategoryChange = (category) => {
    //     if (selectedCategories.includes(category)) {
    //         // if category is already selected, remove it
    //         setSelectedCategories(selectedCategories.filter(selectCat => selectCat !== category));
    //     } else {
    //         // if category is not selected, add it
    //         setSelectedCategories([...selectedCategories, category]); // Important: Always update state in React by creating new arrays or objects, 
    //                                                                   // not by modifying the existing state directly.
    //     }
    // };



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
                        checked={selectedCategories.includes(category)} // checkbox is checked if category is in selectedCategories
                        onChange={() => handleCategoryChange(category)} // call handleCategoryChange on change, onChange is an event handler
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
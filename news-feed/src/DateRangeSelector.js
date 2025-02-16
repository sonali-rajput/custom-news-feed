import React, { useState } from 'react';

function DateRangeSelector(props) { // now accept props

    const {fromDate, toDate, onFromDateChange, onToDateChange } = props; // destrcuture props

    // Function to handle Changes in the "From Date" input
    const handleFromInputChange = (event) => {
        onFromDateChange(event.target.value); // Call onFromDateChange prop to update state in App
    };

     // Function to handle Changes in the "To Date" input
     const handleToInputChange = (event) => {
        onToDateChange(event.target.value); // Call onToDateChange prop to update state in App
    };


    return (
        <div className="date-range-selector">
            <h2>Select Date Range (Optional)</h2>
            <div className="date-inputs">
                <div className="date-input-item">
                    <label htmlFor='fromDate'>From Date: (YYYY-MM-DD):</label>
                    <input
                    type='text' // for now use type 'text' can use type 'date' later.
                    id='fromDate'
                    name='fromDate'
                    value={fromDate}  // now uses fromDate prop
                    onChange={handleFromInputChange} // Call handleFromInputChange for input change
                    placeholder='YYYY-MM-DD'
                    />
                </div>
                <div className='date-input-item'>
                <label htmlFor='fromDate'>To Date: (YYYY-MM-DD):</label>
                    <input
                    type='text' // for now use type 'text' can use type 'date' later.
                    id='toDate'
                    name='toDate'
                    value={toDate}  // now uses toDate prop
                    onChange={handleToInputChange} // Call handleToInputChange for input change
                    placeholder='YYYY-MM-DD'
                    />
                </div>
            </div>
           <p>Selected Date Range: From: {fromDate || 'Not set'}, To: {toDate || 'Not set'}</p> {/* Display selected dates */}
        </div>
    );
}

export default DateRangeSelector;
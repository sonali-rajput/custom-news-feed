import React, { useState } from 'react';

function DateRangeSelector() {

    // State variable for fromDate and toDate
    const [fromDate, setFromDate] = useState(''); // Initialize with empty strings
    const [toDate, setToDate] = useState('');

    // Function to handle Changes in the "From Date" input
    const handleFromDateChange = (event) => {
        setFromDate(event.target.value); // Update fromDate state with the input value
    };

     // Function to handle Changes in the "To Date" input
     const handleToDateChange = (event) => {
        setToDate(event.target.value); // Update toDate state with the input value
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
                    value={fromDate}  // Input value is controlled by fromDate state
                    onChange={handleFromDateChange} // Call handleFromDateChange for input change
                    placeholder='YYYY-MM-DD'
                    />
                </div>
                <div className='date-input-item'>
                <label htmlFor='fromDate'>To Date: (YYYY-MM-DD):</label>
                    <input
                    type='text' // for now use type 'text' can use type 'date' later.
                    id='toDate'
                    name='toDate'
                    value={toDate}  // Input value is controlled by fromDate state
                    onChange={handleToDateChange} // Call handleFromDateChange for input change
                    placeholder='YYYY-MM-DD'
                    />
                </div>
            </div>
           <p>Selected Date Range: From: {fromDate || 'Not set'}, To: {toDate || 'Not set'}</p> {/* Display selected dates */}
        </div>
    );
}

export default DateRangeSelector;
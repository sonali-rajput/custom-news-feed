import React, { useState, useEffect } from 'react'
import CategorySelector from './CategorySelector';
import DateRangeSelector from './DateRangeSelector';
import NewsArticleList from './NewsArticleList';

function App() {
  // Dummy News Article Data
  // const DummyNewsArticles = [
  //   {
  //     title: "Tech Company Announces Groundbreaking Innovation",
  //     description: "A major tech company has unveiled a revolutionary new technology that could change the industry.",
  //     source: "Tech News Source",
  //     url:"https://technewssource.com/innovation-announcement",
  //   },
  //   {
  //     title: "Sports Team Wins Championship After Thrilling Game",
  //     description: "In a nail-biting final, the home team clinched the championship title with a last-minute goal.",
  //     source: "Sports Daily",
  //     url: "https://sportsdaily.com/championship-win-report",
  //   },
  //   {
  //     title: "Political Leaders Meet for International Summit",
  //     description: "World leaders gathered for a crucial summit to discuss global challenges and cooperation.",
  //     source: "Global News Network",
  //     url: "https://globalnewsnetwork.org/international-summit-updates",
  //   },
  // ];

  // ---Lifted state from categorySelector and dataRangeselector ---
  const [selectedCategories, setSelectedCategories] = useState([]); // state for selected categories (initially empty)
  const [fromDate, setFromDate] = useState('');                     // state for fromDate
  const [toDate, setToDate] = useState('');                         // state for toDate
  const [newsArticles, setNewsArticles] = useState([]);             // New state to store fetched news articles (initially empty)


  // --- Function to fetch news from API ---
  const fetchNews = async () => { // make it as an async function
    let apiUrl = 'http://127.0.0.1:5000/news/categories'; // Base API URL

    if (selectedCategories.length > 0) {
      apiUrl += `/${selectedCategories.join(',')}`; // Add categories to url path
    }
    else {
      apiUrl += `/general`; // Or default to 'general' if no categories selected
    }


    // Add date range query parameters if dates are selected
    if(fromDate) {
      apiUrl += `?from_date=${fromDate}`;
    }
    if (toDate) {
      apiUrl += `${fromDate ? '&' : '?'}to_date=${toDate}`; // Add '&' if fromDate already present, otherwise '?'
    }

    try {
      const response = await fetch(apiUrl); // use await to wait for the fetch to complete
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // parse json response
      setNewsArticles(data.articles || []); // update newsArticels state with API data (or empty array if no articles)
    } catch(error) {
      console.error("Error fetching news: ", error);
      setNewsArticles([]); // Set newsArticles to empty array in case of error 
    }
  };


  // --- useEffect Hook to fetch News when selection change ---
  useEffect( () => {
    fetchNews(); // Call fetch news function whenever dependencies change
  }, [selectedCategories, fromDate, toDate]); // dependencies: fetch news is called when these change


  // ---Handels to change state from child components---
  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories); // update selectedCategories state in App.js
  };

  const handleFromDateChange = (date) => {
    setFromDate(date); // update fromDate state in App.js
  };

  const handleToDateChange = (date) => {
    setToDate(date); // update toDate state in App.js
  };



  return (
    <div className="App" >
      <header className='App-header'>
        <h1>Custom News Feed</h1>
      </header>
      <main>
        {/* Passing Props to Child Components */}
        <CategorySelector
        selectedCategories={selectedCategories} // Pass selectedCategories state as prop
        onCategoryChange={handleCategoryChange} // Pass handleCategoryChange function as prop
        />
        <DateRangeSelector
        fromDate={fromDate} // Pass fromDate state as prop
        toDate={toDate}     // Pass toDate state as prop
        onFromDateChange={handleFromDateChange} // Pass handleFromDateChange fn as prop
        onToDateChanfe={handleToDateChange}     // Pass handleToDateChange fn as prop
        />
        <NewsArticleList articles={newsArticles} /> {/* Pass newsArticle state as props, Props are how we pass data from a parent component (like App) to a child component*/}
      </main>
      <footer>
        {/* We can add footer later */}
      </footer>
    </div>
  );
}

export default App; 

// when you create a component in a separate file, 
// you need to explicitly tell JavaScript to make that component function available for use in other files (like App.js).  
// This is done using the export default
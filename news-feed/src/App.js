import React from 'react'
import CategorySelector from './CategorySelector';
import DateRangeSelector from './DateRangeSelector';
import NewsArticleList from './NewsArticleList';

function App() {
  return (
    <div className="App" >
      <header className='App-header'>
        <h1>Custom News Feed</h1>
      </header>
      <main>
        <CategorySelector/>
        <DateRangeSelector/>
        <NewsArticleList/>
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
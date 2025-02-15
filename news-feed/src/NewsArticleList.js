import React from 'react';
import NewsArticle from './NewsArticle';

function NewsArticleList(props) { // props will recieve the articles array
    const { articles } = props;
    return (
        <div className='news-article-list'>
            <h2>News Articles</h2>
            {articles.map((article, index) => ( // Map over the articles array
                <NewsArticle key={index} article={article} /> // Render NewsArticle for each article
            
            ))}
        </div>
    );
}

export default NewsArticleList; 

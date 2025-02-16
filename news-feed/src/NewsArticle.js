import React from 'react'

function NewsArticle(props) {  // Props are an object containing data passed down from parent components.
    const { article } = props; // Destructure props to get article, 

    return (
        <div className='news-article'>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <p>Source: {article.source.name}</p>
            <p><a href={article.url} target="_blank" rel="noopener noreferrer">Read Full Article</a></p>
            <hr/> {/*horizontal line */}
        </div>
    );
}

export default NewsArticle;
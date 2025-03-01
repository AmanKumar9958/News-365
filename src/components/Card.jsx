import React from 'react';

const Card = ({ data }) => {
    const fallbackImage = 'https://via.placeholder.com/300x150?text=Image+Not+Found';

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
            {data.map((news, index) => {
                const formattedDate = new Date(news.publishedAt).toLocaleDateString('en-GB');
                if (!news.urlToImage) return null;

                return (
                    <div key={index} className='bg-gray-700 p-4 rounded-md w-full max-w-xs mx-auto sm:mx-0'>
                        <img 
                            src={news.urlToImage || fallbackImage} 
                            alt={news.title} 
                            className='w-full h-48 md:h-40 object-cover rounded-md mb-4'
                            onError={(e) => { e.target.src = fallbackImage; }}
                        />
                        <div className='space-y-2'>
                            <h2 className='text-lg font-bold line-clamp-2'>{news.title}</h2>
                            <p className='text-gray-300 text-sm line-clamp-3'>{news.description}</p>
                            <div className='text-xs text-gray-400 space-y-1'>
                                {news.author && <p>By {news.author}</p>}
                                {news.source?.name && <p>Source: {news.source.name}</p>}
                                <p>Published: {formattedDate}</p>
                            </div>
                            <a 
                                href={news.url} 
                                target='_blank' 
                                rel='noreferrer' 
                                className='inline-block text-blue-500 hover:text-blue-400 text-sm font-medium mt-2'
                            >
                                Read more →
                            </a>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Card;
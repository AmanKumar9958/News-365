import React from 'react'

const Card = ({data}) => {
    return (
        <div className='flex flex-wrap justify-center gap-4'>
            {data.map((news, index) => {
                const formattedDate = new Date(news.publishedAt).toLocaleDateString('en-GB');
                if(news.urlToImage === null){
                    return null;
                }
                else{
                    return (
                        <div key={index} className='bg-gray-700 p-4 m-4 rounded-md w-2xs h-fit max-w-2xs'>
                            <img src={news.urlToImage} alt={news.title} className='w-full h-40 object-cover rounded-md'/>
                            <div className='p-4'>
                                <h2 className='text-xl font-bold'>{news.title}</h2>
                                <p className='text-gray-300'>{news.description}</p>
                                <p className='text-gray-400'>{news.author}</p>
                                <p className='text-gray-400'>{news.source.name}</p>
                                <p className='text-gray-400'>{formattedDate}</p>
                                <a href={news.url} target='_blank' rel='noreferrer' className='text-blue-500 hover:scale-105 transition-all'>Read more</a>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default Card
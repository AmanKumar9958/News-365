import React, { useEffect, useState } from 'react'
import '../index.css'
import './Spinner.css'
import Card from './Card'

const NewsApp = () => {
    const API_KEY = "89e96a56483a483a8cc30e914fac2744";
    const [search, setSearch] = useState("India");
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalResults, setTotalResults] = useState(0);
    const [initialLoad, setInitialLoad] = useState(true);

    const getData = async (query, pageNumber = 1) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://newsapi.org/v2/everything?q=${query}&pageSize=${pageSize}&page=${pageNumber}&apiKey=${API_KEY}`
            );
            const data = await response.json();
            
            if(data.status === "ok") {
                if(pageNumber > 1) {
                    setNews(prev => [...prev, ...data.articles]);
                } else {
                    setNews(data.articles);
                }
                setTotalResults(data.totalResults);
            }
        } catch (error) {
            console.error("Error fetching news:", error);
        }
        setLoading(false);
        if(initialLoad) setInitialLoad(false);
    }

    useEffect(() => {
        getData(search, page);
    }, [page]);

    const handleInput = (e) => setSearch(e.target.value);

    const handleSearch = () => {
        if(search.trim()) {
            setPage(1);
            getData(search, 1);
        }
    }

    const categorySearch = (category) => {
        setPage(1);
        setSearch(category);
        getData(category, 1);
    }

    const loadMore = () => {
        setPage(prev => prev + 1);
        setLoading(true);
    }

    return (
        <div className='min-h-screen w-full bg-gray-800 text-white'>
            <nav className='flex flex-col md:flex-row justify-between items-center p-2 md:p-4 border-b-2 border-gray-600 gap-4'>
                <div>
                    <h1 className='text-2xl md:text-4xl font-bold text-center cursor-pointer'>News-365</h1>
                </div>
                
                <div className='flex flex-col md:flex-row justify-center items-center gap-2 w-full md:w-auto'>
                    <input 
                        type="text" 
                        placeholder='Search News..' 
                        value={search} 
                        className='bg-gray-600 rounded-md p-2 w-full md:w-64 transition-all hover:outline-1 hover:outline-blue-600' 
                        onChange={handleInput}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button 
                        className='cursor-pointer bg-blue-600 p-2 rounded-md w-full md:w-auto px-4'
                        onClick={handleSearch}
                        disabled={loading}
                    >
                        {loading && page === 1 ? 'Searching...' : 'Search'}
                    </button>
                </div>
                
                <div className='w-full md:w-auto'>
                    <button className='cursor-pointer bg-blue-600 p-2 rounded-md w-full md:w-auto px-4'>
                        Toggle Theme
                    </button>
                </div>
            </nav>

            <div className='text-center p-4'>
                <h2 className='text-xl md:text-2xl font-bold'>Get the latest news from around the world</h2>
            </div>

            <div>
                <ul className='flex flex-wrap justify-center gap-2 md:gap-4 p-2 mt-2'>
                    {["fitness", "health", "entertainment", "politics", "sports"].map((category) => (
                        <button 
                            key={category}
                            onClick={() => categorySearch(category)}
                            className={`rounded-xl p-2 font-bold cursor-pointer hover:scale-110 transition-all text-sm md:text-base ${
                                category === 'fitness' ? 'bg-red-500' :
                                category === 'health' ? 'bg-blue-600' :
                                category === 'entertainment' ? 'bg-yellow-400' :
                                category === 'politics' ? 'bg-emerald-600' :
                                'bg-green-400'
                            }`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </ul>
            </div>

            <div className='min-h-screen'>
                {initialLoad ? (
                    <div className='flex justify-center items-center min-h-screen'>
                        <div className='spinner'></div>
                    </div>
                ) : (
                    <>
                        {news.length === 0 ? (
                            <div className='text-center text-xl mt-8'>
                                No articles found. Try a different search.
                            </div>
                        ) : (
                            <>
                                <Card data={news} />
                                {news.length < totalResults && (
                                    <div className='flex justify-center'>
                                        <button 
                                            onClick={loadMore}
                                            disabled={loading}
                                            className='bg-blue-600 px-6 py-2 rounded-md mb-5 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                                        >
                                            {loading ? 'Loading...' : 'Load More'}
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default NewsApp
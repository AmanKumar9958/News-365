import React, { useEffect, useState } from 'react'
import '../index.css'
import './Spinner.css'
import Card from './Card'

const NewsApp = () => {
    const API_Key = import.meta.env.VITE_NEWS_API_KEY;
    const [search, setSearch] = useState("India");
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = async(query) => {
        setLoading(true);
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_Key}`);
            const data = await response.json();
            setNews(data.articles || []);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getData(search);
    }, []);

    const handleInput = (e) => setSearch(e.target.value);

    const categorySearch = (e) => {
        getData(e.target.value);
        setSearch(e.target.value);
    }

    return (
        <div className='min-h-screen w-full bg-gray-800 text-white'>
            <nav className='flex flex-col md:flex-row justify-between items-center p-2 md:p-4 border-b-2 border-gray-600 gap-4'>
                <div>
                    <h1 className='text-2xl md:text-4xl font-bold text-center cursor-pointer'>Newsly</h1>
                </div>
                
                <div className='flex flex-col md:flex-row justify-center items-center gap-2 w-full md:w-auto'>
                    <input 
                        type="text" 
                        placeholder='Search News..' 
                        value={search} 
                        className='bg-gray-600 rounded-md p-2 w-full md:w-64 transition-all hover:outline-1 hover:outline-blue-600' 
                        onChange={handleInput}
                    />
                    <button 
                        className='cursor-pointer bg-blue-600 p-2 rounded-md w-full md:w-auto px-4'
                        onClick={() => getData(search)}
                    >
                        Search
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
                            onClick={categorySearch} 
                            value={category}
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
                {loading ? (
                    <div className='flex justify-center items-center min-h-screen'>
                        <div className='spinner'></div>
                    </div>
                ) : <Card data={news} />}
            </div>
        </div>
    )
}

export default NewsApp
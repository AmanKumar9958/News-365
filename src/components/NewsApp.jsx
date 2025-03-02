import React, { useEffect, useState } from 'react';
import '../index.css';
import './Spinner.css';
import Card from './Card';

const NewsApp = () => {
    const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
    const [search, setSearch] = useState("India");
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const [darkMode, setDarkMode] = useState(false);
    const toggleMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    }

    const getData = async (query) => {
        setLoading(true);
        try {
            const response = await fetch(`https://gnews.io/api/v4/search?q=${query}&lang=en&country=in&max=10&apikey=${API_KEY}`);
            const data = await response.json();
            if (data.articles) {
                setNews(data.articles);
                setTotalResults(data.totalResults);
            } else {
                setNews([]);
                console.error("Error: ", data.message || "No articles found");
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            setNews([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        getData(search);
    }, []);

    const handleInput = (e) => setSearch(e.target.value);
    const handleSearch = () => {
        if(search.trim() === ""){
            return;
        } else{
            getData(search)
        }
    }
    const categorySearch = (e) => {
        setSearch(e.target.value);
        getData(e.target.value);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };
    

    return (
        <div className='min-h-screen w-full bg-white text-gray-800 dark:bg-gray-800 dark:text-white transition duration-500'>
            <nav className='flex flex-col md:flex-row justify-between items-center p-4 border-b-2 border-gray-600'>
                <h1 className='text-2xl md:text-4xl font-bold cursor-pointer'>News-365</h1>

                <div className='flex gap-2'>
                    <input 
                        type="text" 
                        placeholder='Search News..' 
                        value={search} 
                        className='bg-white border-1 border-black dark:text-white dark:bg-gray-900 dark:border-white rounded-md p-2 w-64 transition hover:outline-1 hover:outline-blue-600' 
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                    />
                    <button className='bg-blue-600 p-2 rounded-md px-4 font-bold text-white' onClick={handleSearch}>
                        Search
                    </button>
                </div>
                <div>
                    <button className='bg-blue-600 p-1 rounded-md font-bold text-white text-2xl' onClick={toggleMode}>
                        {darkMode ? '🔆' : '🌙'}
                    </button>
                </div>
            </nav>

            <div className='text-center p-4'>
                <h2 className='text-xl md:text-2xl font-bold'>Get the latest news from around the world</h2>
            </div>

            <div className='flex justify-center gap-4 p-4'>
                {["fitness", "health", "entertainment", "politics", "sports"].map((category) => (
                    <button 
                        key={category}
                        onClick={categorySearch} 
                        value={category}
                        className={`rounded-xl p-2 font-bold text-sm md:text-base ${
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
            </div>

            <div className='min-h-screen'>
                {loading ? (
                    <div className='flex justify-center items-center min-h-screen'>
                        <div className='spinner'></div>
                    </div>
                ) : (
                    <Card data={news} />
                )}
            </div>
        </div>
    );
};

export default NewsApp;

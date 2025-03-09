// NewsApp.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        <div className='min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300'>
            <nav className='flex flex-col md:flex-row justify-between items-center p-6 bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-gray-800 dark:to-gray-700 text-white shadow-lg'>
                <motion.h1 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className='text-3xl font-bold cursor-pointer mb-4 md:mb-0'
                >
                    News-365 📢
                </motion.h1>

                <div className='flex items-center gap-4'>
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className='relative flex-1'
                    >
                        <input 
                            type="text" 
                            placeholder='Search News...' 
                            value={search} 
                            className='w-64 px-4 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-cyan-300 placeholder:text-white/80 transition-all'
                            onChange={handleInput}
                            onKeyDown={handleKeyDown}
                        />
                    </motion.div>
                    
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className='p-3 bg-cyan-400 hover:bg-cyan-300 text-gray-900 rounded-full shadow-md'
                        onClick={toggleMode}
                    >
                        {darkMode ? '🌞' : '🌙'}
                    </motion.button>
                </div>
            </nav>

            <div className='text-center p-8'>
                <motion.h2 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent'
                >
                    Stay Informed with Global Headlines
                </motion.h2>
            </div>

            <div className='flex justify-center gap-4 p-4 flex-wrap'>
                {["fitness", "health", "entertainment", "politics", "sports"].map((category) => (
                    <motion.button 
                        key={category}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={categorySearch} 
                        value={category}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors
                            ${
                                category === 'fitness' ? 'bg-rose-100 text-rose-600 hover:bg-rose-200 dark:bg-rose-800/30 dark:text-rose-300' :
                                category === 'health' ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200 dark:bg-emerald-800/30 dark:text-emerald-300' :
                                category === 'entertainment' ? 'bg-amber-100 text-amber-600 hover:bg-amber-200 dark:bg-amber-800/30 dark:text-amber-300' :
                                category === 'politics' ? 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200 dark:bg-indigo-800/30 dark:text-indigo-300' :
                                'bg-teal-100 text-teal-600 hover:bg-teal-200 dark:bg-teal-800/30 dark:text-teal-300'
                            }`}
                    >
                        #{category}
                    </motion.button>
                ))}
            </div>

            <div className='min-h-screen p-6'>
                {loading ? (
                    <div className='flex justify-center items-center min-h-screen'>
                        <motion.div
                            className='w-20 h-20 rounded-full border-4 border-dashed border-cyan-500 animate-spin'
                            style={{ borderTopColor: 'transparent' }}
                        />
                    </div>
                ) : (
                    <Card data={news} />
                )}
            </div>
        </div>
    );
};

export default NewsApp;
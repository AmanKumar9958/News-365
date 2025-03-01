import React, { useEffect, useState } from 'react'
import '../index.css'
import './Spinner.css' // Import the spinner CSS

import Card from './Card'

const NewsApp = () => {
    const API_Key = "89e96a56483a483a8cc30e914fac2744";
    const [search, setSearch] = useState("India");
    const [news, setNews] = useState([]); // Initialize to an empty array
    const [loading, setLoading] = useState(false); // Add loading state

    // Fetch news data from API
    const getData = async(query) => {
        setLoading(true); // Set loading to true before fetching data
        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_Key}`);
        const data = await response.json();
        setNews(data.articles);
        setLoading(false); // Set loading to false after fetching data
    }

    // Fetch news on initial load
    useEffect(() => {
        getData(search);
    }, []);

    // Handle input from search box
    const handleInput = (e) => {
        setSearch(e.target.value);
    }

    // Search news by category
    const categorySearch = (e) => {
        getData(e.target.value);
        setSearch(e.target.value);
    }

    return (
        <div className='min-h-screen w-full bg-gray-800 text-white'>
            <nav className='flex justify-between items-center p-4 border-b-2 border-gray-600'>
                {/* logo */}
                <div>
                    <h1 className='text-4xl font-bold text-center cursor-pointer'>Newsly</h1>
                </div>
                {/* search-box */}
                <div className='flex justify-between items-center gap-4'>
                    <input type="text" placeholder='Search News..' value={search} className='bg-gray-600 rounded-md p-2 transition-all hover:outline-1 hover:outline-blue-600' onChange={handleInput}/>
                    <button className='cursor-pointer bg-blue-600 p-2 rounded-md' onClick={() => getData(search)}>Search</button>
                </div>
                {/* theme toggle button */}
                <div>
                    <button className='cursor-pointer bg-blue-600 p-2 rounded-md'>Toggle Theme</button>
                </div>
            </nav>
            {/* tagline */}
            <div className='text-center p-4'>
                <h2 className='text-2xl font-bold'>Get the latest news from around the world</h2>
            </div>
            {/* categories */}
            <div>
                <ul className='flex items-center justify-center gap-8 p-2 mt-2'>
                    <button onClick={categorySearch} value={"fitness"} className='rounded-xl bg-red-500 p-2 font-bold cursor-pointer hover:scale-110 transition-all'>Fitness</button>
                    <button onClick={categorySearch} value={"health"} className='rounded-xl bg-blue-600 p-2 font-bold cursor-pointer hover:scale-110 transition-all'>Health</button>
                    <button onClick={categorySearch} value={"entertainment"} className='rounded-xl bg-yellow-400 p-2 font-bold cursor-pointer hover:scale-110 transition-all'>Entertainment</button>
                    <button onClick={categorySearch} value={"politics"} className='rounded-xl bg-emerald-600 p-2 font-bold cursor-pointer hover:scale-110 transition-all'>Politics</button>
                    <button onClick={categorySearch} value={"sports"} className='rounded-xl bg-green-400 p-2 font-bold cursor-pointer hover:scale-110 transition-all'>Sports</button>
                </ul>
            </div>

            {/* card */}
            {loading ? <div className='spinner'></div> : <Card data={news} />}
        </div>
    )
}

export default NewsApp
import React from 'react'
import '../index.css'
import Card from './Card'

const NewsApp = () => {

    const API_Key = "89e96a56483a483a8cc30e914fac2744";
    const getData = async() => {
        const response = await fetch(`https://newsapi.org/v2/everything?q=India&apiKey=${API_Key}`);
        const data = await response.json();
        console.log(data);
    }

    return (
        <div className='h-screen w-full bg-gray-800 text-white'>
            <nav className='flex justify-between items-center p-4 border-b-2 border-gray-600'>
                {/* logo */}
                <div>
                    <h1 className='text-4xl font-bold text-center cursor-pointer'>Newsly</h1>
                </div>
                {/* topics */}
                <div>
                    <ul className='flex justify-between items-center gap-2'>
                        <li>All news</li>
                        <li>Trending</li>
                    </ul>
                </div>
                {/* search-box */}
                <div className='flex justify-between items-center gap-4'>
                    <input type="text" placeholder='Search News..' className='bg-gray-600 rounded-md p-2 transition-all hover:outline-1 hover:outline-blue-600'/>
                    <button className='cursor-pointer bg-blue-600 p-2 rounded-md' onClick={getData}>Search</button>
                </div>
            </nav>
            {/* tagline */}
            <div className='text-center p-4'>
                <h2 className='text-2xl font-bold'>Get the latest news from around the world</h2>
            </div>
            {/* categories */}
            <div>
                <ul className='flex items-center justify-center gap-8 p-2 mt-2'>
                    <li className='rounded-xl bg-red-500 p-2 font-bold cursor-pointer hover:scale-110 transition-all'>Fitness</li>
                    <li className='rounded-xl bg-blue-600 p-2 font-bold cursor-pointer hover:scale-110 transition-all'>Health</li>
                    <li className='rounded-xl bg-yellow-400 p-2 font-bold cursor-pointer hover:scale-110 transition-all'>Entertainment</li>
                    <li className='rounded-xl bg-emerald-600 p-2 font-bold cursor-pointer hover:scale-110 transition-all'>Politics</li>
                    <li className='rounded-xl bg-green-400 p-2 font-bold cursor-pointer hover:scale-110 transition-all'>Sports</li>
                </ul>
            </div>

            {/* card */}
            <Card />
        </div>
    )
}

export default NewsApp
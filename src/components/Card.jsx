// Card.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Card = ({ data }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4'>
            <AnimatePresence>
                {data.map((news, index) => {
                    if (!news.image) return null;
                    const formattedDate = new Date(news.publishedAt).toLocaleDateString('en-GB');

                    return (
                        <motion.div 
                            key={index}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{ delay: index * 0.1 }}
                            className='group relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300'
                        >
                            <div className='relative h-48 overflow-hidden'>
                                <img 
                                    src={news.image} 
                                    alt={news.title} 
                                    className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300'
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent' />
                            </div>
                            
                            <div className='p-5 space-y-3'>
                                <h2 className='text-lg font-bold text-gray-800 dark:text-white line-clamp-2'>
                                    {news.title}
                                </h2>
                                <p className='text-gray-600 dark:text-gray-300 text-sm line-clamp-3'>
                                    {news.description}
                                </p>
                                
                                <div className='flex justify-between items-center text-xs text-gray-500 dark:text-gray-400'>
                                    <span className='bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 px-2 py-1 rounded'>
                                        {news.source?.name || 'Unknown Source'}
                                    </span>
                                    <span>{formattedDate}</span>
                                </div>
                                
                                <a 
                                    href={news.url} 
                                    target='_blank' 
                                    rel='noreferrer' 
                                    className='inline-flex items-center text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 font-medium mt-2 group'
                                >
                                    Read More
                                    <svg className='w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform' 
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default Card;
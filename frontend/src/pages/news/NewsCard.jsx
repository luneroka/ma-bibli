import React from 'react';
import { Link } from 'react-router-dom';

function NewsCard({ article }) {
  return (
    <>
      <div className='flex gap-[24px]'>
        <div className='flex flex-col w-[225px] gap-[16px]'>
          <Link to={article.url}>
            <img
              src={article.urlToImage}
              alt='News Cover'
              className='h-[150px] cursor-pointer hover:scale-105 transition-all duration-200'
            />
          </Link>
        </div>

        <div className='flex flex-col w-[400px]'>
          <Link to='/'>
            <p className='text-small text-black font-bold h-[28px] mb-[16px] text-wrap'>
              {article.title.length > 100
                ? `${article.title.slice(0, 100)}...`
                : article.title}
            </p>
          </Link>
          <div className='w-12 h-[2px] bg-secondary-btn opacity-75 mb-4'></div>
          <p className='text-small text-black h-[112px] overflow-hidden'>
            {article.description.length > 300
              ? `${article.description.slice(0, 300)}...`
              : article.description}
          </p>
        </div>
      </div>
    </>
  );
}

export default NewsCard;

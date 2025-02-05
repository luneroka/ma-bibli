import React from 'react';
import { Link } from 'react-router-dom';

function NewsCard({ article }) {
  return (
    <>
      <div className='flex gap-[24px]'>
        <div className='flex flex-col w-[127px] gap-[16px]'>
          <Link to='/'>
            <img
              src={article.image}
              alt='Book Cover'
              className='h-[178px] cursor-pointer hover:scale-105 transition-all duration-200 rounded-sm'
            />
          </Link>
        </div>

        <div className='flex flex-col w-[330px]'>
          <Link to='/'>
            <p className='text-small font-bold h-[28px] mb-[16px] text-wrap'>
              {article.title}
            </p>
          </Link>
          <div className='w-12 h-[4px] bg-secondary-btn mb-4'></div>
          <p className='text-small h-[112px] overflow-hidden'>
            {article.description.length > 240
              ? `${article.description.slice(0, 240)}...`
              : article.description}
          </p>
        </div>
      </div>
    </>
  );
}

export default NewsCard;

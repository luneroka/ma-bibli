import React from 'react';

function NewsCard({ article }) {
  return (
    <>
      <div className='flex gap-[24px]'>
        <div className='w-[255px] hidden md:block'>
          <a href={article.url} target='_blank'>
            <img
              src={article.urlToImage}
              alt='News Cover'
              className='h-[170px] cursor-pointer hover:scale-105 transition-all duration-200'
            />
          </a>
        </div>

        <div className='flex flex-col w-[400px] h-full justify-between'>
          <a
            href={article.url}
            target='_blank'
            className='text-small text-black-100 font-bold text-wrap flex items-center'
          >
            {article.title.length > 115
              ? `${article.title.slice(0, 115)}...`
              : article.title}
          </a>
          <div className='w-12 h-[2px] bg-secondary-btn opacity-75 my-2'></div>
          <p className='text-small text-black-100 overflow-hidden'>
            {article.description.length > 300
              ? `${article.description.slice(0, 300)}...`
              : article.description}
          </p>
        </div>
      </div>
      <div className='text-small text-black-50 italic mt-1 mb-[32px]'>
        Source : {article.source.name}
      </div>
    </>
  );
}

export default NewsCard;

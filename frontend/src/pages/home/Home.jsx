import React from 'react';
import NewReleases from './NewReleases';
import Recommended from './Recommended';
import MostPopulars from './MostPopulars';
import News from './News';

const Home = () => {
  return (
    <>
      <div className='px-[128px]'>
        <div className='mt-[96px] mb-[96px]'>
          <NewReleases />
        </div>
        <div className='mb-[96px]'>
          <MostPopulars />
        </div>
        <div className='mb-[96px]'>
          <Recommended />
        </div>
        <div className='mb-[128px]'>
          <News />
        </div>
      </div>
    </>
  );
};

export default Home;

import React from 'react';
import NewReleases from './NewReleases';
import Recommended from './Recommended';
import MostPopulars from './MostPopulars';

const Home = () => {
  return (
    <>
      <div className='px-[128px]'>
        <div className='mt-[96px] mb-[64px]'>
          <NewReleases />
        </div>
        <div className='mb-[96px]'>
          <MostPopulars />
        </div>
        <div>
          <Recommended />
        </div>
      </div>
    </>
  );
};

export default Home;

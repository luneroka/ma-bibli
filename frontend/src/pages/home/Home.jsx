import React from 'react';
import NewReleases from './NewReleases';
import TopSellers from './TopSellers';
import Recommendations from './Recommendations'

const Home = () => {
  return (
    <>
      <div className='px-[128px]'>
        <div className='mt-[96px] mb-[64px]'>
          <NewReleases />
        </div>
        <div className='mb-[64px]'>
          <TopSellers />
        </div>
        <div>
          <Recommendations />
        </div>
      </div>
    </>
  );
};

export default Home;

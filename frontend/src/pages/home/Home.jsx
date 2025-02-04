import React from 'react';
import NewReleases from './NewReleases';
import TopSellers from './TopSellers';

const Home = () => {
  return (
    <>
      <div className='px-[128px]'>
        <div className='mt-[96px] mb-[64px]'>
          <NewReleases />
        </div>
        <TopSellers />
      </div>
    </>
  );
};

export default Home;

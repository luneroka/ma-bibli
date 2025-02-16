import React from 'react';

function MetricCard() {
  return (
    <div className='h-[120px] pl-[64px] bg-white-bg flex flex-col justify-center shadow-lg'>
      <p className='text-metrics-number text-secondary-btn'>223</p>
      <p className='text-metrics-type font-light'>Livres</p>
    </div>
  );
}

export default MetricCard;

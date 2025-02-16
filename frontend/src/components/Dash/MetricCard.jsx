import React from 'react';

function MetricCard() {
  return (
    <div className='h-[140px] pl-[64px] bg-white-bg flex flex-col justify-center'>
      <p className='text-metrics-number text-secondary-btn'>223</p>
      <p className='text-metrics-type'>Livres</p>
    </div>
  );
}

export default MetricCard;

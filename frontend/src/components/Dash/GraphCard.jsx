import React from 'react';

function GraphCard() {
  return (
    <div className='h-[500px] bg-white-bg shadow-lg'>
      <div className='bg-white-bg text-center text-chart-title p-4'>
        {/* Card Title */}
        <div className='mb-8'>Répartition par genre</div>

        {/* Graph */}
        <div className='flex justify-center'>
          <img src='/Mock-graph.png' alt='' />
        </div>
      </div>
    </div>
  );
}

export default GraphCard;

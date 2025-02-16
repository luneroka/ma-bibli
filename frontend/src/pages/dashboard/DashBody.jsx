import React from 'react';
import MetricCard from '../../components/Dash/MetricCard';
import GraphCard from '../../components/Dash/GraphCard';
import ListCard from '../../components/Dash/ListCard';

function DashBody() {
  return (
    <div className='mx-[128px] grid grid-cols-4 gap-[32px]'>
      {/* Metrics Cards */}
      <MetricCard />
      <MetricCard />
      <MetricCard />
      <MetricCard />

      {/* Graph Card */}
      <div className='col-span-2'>
        <GraphCard />
      </div>

      {/* List Card */}
      <ListCard />
      <ListCard />
    </div>
  );
}

export default DashBody;

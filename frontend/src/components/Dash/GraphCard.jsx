import PropTypes from 'prop-types';
import DoughnutGraph from './DoughnutGraph';

function GraphCard({ libraryBooks = [] }) {
  return (
    <div className='h-[500px] bg-white-bg shadow-lg'>
      <div className='bg-white-bg text-center text-chart-title p-4'>
        {/* Card Title */}
        <div className='mb-8 text-black-100'>Répartition par genre</div>

        {/* Graph */}
        <div className='flex justify-center'>
          <DoughnutGraph libraryBooks={libraryBooks} />
        </div>
      </div>
    </div>
  );
}
GraphCard.propTypes = {
  libraryBooks: PropTypes.array
};

export default GraphCard;

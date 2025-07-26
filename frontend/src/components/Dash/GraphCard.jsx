import PropTypes from 'prop-types';
import DoughnutGraph from './DoughnutGraph';

function GraphCard({ libraryBooks = [] }) {
  return (
    <div className='h-full bg-white-bg shadow-lg'>
      <div className='bg-white-bg text-center text-body min-[700px]:text-chart-title p-4'>
        {/* Card Title */}
        <div className='mb-4 min-[700px]:mb-8 text-black-100'>
          Répartition des genres dans la bibli
        </div>

        {/* Graph */}
        <div className='flex justify-center'>
          <DoughnutGraph libraryBooks={libraryBooks} />
        </div>
      </div>
    </div>
  );
}
GraphCard.propTypes = {
  libraryBooks: PropTypes.array,
};

export default GraphCard;

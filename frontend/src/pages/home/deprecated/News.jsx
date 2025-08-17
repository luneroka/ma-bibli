/**
 * @deprecated This component is deprecated.
 */

import NewsCard from '../../components/NewsCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { generateRandomId } from '../../utils/helper.js';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';

const News = ({ news }) => {
  const isLoading = news == null;

  return (
    <>
      <div className='flex items-center gap-8 mb-[16px] md:mb-[32px]'>
        <h3 className='text-h4 xs:text-h3 min-[1450px]:text-h2 text-black-100 font-merriweather'>
          Actualités littéraires
        </h3>
      </div>

      {isLoading ? (
        <div className='flex items-center justify-center py-16'>
          <FaSpinner className='animate-spin text-3xl text-black-50' />
          <span className='ml-4 text-lg text-black-50'>
            Chargement des actualités…
          </span>
        </div>
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            750: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1050: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1570: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Navigation]}
          className='mySwiper'
        >
          <div className='flex gap-[145px]'>
            {news.map((article) => (
              <SwiperSlide key={generateRandomId()}>
                <NewsCard article={article} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      )}
    </>
  );
};

News.propTypes = {
  news: PropTypes.array.isRequired,
};

export default News;

import React from 'react';
import NewsCard from '../../components/NewsCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { generateRandomId } from '../../utils/helper.js';

const News = ({ news }) => {
  return (
    <>
      <div className='flex items-center gap-8 mb-[32px]'>
        <h3 className='text-h3 text-black font-merriweather'>
          Actualités littéraires
        </h3>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          880: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1250: {
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
    </>
  );
};

export default News;

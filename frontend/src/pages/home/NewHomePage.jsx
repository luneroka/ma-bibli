import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import screenshot images
import screenshotLibrary from '../../assets/screenshot-library.png';
import screenshotDashboard from '../../assets/screenshot-dashboard.png';
import screenshotSingleBook from '../../assets/screenshot-singleBook.png';

const NewHomePage = () => {
  return (
    <>
      <div className='min-h-[80vh] flex items-center justify-center p-8 flex-col gap-8'>
        <h1 className='font-merriweather text-h6'>
          Ma Bibli, votre bibliothèque interactive
        </h1>
        <div className='w-full max-w-2xl max-h-[600px] mx-auto shadow-2xl rounded-lg pb-8'>
          <div className='relative'>
            <Swiper
              className='mySwiper swiper-h h-full'
              spaceBetween={50}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              modules={[Pagination]}
              style={{
                paddingBottom: '64px',
                '--swiper-pagination-bullet-size': '12px',
                '--swiper-pagination-bullet-horizontal-gap': '8px',
                '--swiper-pagination-color': '#e67e23',
                '--swiper-pagination-bullet-inactive-color': '#999',
                '--swiper-pagination-bullet-inactive-opacity': '0.5',
              }}
            >
              <SwiperSlide>
                <img
                  src={screenshotLibrary}
                  alt='Ma Bibli Library Screenshot'
                  className='w-full h-full object-cover rounded-lg'
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={screenshotSingleBook}
                  alt='Ma Bibli Single Book Screenshot'
                  className='w-full h-full object-cover rounded-lg'
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={screenshotDashboard}
                  alt='Ma Bibli Dashboard Detail Screenshot'
                  className='w-full h-full object-cover rounded-lg'
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHomePage;

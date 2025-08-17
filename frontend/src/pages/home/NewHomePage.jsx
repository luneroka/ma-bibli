import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import presentationIndex from '../../assets/presentation-index.png';
import presentationSingleBook from '../../assets/presentation-singlebook.png';
import presentationLibrary from '../../assets/presentation-library.png';
import presentationDashboard from '../../assets/presentation-dashboard.png';

const NewHomePage = () => {
  return (
    <>
      <div className='min-h-[80vh] flex items-center justify-center p-8 flex-col gap-8 relative overflow-hidden'>
        {/* Floating Bubbles Background - Full Viewport Coverage */}
        <div className='fixed inset-0 pointer-events-none z-0'>
          {/* Large bubbles */}
          <div
            className='absolute w-24 h-24 bg-primary-btn/60 rounded-full animate-float-slow'
            style={{ top: '10%', left: '10%' }}
          ></div>
          <div
            className='absolute w-20 h-20 bg-secondary-btn/70 rounded-full animate-float-medium'
            style={{ top: '15%', right: '15%' }}
          ></div>
          <div
            className='absolute w-28 h-28 bg-main-blue/65 rounded-full animate-float-slow hidden lg:block'
            style={{ bottom: '20%', left: '15%' }}
          ></div>
          <div
            className='absolute w-22 h-22 bg-black-25/55 rounded-full animate-float-medium'
            style={{ top: '60%', right: '10%' }}
          ></div>

          {/* Medium bubbles */}
          <div
            className='absolute w-16 h-16 bg-secondary-btn/70 rounded-full animate-float-medium'
            style={{ bottom: '50%', right: '20%' }}
          ></div>
          <div
            className='absolute w-12 h-12 bg-secondary-btn/65 rounded-full animate-float-slow'
            style={{ top: '50%', left: '8%' }}
          ></div>
          <div
            className='absolute w-16 h-16 bg-black-25/60 rounded-full animate-float-fast'
            style={{ bottom: '45%', left: '60%' }}
          ></div>
          <div
            className='absolute w-14 h-14 bg-primary-btn/70 rounded-full animate-float-medium'
            style={{ top: '85%', right: '35%' }}
          ></div>

          {/* Small bubbles */}
          <div
            className='absolute w-9 h-9 bg-secondary-btn/80 rounded-full animate-float-fast'
            style={{ top: '25%', left: '50%' }}
          ></div>
          <div
            className='absolute w-12 h-12 bg-secondary-btn/75 rounded-full animate-float-medium'
            style={{ bottom: '15%', right: '20%' }}
          ></div>
          <div
            className='absolute w-9 h-9 bg-main-blue/80 rounded-full animate-float-slow'
            style={{ bottom: '60%', left: '15%' }}
          ></div>
          <div
            className='absolute w-8 h-8 bg-primary-btn/75 rounded-full animate-float-medium'
            style={{ top: '40%', right: '8%' }}
          ></div>
          <div
            className='absolute w-7 h-7 bg-black-25/70 rounded-full animate-float-fast'
            style={{ top: '85%', right: '60%' }}
          ></div>
          <div
            className='absolute w-9 h-9 bg-main-blue/80 rounded-full animate-float-medium'
            style={{ top: '5%', left: '70%' }}
          ></div>
        </div>

        {/* Main Content */}
        <h1 className='font-merriweather text-h6 relative z-20'>
          Ma Bibli, votre bibliothèque interactive
        </h1>
        <div className='w-full max-w-2xl max-h-[600px] mx-auto shadow-2xl rounded-lg pb-8 relative z-20 hidden sm:block'>
          <div className='relative z-30'>
            <Swiper
              className='mySwiper swiper-h h-full'
              spaceBetween={50}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              style={{
                paddingBottom: '64px',
                '--swiper-pagination-bullet-size': '16px',
                '--swiper-pagination-bullet-inactive-size': '16px',
                '--swiper-pagination-bullet-horizontal-gap': '8px',
                '--swiper-pagination-color': '#e67e23',
                '--swiper-pagination-bullet-inactive-color': '#999',
                '--swiper-pagination-bullet-inactive-opacity': '0.75',
                zIndex: 30,
              }}
            >
              <SwiperSlide>
                <img
                  src={presentationIndex}
                  alt='Ma Bibli Index Presentation'
                  className='w-full h-full object-cover rounded-lg'
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={presentationSingleBook}
                  alt='Ma Bibli Single Book Presentation'
                  className='w-full h-full object-cover rounded-lg'
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={presentationLibrary}
                  alt='Ma Bibli Library Presentation'
                  className='w-full h-full object-cover rounded-lg'
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={presentationDashboard}
                  alt='Ma Bibli Dashboard Presentation'
                  className='w-full h-full object-cover rounded-lg'
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        <style>{`
          @keyframes float-slow {
            0%,
            100% {
              transform: translateY(0px) translateX(0px);
            }
            25% {
              transform: translateY(-20px) translateX(10px);
            }
            50% {
              transform: translateY(-10px) translateX(-15px);
            }
            75% {
              transform: translateY(-15px) translateX(5px);
            }
          }

          @keyframes float-medium {
            0%,
            100% {
              transform: translateY(0px) translateX(0px);
            }
            33% {
              transform: translateY(-15px) translateX(-10px);
            }
            66% {
              transform: translateY(-25px) translateX(8px);
            }
          }

          @keyframes float-fast {
            0%,
            100% {
              transform: translateY(0px) translateX(0px);
            }
            50% {
              transform: translateY(-30px) translateX(-20px);
            }
          }

          .animate-float-slow {
            animation: float-slow 8s ease-in-out infinite;
          }

          .animate-float-medium {
            animation: float-medium 6s ease-in-out infinite;
          }

          .animate-float-fast {
            animation: float-fast 4s ease-in-out infinite;
          }
        `}</style>
      </div>
    </>
  );
};

export default NewHomePage;

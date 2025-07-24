import PropTypes from 'prop-types';

function NewsCard({ article }) {
  // Generate appropriate image URLs for different sizes
  const getImageForSize = (url, width) => {
    if (url && url.includes('w_500')) {
      return url.replace('w_500', `w_${width}`);
    }
    return url;
  };

  return (
    <>
      <div className='flex gap-[8px] md:gap-[16px] lg:gap-[24px]'>
        {/* Responsive container with dynamic width based on breakpoints */}
        <div className='hidden md:block md:w-[180px] lg:w-[210px] xl:w-[255px]'>
          <a href={article.url} target='_blank' rel='noopener noreferrer'>
            <img
              src={article.urlToImage}
              srcSet={`
                ${getImageForSize(article.urlToImage, 180)} 180w,
                ${getImageForSize(article.urlToImage, 210)} 210w,
                ${getImageForSize(article.urlToImage, 255)} 255w,
                ${getImageForSize(article.urlToImage, 500)} 500w
              `}
              sizes='(max-width: 768px) 180px, (max-width: 1024px) 210px, (max-width: 1650px) 255px, 500px'
              alt={article.title || 'News article'}
              className='w-full h-[120px] md:h-[140px] lg:h-[160px] xl:h-[170px] object-contain object-top cursor-pointer hover:scale-105 transition-all duration-200'
              loading='lazy'
            />
          </a>
        </div>

        {/* Also make the text container responsive */}
        <div className='flex flex-col w-full md:w-[250px] lg:w-[320px] xl:w-[400px] h-full justify-between'>
          <a
            href={article.url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-small text-black-100 font-bold text-wrap flex items-center'
          >
            {article.title && article.title.length > 115
              ? `${article.title.slice(0, 115)}...`
              : article.title}
          </a>
          <div className='w-12 h-[2px] bg-secondary-btn opacity-75 my-2'></div>
          <p className='text-small text-black-100 overflow-hidden'>
            {article.description && article.description.length > 300
              ? `${article.description.slice(0, 300)}...`
              : article.description}
          </p>
        </div>
      </div>
      <div className='text-small text-black-50 italic mt-1 mb-[32px]'>
        Source : {article.source?.name || 'Unknown'}
      </div>
    </>
  );
}

NewsCard.propTypes = {
  article: PropTypes.shape({
    url: PropTypes.string,
    urlToImage: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    source: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default NewsCard;

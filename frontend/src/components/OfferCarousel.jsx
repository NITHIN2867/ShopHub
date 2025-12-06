import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { bannerSlides } from '../utils/bannerConfig';

export default function OfferCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const offers = bannerSlides;

  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoPlay, offers.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
    setAutoPlay(false);
  };

  return (
    <div className="relative w-full bg-gradient-to-b from-gray-100 to-gray-50 overflow-hidden rounded-lg shadow-lg">
      {/* Main Carousel */}
      <div className="relative h-80 md:h-96 w-full">
        {offers.map((offer, index) => (
          <div
            key={offer.id}
            className={`absolute w-full h-full transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%), url(${offer.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Content */}
              <div className="relative h-full flex items-center px-4 md:px-12 pt-8 md:pt-0">
                <div className="text-white max-w-xl">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">{offer.title}</h2>
                  <p className="text-xl md:text-3xl font-bold text-yellow-300 mb-2 drop-shadow-lg">{offer.subtitle}</p>
                  <p className="text-base md:text-lg mb-4 drop-shadow-md">{offer.description}</p>
                  <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition cursor-pointer text-sm md:text-base shadow-lg hover:shadow-xl">
                    Shop Now →
                  </div>
                  <p className="text-xs md:text-sm mt-3 opacity-90">{offer.dates}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition shadow-lg hover:shadow-xl"
          aria-label="Previous slide"
        >
          <FiChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition shadow-lg hover:shadow-xl"
          aria-label="Next slide"
        >
          <FiChevronRight size={20} />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center items-center gap-2 py-4 bg-gradient-to-r from-gray-50 to-gray-100">
        {offers.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all ${
              index === currentSlide
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 w-6 h-2 shadow-md'
                : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-2 text-center text-xs font-semibold text-gray-700">
        {currentSlide + 1} / {offers.length}
      </div>
    </div>
  );
}

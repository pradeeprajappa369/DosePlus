import { useState, useEffect } from 'react';

interface Offer {
  id: string;
  name: string;
  type: string;
  discount: string;
  applicableTo: string;
  bannerText: string;
  validFrom: string;
  validTo: string;
  status: string;
}

interface PromoBannerSliderProps {
  offers: Offer[];
}

const PromoBannerSlider = ({ offers }: PromoBannerSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Filter only active offers
  const activeOffers = offers.filter(offer => offer.status.toLowerCase() === 'active');

  useEffect(() => {
    if (activeOffers.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeOffers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeOffers.length]);

  if (activeOffers.length === 0) return null;

  const getGradientClass = (index: number) => {
    const gradients = [
      'bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500',
      'bg-gradient-to-r from-red-500 via-orange-500 to-amber-500',
      'bg-gradient-to-r from-amber-500 via-orange-400 to-orange-500',
      'bg-gradient-to-r from-orange-600 via-red-500 to-orange-500',
      'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600',
    ];
    return gradients[index % gradients.length];
  };

  const getImageUrl = (index: number) => {
    const images = [
      'https://readdy.ai/api/search-image?query=modern%20pharmacy%20interior%20with%20clean%20white%20shelves%20displaying%20colorful%20medicine%20bottles%20and%20health%20supplements%20in%20organized%20rows%2C%20bright%20professional%20lighting%2C%20minimalist%20medical%20aesthetic%2C%20soft%20focus%20background%20with%20orange%20and%20white%20color%20scheme&width=1400&height=450&seq=user-promo-1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=abstract%20medical%20background%20with%20floating%20pills%20capsules%20and%20vitamin%20bottles%20in%20soft%20focus%2C%20gradient%20orange%20and%20amber%20tones%2C%20clean%20modern%20healthcare%20design%2C%20professional%20pharmacy%20aesthetic%20with%20geometric%20patterns&width=1400&height=450&seq=user-promo-2&orientation=landscape',
      'https://readdy.ai/api/search-image?query=wellness%20and%20healthcare%20concept%20with%20natural%20supplements%20herbs%20and%20medicine%20bottles%20arranged%20artistically%2C%20soft%20orange%20gradient%20background%2C%20modern%20minimalist%20pharmacy%20design%20with%20botanical%20elements&width=1400&height=450&seq=user-promo-3&orientation=landscape',
      'https://readdy.ai/api/search-image?query=contemporary%20pharmacy%20shelf%20display%20with%20organized%20medicine%20packages%20and%20health%20products%2C%20orange%20and%20red%20gradient%20lighting%2C%20professional%20medical%20environment%2C%20clean%20modern%20aesthetic%20with%20soft%20shadows&width=1400&height=450&seq=user-promo-4&orientation=landscape',
      'https://readdy.ai/api/search-image?query=pharmacy%20promotional%20background%20with%20medicine%20bottles%20and%20health%20products%20in%20artistic%20arrangement%2C%20warm%20amber%20and%20orange%20gradient%2C%20modern%20minimalist%20design%20with%20soft%20lighting%20and%20clean%20composition&width=1400&height=450&seq=user-promo-5&orientation=landscape',
    ];
    return images[index % images.length];
  };

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">User App Preview</h2>
          <p className="text-sm text-gray-600">See how your offers will appear on the customer homepage</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg">
          <i className="ri-smartphone-line text-orange-600"></i>
          <span className="text-sm font-semibold text-orange-700">Live Preview</span>
        </div>
      </div>

      {/* Banner Slider */}
      <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl border-4 border-gray-200">
        {/* Slides */}
        <div className="relative h-96">
          {activeOffers.map((offer, index) => (
            <div
              key={offer.id}
              className={`absolute inset-0 transition-all duration-700 ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className={`relative w-full h-full ${getGradientClass(index)} overflow-hidden`}>
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={getImageUrl(index)}
                    alt={offer.name}
                    className="w-full h-full object-cover opacity-25"
                  />
                </div>

                {/* Blur Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/40 backdrop-blur-[2px]"></div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32"></div>

                {/* Content */}
                <div className="relative z-10 h-full flex items-center px-16">
                  <div className="max-w-3xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-md px-6 py-3 rounded-full mb-6 shadow-lg">
                      <i className="ri-price-tag-3-fill text-orange-600 text-2xl"></i>
                      <span className="text-orange-600 text-lg font-black">
                        {offer.type === 'BOGO' 
                          ? 'BUY 1 GET 1 FREE' 
                          : `${offer.discount}${offer.type === 'Percentage' ? '%' : '₹'} OFF`}
                      </span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight drop-shadow-2xl">
                      {offer.bannerText}
                    </h2>

                    {/* Category */}
                    <p className="text-2xl text-white/95 mb-8 font-semibold drop-shadow-lg">
                      <i className="ri-shopping-bag-line mr-2"></i>
                      {offer.applicableTo}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-4">
                      <button className="px-10 py-4 bg-white text-orange-600 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all duration-200 cursor-pointer whitespace-nowrap shadow-2xl hover:shadow-3xl transform hover:-translate-y-1">
                        Order Now
                        <i className="ri-arrow-right-line ml-3"></i>
                      </button>
                      <button className="px-8 py-4 border-3 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-200 cursor-pointer whitespace-nowrap backdrop-blur-sm">
                        <i className="ri-information-line mr-2"></i>
                        Learn More
                      </button>
                    </div>

                    {/* Validity */}
                    <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                      <i className="ri-time-line text-white"></i>
                      <p className="text-white/95 text-sm font-semibold">
                        Limited Time Offer • Valid until {new Date(offer.validTo).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Urgency Banner */}
                <div className="absolute top-6 right-6 bg-red-500 text-white px-6 py-3 rounded-full shadow-xl animate-pulse">
                  <p className="font-bold text-sm flex items-center gap-2">
                    <i className="ri-fire-fill"></i>
                    HURRY! LIMITED TIME ONLY
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        {activeOffers.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
            {activeOffers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 cursor-pointer ${
                  index === currentSlide
                    ? 'w-12 h-3 bg-white rounded-full shadow-lg'
                    : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        )}

        {/* Navigation Arrows */}
        {activeOffers.length > 1 && (
          <>
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + activeOffers.length) % activeOffers.length)}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer z-20 shadow-xl"
              aria-label="Previous slide"
            >
              <i className="ri-arrow-left-s-line text-orange-600 text-2xl"></i>
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % activeOffers.length)}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer z-20 shadow-xl"
              aria-label="Next slide"
            >
              <i className="ri-arrow-right-s-line text-orange-600 text-2xl"></i>
            </button>
          </>
        )}
      </div>

      {/* Preview Info */}
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
        <i className="ri-information-line"></i>
        <p>This is how customers will see your promotional banners on the app homepage</p>
      </div>
    </div>
  );
};

export default PromoBannerSlider;

interface Offer {
  id: string;
  name: string;
  type: string;
  discountValue: string;
  applicableTo: string;
  validFrom: string;
  validTo: string;
  status: string;
  bannerText: string;
}

interface PromotionCardsProps {
  offers: Offer[];
  onEdit: (offer: Offer) => void;
  onView: (offer: Offer) => void;
}

const PromotionCards = ({ offers, onEdit, onView }: PromotionCardsProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'Scheduled':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'Expired':
        return 'bg-gray-100 text-gray-600 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-300';
    }
  };

  const getGradientClass = (index: number) => {
    const gradients = [
      'bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500',
      'bg-gradient-to-r from-red-500 via-orange-500 to-amber-500',
      'bg-gradient-to-r from-amber-500 via-orange-400 to-orange-500',
      'bg-gradient-to-r from-orange-600 via-red-500 to-orange-500',
    ];
    return gradients[index % gradients.length];
  };

  const getImageUrl = (index: number) => {
    const images = [
      'https://readdy.ai/api/search-image?query=abstract%20medical%20pharmacy%20background%20with%20soft%20orange%20gradient%2C%20floating%20medicine%20pills%20and%20capsules%20in%20artistic%20arrangement%2C%20modern%20minimalist%20healthcare%20design%20with%20geometric%20patterns%20and%20light%20effects%2C%20professional%20pharmaceutical%20aesthetic&width=1200&height=300&seq=promo-banner-1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=pharmacy%20promotional%20background%20with%20health%20supplements%20and%20vitamin%20bottles%2C%20warm%20orange%20and%20amber%20gradient%20tones%2C%20abstract%20medical%20pattern%20with%20soft%20bokeh%20effect%2C%20clean%20modern%20pharmaceutical%20branding%20design&width=1200&height=300&seq=promo-banner-2&orientation=landscape',
      'https://readdy.ai/api/search-image?query=wellness%20and%20healthcare%20concept%20background%2C%20orange%20gradient%20with%20abstract%20medical%20symbols%2C%20floating%20pills%20and%20health%20products%20in%20soft%20focus%2C%20contemporary%20pharmacy%20promotional%20design%20with%20light%20geometric%20shapes&width=1200&height=300&seq=promo-banner-3&orientation=landscape',
      'https://readdy.ai/api/search-image?query=modern%20pharmacy%20sale%20banner%20background%2C%20vibrant%20orange%20and%20red%20gradient%2C%20abstract%20medicine%20bottles%20and%20supplements%20arrangement%2C%20professional%20healthcare%20marketing%20design%20with%20dynamic%20lighting%20effects&width=1200&height=300&seq=promo-banner-4&orientation=landscape',
    ];
    return images[index % images.length];
  };

  return (
    <div className="space-y-5">
      {offers.map((offer, index) => (
        <div
          key={offer.id}
          className="group relative bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          {/* Banner Card Layout */}
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Visual Banner */}
            <div className={`relative ${getGradientClass(index)} md:w-2/5 p-8 overflow-hidden`}>
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={getImageUrl(index)}
                  alt={offer.name}
                  className="w-full h-full object-cover opacity-20"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/10"></div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 group-hover:scale-125 transition-transform duration-500"></div>

              {/* Discount Badge - Large Circle */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div className="w-40 h-40 bg-white rounded-full flex flex-col items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <div className="text-center">
                    <div className="text-5xl font-black text-orange-600 leading-none">
                      {offer.type === 'BOGO' ? 'BOGO' : offer.discountValue}
                    </div>
                    <div className="text-lg font-bold text-orange-500 mt-1">
                      {offer.type === 'BOGO' ? 'OFFER' : offer.type === 'Percentage' ? '% OFF' : '₹ OFF'}
                    </div>
                  </div>
                </div>
                <div className="mt-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                  <p className="text-sm font-bold text-gray-800">
                    <i className="ri-calendar-line mr-1"></i>
                    Valid till {new Date(offer.validTo).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Offer Details */}
            <div className="md:w-3/5 p-8 flex flex-col justify-between">
              {/* Top Section */}
              <div>
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(offer.status)}`}>
                    <span className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse"></span>
                    {offer.status}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(offer)}
                      className="w-9 h-9 flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 hover:text-gray-900 transition-all cursor-pointer"
                      title="View Details"
                    >
                      <i className="ri-eye-line text-lg"></i>
                    </button>
                    <button
                      onClick={() => onEdit(offer)}
                      className="w-9 h-9 flex items-center justify-center bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 hover:text-orange-700 transition-all cursor-pointer"
                      title="Edit Offer"
                    >
                      <i className="ri-edit-line text-lg"></i>
                    </button>
                  </div>
                </div>

                {/* Offer Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {offer.name}
                </h3>

                {/* Banner Text */}
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                  {offer.bannerText}
                </p>

                {/* Offer Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <i className="ri-bookmark-line text-orange-600"></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Type</p>
                      <p className="font-semibold text-gray-900">{offer.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <i className="ri-shopping-bag-line text-orange-600"></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Applies to</p>
                      <p className="font-semibold text-gray-900 line-clamp-1">{offer.applicableTo}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section - CTA */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onView(offer)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all cursor-pointer whitespace-nowrap font-semibold shadow-md hover:shadow-lg group-hover:scale-[1.02]"
                >
                  <i className="ri-eye-line mr-2"></i>
                  View Full Details
                </button>
                <button
                  className="px-6 py-3 border-2 border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-all cursor-pointer whitespace-nowrap font-semibold"
                >
                  <i className="ri-share-line mr-2"></i>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromotionCards;

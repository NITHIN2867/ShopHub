// Banner configuration for carousel
export const bannerSlides = [
  {
    id: 1,
    title: 'BUY & BUY 2025',
    subtitle: '60-90% Off',
    description: 'Shop now',
    bgColor: 'bg-gradient-to-r from-orange-400 to-orange-500',
    dates: '5th-10th DEC',
    image: '/images/slide1-banner.jpg'
  },
  {
    id: 2,
    title: 'Electronics Sale',
    subtitle: '50% Off',
    description: 'Latest gadgets at amazing prices',
    bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
    dates: '5th-15th DEC',
    image: '/images/slide2-banner.jpg'
  },
  {
    id: 3,
    title: 'Fashion Week',
    subtitle: 'Up to 70% Off',
    description: 'Trending styles for everyone',
    bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
    dates: '5th-20th DEC',
    image: '/images/slide3-banner.jpg'
  },
  {
    id: 4,
    title: 'Home & Living',
    subtitle: '40% Off',
    description: 'Make your home beautiful',
    bgColor: 'bg-gradient-to-r from-green-500 to-teal-500',
    dates: '5th-25th DEC',
    image: '/images/slide4-banner.jpg'
  },
  {
    id: 5,
    title: 'Year-End Mega Sale',
    subtitle: '80% Off',
    description: 'Don\'t miss this incredible deal',
    bgColor: 'bg-gradient-to-r from-red-500 to-red-600',
    dates: '5th-31st DEC',
    image: '/images/slide5-banner.jpg'
  }
];

export const getBannerImage = (bannerNumber) => {
  if (bannerNumber >= 1 && bannerNumber <= 5) {
    return `/images/slide${bannerNumber}-banner.jpg`;
  }
  return '/images/slide1-banner.jpg';
};

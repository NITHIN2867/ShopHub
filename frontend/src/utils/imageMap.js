// Image mapping for products - Uses local images from /images folder
export const getProductImage = (productName) => {
  const name = productName.toLowerCase();

  // Electronics
  if (name.includes('headphone') || name.includes('earphone')) return '/images/wireless-headphones.jpg';
  if (name.includes('smart watch') || (name.includes('watch') && name.includes('smart'))) return '/images/smart-watch.jpg';
  if (name.includes('sports watch') || (name.includes('watch') && name.includes('sports'))) return '/images/sports-watch.jpg';
  if (name.includes('power bank') || name.includes('portable charger')) return '/images/power-bank.jpg';
  if (name.includes('smartphone') || (name.includes('phone') && !name.includes('headphone'))) return '/images/smartphone.jpg';
  if (name.includes('keyboard') && name.includes('mouse')) return '/images/keyboard-mouse.jpg';
  if (name.includes('bluetooth speaker') || (name.includes('speaker') && name.includes('bluetooth'))) return '/images/bluetooth-speaker.jpg';
  if (name.includes('webcam')) return '/images/webcam.jpg';
  if (name.includes('usb') && name.includes('hub')) return '/images/usb-hub.jpg';
  if (name.includes('mechanical keyboard') || (name.includes('keyboard') && name.includes('mechanical'))) return '/images/mechanical-keyboard.jpg';
  if (name.includes('laptop') || name.includes('computer')) return '/images/laptop.jpg';
  if (name.includes('tablet')) return '/images/tablet.jpg';
  if (name.includes('monitor') || name.includes('display')) return '/images/monitor.jpg';
  if (name.includes('ssd') || (name.includes('external') && name.includes('storage'))) return '/images/external-ssd.jpg';
  if (name.includes('gaming mouse') || (name.includes('mouse') && name.includes('gaming'))) return '/images/gaming-mouse.jpg';
  if (name.includes('wireless mouse') && !name.includes('gaming')) return '/images/wireless-mouse.jpg';

  // Fashion
  if (name.includes('t-shirt') || name.includes('casual t-shirt')) return '/images/casual-tshirt.jpg';
  if (name.includes('jeans') || name.includes('denim')) return '/images/denim-jeans.jpg';
  if (name.includes('formal') && name.includes('shirt')) return '/images/formal-shirt.jpg';
  if (name.includes('sunglasses')) return '/images/sunglasses.jpg';
  if (name.includes('belt') && name.includes('leather')) return '/images/leather-belt.jpg';
  if (name.includes('canvas') && name.includes('shoe')) return '/images/canvas-shoes.jpg';
  if (name.includes('running') && name.includes('shoe')) return '/images/running-shoes.jpg';
  if (name.includes('backpack')) return '/images/backpack.jpg';

  // Home Appliances
  if (name.includes('coffee maker')) return '/images/coffee-maker.jpg';
  if (name.includes('blender') || name.includes('mixer blender')) return '/images/blender.jpg';
  if (name.includes('toaster')) return '/images/toaster.jpg';
  if (name.includes('microwave')) return '/images/microwave.jpg';
  if (name.includes('air fryer')) return '/images/air-fryer.jpg';
  if (name.includes('juicer') || name.includes('juice extractor')) return '/images/juicer.jpg';
  if (name.includes('mixer grinder')) return '/images/mixer-grinder.jpg';
  if (name.includes('vacuum')) return '/images/vacuum-cleaner.jpg';

  // Home Decor
  if (name.includes('wall art') || (name.includes('canvas') && name.includes('art'))) return '/images/wall-art.jpg';
  if (name.includes('decorative pillow') || name.includes('pillow set')) return '/images/decorative-pillow.jpg';
  if (name.includes('throw blanket')) return '/images/throw-blanket.jpg';
  if (name.includes('table lamp') || (name.includes('lamp') && !name.includes('floor'))) return '/images/table-lamp.jpg';
  if (name.includes('wall mirror') || (name.includes('mirror') && name.includes('decorative'))) return '/images/wall-mirror.jpg';
  if (name.includes('area rug') || (name.includes('rug') && !name.includes('yoga'))) return '/images/rug.jpg';
  if (name.includes('wall clock') || (name.includes('clock') && !name.includes('alarm'))) return '/images/wall-clock.jpg';
  if (name.includes('plant pot') || (name.includes('pot') && name.includes('ceramic'))) return '/images/plant-pot.jpg';
  if (name.includes('door mat') || name.includes('doormat')) return '/images/door-mat.jpg';

  // Furniture
  if (name.includes('sofa') || name.includes('3-seater')) return '/images/sofa.jpg';
  if (name.includes('coffee table')) return '/images/coffee-table.jpg';
  if (name.includes('dining table')) return '/images/dining-table.jpg';
  if (name.includes('bookshelf') || name.includes('wooden bookshelf') || name.includes('wall shelves')) return '/images/bookshelf.jpg';
  if (name.includes('office chair') || (name.includes('chair') && name.includes('ergonomic'))) return '/images/office-chair.jpg';
  if (name.includes('bed frame') || (name.includes('bed') && name.includes('queen'))) return '/images/bed-frame.jpg';
  if (name.includes('wardrobe') || (name.includes('wooden') && name.includes('wardrobe'))) return '/images/wardrobe.jpg';
  if (name.includes('desk') || name.includes('standing desk') || (name.includes('study') && name.includes('desk'))) return '/images/desk.jpg';
  if (name.includes('lamp') || name.includes('led desk')) return '/images/table-lamp.jpg';

  // Home Furnishings & More
  if (name.includes('cushion') || name.includes('pillow') && name.includes('decorative')) return '/images/decorative-pillow.jpg';
  if (name.includes('throw blanket')) return '/images/throw-blanket.jpg';
  if (name.includes('food processor')) return '/images/blender.jpg';
  if (name.includes('gaming headset')) return '/images/wireless-headphones.jpg';

  // Default fallback
  return '/images/placeholder.jpg';
};

// Get similar products based on category
export const getSimilarProductQuery = (category) => {
  return category || 'Electronics';
};

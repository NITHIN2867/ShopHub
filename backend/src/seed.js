import mongoose from 'mongoose';
import { config } from './config/index.js';
import User from './models/User.js';
import Product from './models/Product.js';
import { hashPassword } from './utils/helpers.js';

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminPassword = await hashPassword('password');
    const admin = new User({
      name: 'Admin User',
      email: 'admin@flipcart.com',
      password: adminPassword,
      role: 'admin',
      phone: '+91-9999999999',
      address: {
        street: 'Admin Street',
        city: 'Delhi',
        state: 'Delhi',
        country: 'India',
        zipCode: '110001'
      }
    });
    await admin.save();
    console.log('✓ Admin user created');

    // Create regular user
    const userPassword = await hashPassword('password');
    const user = new User({
      name: 'John Doe',
      email: 'user@flipcart.com',
      password: userPassword,
      role: 'customer',
      phone: '+91-9876543210',
      address: {
        street: 'Customer Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        zipCode: '400001'
      }
    });
    await user.save();
    console.log('✓ Customer user created');

    // Create products
    const products = [
      {
        name: 'Premium Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation and 40-hour battery life',
        price: 5999,
        originalPrice: 9999,
        category: 'Electronics',
        subcategory: 'Headphones',
        images: [
          { url: '/images/wireless-headphones.jpg', alt: 'Headphones' }
        ],
        stock: 50,
        rating: 4.5,
        reviewCount: 128,
        tags: ['wireless', 'headphones', 'audio']
      },
      {
        name: 'Smart Watch Pro',
        description: 'Advanced smartwatch with health monitoring and fitness tracking',
        price: 12999,
        originalPrice: 19999,
        category: 'Electronics',
        subcategory: 'Wearables',
        images: [
          { url: '/images/smart-watch.jpg', alt: 'Smart Watch' }
        ],
        stock: 35,
        rating: 4.3,
        reviewCount: 95,
        tags: ['smartwatch', 'fitness', 'health']
      },
      {
        name: 'Portable Phone Charger',
        description: 'Fast charging power bank with 20000mAh capacity',
        price: 1499,
        originalPrice: 2999,
        category: 'Electronics',
        subcategory: 'Accessories',
        images: [
          { url: '/images/power-bank.jpg', alt: 'Power Bank' }
        ],
        stock: 100,
        rating: 4.2,
        reviewCount: 256,
        tags: ['charger', 'powerbank', 'mobile']
      },
      {
        name: 'Premium Camera Phone',
        description: '5G enabled smartphone with professional camera setup',
        price: 49999,
        originalPrice: 69999,
        category: 'Electronics',
        subcategory: 'Smartphones',
        images: [
          { url: '/images/smartphone.jpg', alt: 'Smartphone' }
        ],
        stock: 20,
        rating: 4.7,
        reviewCount: 512,
        tags: ['smartphone', '5g', 'camera']
      },
      {
        name: 'Wireless Keyboard & Mouse',
        description: 'Combo pack of ergonomic wireless keyboard and mouse',
        price: 1999,
        originalPrice: 3999,
        category: 'Electronics',
        subcategory: 'Peripherals',
        images: [
          { url: '/images/keyboard-mouse.jpg', alt: 'Keyboard Mouse' }
        ],
        stock: 45,
        rating: 4.4,
        reviewCount: 178,
        tags: ['keyboard', 'mouse', 'wireless']
      },
      {
        name: 'LED Desk Lamp',
        description: 'Smart LED lamp with adjustable brightness and color temperature',
        price: 899,
        originalPrice: 1699,
        category: 'Home Decor',
        subcategory: 'Lighting',
        images: [
          { url: '/images/table-lamp.jpg', alt: 'Desk Lamp' }
        ],
        stock: 60,
        rating: 4.1,
        reviewCount: 89,
        tags: ['lamp', 'lighting', 'led']
      },
      {
        name: 'Bluetooth Speaker',
        description: 'Portable Bluetooth speaker with rich bass and 12-hour battery',
        price: 2499,
        originalPrice: 4999,
        category: 'Electronics',
        subcategory: 'Audio',
        images: [
          { url: '/images/bluetooth-speaker.jpg', alt: 'Speaker' }
        ],
        stock: 55,
        rating: 4.3,
        reviewCount: 204,
        tags: ['speaker', 'bluetooth', 'audio']
      },
      {
        name: '4K Webcam',
        description: 'Professional 4K webcam with auto-focus and noise-canceling microphone',
        price: 3999,
        originalPrice: 6999,
        category: 'Electronics',
        subcategory: 'Accessories',
        images: [
          { url: '/images/webcam.jpg', alt: 'Webcam' }
        ],
        stock: 30,
        rating: 4.6,
        reviewCount: 145,
        tags: ['webcam', '4k', 'video']
      },
      {
        name: 'USB-C Hub',
        description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader',
        price: 1299,
        originalPrice: 2499,
        category: 'Electronics',
        subcategory: 'Accessories',
        images: [
          { url: '/images/usb-hub.jpg', alt: 'USB Hub' }
        ],
        stock: 70,
        rating: 4.2,
        reviewCount: 112,
        tags: ['hub', 'usb', 'adapter']
      },
      {
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard with customizable switches',
        price: 4999,
        originalPrice: 7999,
        category: 'Electronics',
        subcategory: 'Peripherals',
        images: [
          { url: '/images/mechanical-keyboard.jpg', alt: 'Keyboard' }
        ],
        stock: 25,
        rating: 4.8,
        reviewCount: 321,
        tags: ['keyboard', 'gaming', 'mechanical']
      },
      {
        name: 'Laptop Computer',
        description: 'High-performance laptop with Intel i7, 16GB RAM, 512GB SSD',
        price: 74999,
        originalPrice: 99999,
        category: 'Electronics',
        subcategory: 'Computers',
        images: [
          { url: '/images/laptop.jpg', alt: 'Laptop' }
        ],
        stock: 15,
        rating: 4.7,
        reviewCount: 289,
        tags: ['laptop', 'computer', 'portable']
      },
      {
        name: 'Tablet Pro',
        description: '10-inch tablet with stylus support and 128GB storage',
        price: 34999,
        originalPrice: 49999,
        category: 'Electronics',
        subcategory: 'Tablets',
        images: [
          { url: '/images/tablet.jpg', alt: 'Tablet' }
        ],
        stock: 22,
        rating: 4.5,
        reviewCount: 156,
        tags: ['tablet', 'ipad', 'portable']
      },
      {
        name: '27" 4K Monitor',
        description: '4K Ultra HD display with HDR and USB-C connectivity',
        price: 24999,
        originalPrice: 39999,
        category: 'Electronics',
        subcategory: 'Displays',
        images: [
          { url: '/images/monitor.jpg', alt: 'Monitor' }
        ],
        stock: 18,
        rating: 4.6,
        reviewCount: 203,
        tags: ['monitor', '4k', 'display']
      },
      {
        name: 'External SSD',
        description: '1TB portable SSD with USB 3.1 and fast read/write speeds',
        price: 6999,
        originalPrice: 9999,
        category: 'Electronics',
        subcategory: 'Storage',
        images: [
          { url: '/images/external-ssd.jpg', alt: 'SSD' }
        ],
        stock: 40,
        rating: 4.4,
        reviewCount: 178,
        tags: ['ssd', 'storage', 'drive']
      },
      {
        name: 'Ergonomic Office Chair',
        description: 'Premium office chair with lumbar support and height adjustment',
        price: 8999,
        originalPrice: 14999,
        category: 'Home & Furniture',
        subcategory: 'Seating',
        images: [
          { url: '/images/office-chair.jpg', alt: 'Chair' }
        ],
        stock: 35,
        rating: 4.5,
        reviewCount: 267,
        tags: ['chair', 'office', 'ergonomic']
      },
      {
        name: 'Standing Desk',
        description: 'Electric standing desk with memory presets and spacious surface',
        price: 19999,
        originalPrice: 29999,
        category: 'Home & Furniture',
        subcategory: 'Furniture',
        images: [
          { url: '/images/desk.jpg', alt: 'Desk' }
        ],
        stock: 20,
        rating: 4.6,
        reviewCount: 145,
        tags: ['desk', 'furniture', 'workstation']
      },
      {
        name: 'Wooden Bookshelf',
        description: '5-tier bookshelf with modern design and sturdy construction',
        price: 4499,
        originalPrice: 7999,
        category: 'Home & Furniture',
        subcategory: 'Storage',
        images: [
          { url: '/images/bookshelf.jpg', alt: 'Bookshelf' }
        ],
        stock: 28,
        rating: 4.3,
        reviewCount: 98,
        tags: ['bookshelf', 'storage', 'furniture']
      },
      {
        name: 'Coffee Table',
        description: 'Modern glass coffee table with metal frame and tempered glass',
        price: 5999,
        originalPrice: 9999,
        category: 'Home & Furniture',
        subcategory: 'Furniture',
        images: [
          { url: '/images/coffee-table.jpg', alt: 'Coffee Table' }
        ],
        stock: 32,
        rating: 4.4,
        reviewCount: 124,
        tags: ['table', 'furniture', 'living-room']
      },
      {
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with precision tracking and long battery',
        price: 1299,
        originalPrice: 2499,
        category: 'Electronics',
        subcategory: 'Peripherals',
        images: [
          { url: '/images/wireless-mouse.jpg', alt: 'Mouse' }
        ],
        stock: 60,
        rating: 4.3,
        reviewCount: 189,
        tags: ['mouse', 'wireless', 'peripheral']
      },
      {
        name: 'Backpack Pro',
        description: 'Waterproof laptop backpack with multiple compartments and USB port',
        price: 2999,
        originalPrice: 4999,
        category: 'Fashion & Accessories',
        subcategory: 'Bags',
        images: [
          { url: '/images/backpack.jpg', alt: 'Backpack' }
        ],
        stock: 45,
        rating: 4.4,
        reviewCount: 216,
        tags: ['backpack', 'travel', 'laptop']
      },
      {
        name: 'Sports Watch',
        description: 'Fitness tracker with heart rate monitor and GPS tracking',
        price: 3999,
        originalPrice: 6999,
        category: 'Fashion & Accessories',
        subcategory: 'Wearables',
        images: [
          { url: '/images/sports-watch.jpg', alt: 'Watch' }
        ],
        stock: 38,
        rating: 4.5,
        reviewCount: 234,
        tags: ['watch', 'fitness', 'sports']
      },
      {
        name: 'Running Shoes',
        description: 'Professional running shoes with cushioned sole and breathable mesh',
        price: 4499,
        originalPrice: 7999,
        category: 'Fashion & Accessories',
        subcategory: 'Footwear',
        images: [
          { url: '/images/running-shoes.jpg', alt: 'Shoes' }
        ],
        stock: 42,
        rating: 4.4,
        reviewCount: 178,
        tags: ['shoes', 'running', 'sports']
      },
      {
        name: 'Coffee Maker',
        description: 'Programmable coffee maker with thermal carafe and brew strength control',
        price: 2799,
        originalPrice: 4999,
        category: 'Home Appliances',
        subcategory: 'Kitchen',
        images: [
          { url: '/images/coffee-maker.jpg', alt: 'Coffee Maker' }
        ],
        stock: 26,
        rating: 4.3,
        reviewCount: 145,
        tags: ['coffee', 'appliance', 'kitchen']
      },
      {
        name: 'Blender Pro',
        description: 'High-power blender with digital display and 10-speed settings',
        price: 3499,
        originalPrice: 5999,
        category: 'Home Appliances',
        subcategory: 'Kitchen',
        images: [
          { url: '/images/blender.jpg', alt: 'Blender' }
        ],
        stock: 31,
        rating: 4.5,
        reviewCount: 167,
        tags: ['blender', 'appliance', 'kitchen']
      },
      {
        name: 'Gaming Mouse',
        description: 'Ultra-fast gaming mouse with 16,000 DPI and RGB lighting',
        price: 2499,
        originalPrice: 4499,
        category: 'Electronics',
        subcategory: 'Gaming',
        images: [
          { url: '/images/gaming-mouse.jpg', alt: 'Gaming Mouse' }
        ],
        stock: 33,
        rating: 4.6,
        reviewCount: 298,
        tags: ['gaming', 'mouse', 'peripheral']
      },
      {
        name: 'Gaming Headset',
        description: 'Professional gaming headset with 7.1 surround sound and noise canceling',
        price: 5999,
        originalPrice: 9999,
        category: 'Electronics',
        subcategory: 'Gaming',
        images: [
          { url: '/images/wireless-headphones.jpg', alt: 'Gaming Headset' }
        ],
        stock: 24,
        rating: 4.7,
        reviewCount: 312,
        tags: ['headset', 'gaming', 'audio']
      },
      {
        name: 'Casual T-Shirt',
        description: 'Premium cotton casual t-shirt with breathable fabric',
        price: 799,
        originalPrice: 1499,
        category: 'Fashion & Accessories',
        subcategory: 'Clothing',
        images: [
          { url: '/images/casual-tshirt.jpg', alt: 'T-Shirt' }
        ],
        stock: 80,
        rating: 4.2,
        reviewCount: 342,
        tags: ['shirt', 'casual', 'clothing']
      },
      {
        name: 'Denim Jeans',
        description: 'Classic denim jeans with comfortable fit and durable material',
        price: 1599,
        originalPrice: 2999,
        category: 'Fashion & Accessories',
        subcategory: 'Clothing',
        images: [
          { url: '/images/denim-jeans.jpg', alt: 'Jeans' }
        ],
        stock: 65,
        rating: 4.3,
        reviewCount: 298,
        tags: ['jeans', 'denim', 'clothing']
      },
      {
        name: 'Sunglasses UV Protection',
        description: 'Stylish sunglasses with UV400 protection and polarized lenses',
        price: 1299,
        originalPrice: 2499,
        category: 'Fashion & Accessories',
        subcategory: 'Eyewear',
        images: [
          { url: '/images/sunglasses.jpg', alt: 'Sunglasses' }
        ],
        stock: 50,
        rating: 4.4,
        reviewCount: 156,
        tags: ['sunglasses', 'uv', 'eyewear']
      },
      {
        name: 'Leather Belt',
        description: 'Premium genuine leather belt with stainless steel buckle',
        price: 899,
        originalPrice: 1799,
        category: 'Fashion & Accessories',
        subcategory: 'Accessories',
        images: [
          { url: '/images/leather-belt.jpg', alt: 'Belt' }
        ],
        stock: 55,
        rating: 4.3,
        reviewCount: 127,
        tags: ['belt', 'leather', 'accessories']
      },
      {
        name: 'Canvas Shoes',
        description: 'Comfortable canvas shoes perfect for casual outings',
        price: 1799,
        originalPrice: 3499,
        category: 'Fashion & Accessories',
        subcategory: 'Footwear',
        images: [
          { url: '/images/canvas-shoes.jpg', alt: 'Canvas Shoes' }
        ],
        stock: 48,
        rating: 4.2,
        reviewCount: 189,
        tags: ['shoes', 'canvas', 'casual']
      },
      {
        name: 'Bed Frame Wooden',
        description: 'Sturdy wooden bed frame with storage drawers',
        price: 14999,
        originalPrice: 24999,
        category: 'Home & Furniture',
        subcategory: 'Bedroom',
        images: [
          { url: '/images/bed-frame.jpg', alt: 'Bed Frame' }
        ],
        stock: 12,
        rating: 4.5,
        reviewCount: 178,
        tags: ['bed', 'furniture', 'bedroom']
      },
      {
        name: 'Wall Shelves Set',
        description: 'Modern floating wall shelves with premium finish',
        price: 2499,
        originalPrice: 4499,
        category: 'Home & Furniture',
        subcategory: 'Storage',
        images: [
          { url: '/images/bookshelf.jpg', alt: 'Wall Shelves' }
        ],
        stock: 42,
        rating: 4.4,
        reviewCount: 203,
        tags: ['shelves', 'storage', 'wall']
      },
      {
        name: 'Dining Table Set',
        description: 'Spacious 6-seater dining table with matching chairs',
        price: 22999,
        originalPrice: 39999,
        category: 'Home & Furniture',
        subcategory: 'Dining',
        images: [
          { url: '/images/dining-table.jpg', alt: 'Dining Table' }
        ],
        stock: 8,
        rating: 4.6,
        reviewCount: 145,
        tags: ['table', 'dining', 'furniture']
      },
      {
        name: 'Sofa 3-Seater',
        description: 'Comfortable 3-seater sofa with premium upholstery',
        price: 24999,
        originalPrice: 44999,
        category: 'Home & Furniture',
        subcategory: 'Seating',
        images: [
          { url: '/images/sofa.jpg', alt: 'Sofa' }
        ],
        stock: 10,
        rating: 4.7,
        reviewCount: 267,
        tags: ['sofa', 'seating', 'furniture']
      },
      {
        name: 'Microwave Oven',
        description: 'Convection microwave oven with multiple cooking modes',
        price: 4999,
        originalPrice: 8999,
        category: 'Home Appliances',
        subcategory: 'Kitchen',
        images: [
          { url: '/images/microwave.jpg', alt: 'Microwave' }
        ],
        stock: 19,
        rating: 4.4,
        reviewCount: 134,
        tags: ['microwave', 'oven', 'appliance']
      },
      {
        name: 'Toaster Deluxe',
        description: '4-slice toaster with digital display and multiple settings',
        price: 1999,
        originalPrice: 3499,
        category: 'Home Appliances',
        subcategory: 'Kitchen',
        images: [
          { url: '/images/toaster.jpg', alt: 'Toaster' }
        ],
        stock: 36,
        rating: 4.3,
        reviewCount: 156,
        tags: ['toaster', 'kitchen', 'appliance']
      },
      {
        name: 'Food Processor',
        description: 'Powerful food processor for chopping, slicing and mixing',
        price: 3299,
        originalPrice: 5999,
        category: 'Home Appliances',
        subcategory: 'Kitchen',
        images: [
          { url: '/images/blender.jpg', alt: 'Food Processor' }
        ],
        stock: 24,
        rating: 4.5,
        reviewCount: 189,
        tags: ['processor', 'kitchen', 'appliance']
      },
      {
        name: 'Vacuum Cleaner',
        description: 'Powerful cordless vacuum cleaner with HEPA filter',
        price: 9999,
        originalPrice: 16999,
        category: 'Home Appliances',
        subcategory: 'Cleaning',
        images: [
          { url: '/images/vacuum-cleaner.jpg', alt: 'Vacuum' }
        ],
        stock: 16,
        rating: 4.6,
        reviewCount: 212,
        tags: ['vacuum', 'cleaner', 'appliance']
      },
      {
        name: 'Table Lamp',
        description: 'Modern table lamp with adjustable brightness and USB charging',
        price: 1299,
        originalPrice: 2499,
        category: 'Home Decor',
        subcategory: 'Lighting',
        images: [
          { url: '/images/table-lamp.jpg', alt: 'Table Lamp' }
        ],
        stock: 44,
        rating: 4.3,
        reviewCount: 198,
        tags: ['lamp', 'light', 'decor']
      },
      {
        name: 'Wall Clock',
        description: 'Elegant wall clock with silent operation and modern design',
        price: 799,
        originalPrice: 1499,
        category: 'Home Decor',
        subcategory: 'Accessories',
        images: [
          { url: '/images/wall-clock.jpg', alt: 'Wall Clock' }
        ],
        stock: 58,
        rating: 4.2,
        reviewCount: 176,
        tags: ['clock', 'wall', 'decor']
      },
      {
        name: 'Decorative Cushions',
        description: 'Set of 4 decorative cushion covers with premium fabric',
        price: 1599,
        originalPrice: 2999,
        category: 'Home Decor',
        subcategory: 'Soft Furnishings',
        images: [
          { url: '/images/decorative-pillow.jpg', alt: 'Cushions' }
        ],
        stock: 52,
        rating: 4.4,
        reviewCount: 223,
        tags: ['cushion', 'decor', 'soft']
      },
      {
        name: 'Wall Art Canvas',
        description: 'Modern wall art canvas prints with vibrant colors',
        price: 2299,
        originalPrice: 4499,
        category: 'Home Decor',
        subcategory: 'Wall Art',
        images: [
          { url: '/images/wall-art.jpg', alt: 'Canvas Art' }
        ],
        stock: 35,
        rating: 4.5,
        reviewCount: 145,
        tags: ['art', 'canvas', 'wall']
      },
      {
        name: 'Area Rug',
        description: 'Soft area rug with traditional pattern and non-slip backing',
        price: 3999,
        originalPrice: 7499,
        category: 'Home Decor',
        subcategory: 'Rugs',
        images: [
          { url: '/images/rug.jpg', alt: 'Area Rug' }
        ],
        stock: 28,
        rating: 4.3,
        reviewCount: 167,
        tags: ['rug', 'decor', 'floor']
      },
      {
        name: 'Door Mat',
        description: 'Durable entrance door mat with attractive design',
        price: 499,
        originalPrice: 999,
        category: 'Home Decor',
        subcategory: 'Accessories',
        images: [
          { url: '/images/door-mat.jpg', alt: 'Door Mat' }
        ],
        stock: 72,
        rating: 4.1,
        reviewCount: 134,
        tags: ['doormat', 'decor', 'entrance']
      }
    ];

    const createdProducts = await Product.insertMany(products.map(p => ({
      ...p,
      createdBy: admin._id
    })));
    console.log(`✓ ${createdProducts.length} products created`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nDemo Credentials:');
    console.log('Admin - Email: admin@flipcart.com, Password: password');
    console.log('Customer - Email: user@flipcart.com, Password: password');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
}

seedDatabase();

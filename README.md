# Flipcart - Full Stack E-Commerce Platform

A modern, pixel-perfect, fully responsive e-commerce platform built with React, TypeScript, Node.js, Express, MongoDB, and TailwindCSS.

## 🚀 Features

### Customer Features
- ✅ User Authentication (Register/Login)
- ✅ Product Catalog with Search & Filters
- ✅ Product Details Page with Images & Ratings
- ✅ Shopping Cart Management
- ✅ Order Placement & Tracking
- ✅ User Profile Management
- ✅ Order History
- ✅ Responsive Design (Mobile, Tablet, Desktop)

### Admin Features
- ✅ Admin Dashboard
- ✅ Product Management (Create, Read, Update, Delete)
- ✅ Order Management & Status Tracking
- ✅ Category Management
- ✅ Inventory Control

### Security & Performance
- ✅ JWT Authentication
- ✅ Protected Routes
- ✅ Password Hashing (bcryptjs)
- ✅ CORS Enabled
- ✅ Input Validation
- ✅ Error Handling

## 📁 Project Structure

```
E-commerce web/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
│   ├── package.json
│   ├── .env
│   └── README.md
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── store/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **React Router DOM** - Navigation
- **Zustand** - State Management
- **Axios** - HTTP Client
- **TailwindCSS** - Styling
- **React Icons** - Icon Library
- **Vite** - Build Tool

### Backend
- **Node.js** - Runtime
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password Hashing
- **CORS** - Cross-Origin Resource Sharing

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

## 🚀 Installation & Setup

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file with following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/flipcart
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

Start MongoDB locally or use MongoDB Atlas connection string.

Start the backend server:
```bash
npm run dev
```

Backend will run on: `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Start the development server:
```bash
npm run dev
```

Frontend will run on: `http://localhost:3000`

## 🔑 Demo Credentials

### Admin Account
- Email: `admin@flipcart.com`
- Password: `password`

### Customer Account
- Email: `user@flipcart.com`
- Password: `password`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products (paginated)
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/categories` - Get all categories
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/:productId` - Update cart item
- `DELETE /api/cart/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/admin/all` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)
- `PUT /api/orders/:id/cancel` - Cancel order

## 🎨 Responsive Design

The application is fully responsive and optimized for:
- **Mobile** (320px - 640px)
- **Tablet** (641px - 1024px)
- **Desktop** (1025px and above)

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes (Customer & Admin)
- Input validation on both frontend and backend
- CORS protection
- Environment variables for sensitive data

## 🚀 Building for Production

### Backend
```bash
cd backend
npm install
# Update .env with production values
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run build
# Serve the dist folder
```

## 📱 Features Documentation

### Product Management
- Search products by name or description
- Filter by category
- View product details with ratings
- Add/remove from wishlist

### Shopping
- Add products to cart
- Update quantities
- Remove items
- Apply discount codes (future)
- Multiple payment methods (future)

### Order Management
- Place orders with shipping details
- Track order status
- Cancel pending orders
- Order history

### Admin Panel
- Dashboard with statistics
- Product CRUD operations
- Order management
- Inventory tracking

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or use MongoDB Atlas
- Check connection string in `.env`

### Port Already in Use
- Change PORT in `.env` (backend)
- Change port in `vite.config.js` (frontend)

### CORS Errors
- Ensure backend CORS is properly configured
- Check API_URL in frontend `services/api.js`

### Build Errors
- Clear node_modules and reinstall: `npm install`
- Clear cache: `npm cache clean --force`

## 📞 Support

For issues and questions, please open an issue on the repository.

---

**Happy Shopping! 🛍️**

# ShopHub Backend API

RESTful API for the ShopHub e-commerce platform built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

Create `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/flipcart
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### Database Setup

1. **Start MongoDB** (if using local):
```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

2. **Seed Sample Data**:
```bash
npm run seed
```

This will create:
- Admin user (admin@flipcart.com / password)
- Customer user (user@flipcart.com / password)
- 10 sample products across different categories

### Running the Server

**Development mode**:
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

Server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
Use JWT token in Authorization header:
```
Authorization: Bearer <token>
```

### Response Format
```json
{
  "message": "Success message",
  "data": {}
}
```

## 🔐 Authentication Endpoints

### Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer"
}
```

### Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### Get Profile
```
GET /auth/profile
Authorization: Bearer <token>
```

### Update Profile
```
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "+91-1234567890",
  "address": {
    "street": "123 Main St",
    "city": "Delhi",
    "state": "Delhi",
    "country": "India",
    "zipCode": "110001"
  }
}
```

## 📦 Product Endpoints

### Get All Products
```
GET /products?page=1&limit=12&category=Electronics&search=headphones
```

### Get Product by ID
```
GET /products/{id}
```

### Get All Categories
```
GET /products/categories
```

### Get Products by Category
```
GET /products/category/Electronics
```

### Create Product (Admin)
```
POST /products
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 999,
  "originalPrice": 1999,
  "category": "Electronics",
  "subcategory": "Accessories",
  "images": [
    { "url": "https://...", "alt": "Product" }
  ],
  "stock": 50,
  "tags": ["tag1", "tag2"]
}
```

### Update Product (Admin)
```
PUT /products/{id}
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 899,
  "stock": 45
}
```

### Delete Product (Admin)
```
DELETE /products/{id}
Authorization: Bearer <admin-token>
```

## 🛒 Cart Endpoints

### Get Cart
```
GET /cart
Authorization: Bearer <token>
```

### Add to Cart
```
POST /cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "...",
  "quantity": 1
}
```

### Update Cart Item
```
PUT /cart/{productId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 2
}
```

### Remove from Cart
```
DELETE /cart/{productId}
Authorization: Bearer <token>
```

### Clear Cart
```
DELETE /cart
Authorization: Bearer <token>
```

## 📋 Order Endpoints

### Create Order
```
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Delhi",
    "state": "Delhi",
    "country": "India",
    "zipCode": "110001",
    "phoneNumber": "+91-1234567890"
  },
  "paymentMethod": "cod",
  "notes": "Deliver after 5 PM"
}
```

### Get My Orders
```
GET /orders
Authorization: Bearer <token>
```

### Get Order by ID
```
GET /orders/{id}
Authorization: Bearer <token>
```

### Get All Orders (Admin)
```
GET /orders/admin/all?page=1&limit=10&status=pending
Authorization: Bearer <admin-token>
```

### Update Order Status (Admin)
```
PUT /orders/{id}/status
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "orderStatus": "shipped",
  "paymentStatus": "completed"
}
```

### Cancel Order
```
PUT /orders/{id}/cancel
Authorization: Bearer <token>
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── index.js          # Configuration
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   └── auth.js            # Authentication & Authorization
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── utils/
│   │   ├── helpers.js         # Password hashing, order generation
│   │   └── jwt.js             # JWT token management
│   ├── seed.js                # Database seeding
│   └── server.js              # Express server
├── package.json
├── .env
└── README.md
```

## 🔒 Security Features

- **JWT Authentication**: Token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Protected Routes**: Role-based access control (Customer/Admin)
- **Input Validation**: Server-side validation for all endpoints
- **CORS**: Cross-origin request handling
- **Environment Variables**: Sensitive data protection

## 🚨 Error Handling

All errors return appropriate HTTP status codes:

- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not authorized
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists
- `500 Internal Server Error` - Server error

Error Response Format:
```json
{
  "message": "Error description",
  "error": "Error details"
}
```

## 📊 Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (customer/admin),
  phone: String,
  address: Object,
  profileImage: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  category: String,
  images: Array,
  stock: Number,
  rating: Number,
  reviewCount: Number,
  tags: Array,
  isActive: Boolean,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Cart
```javascript
{
  userId: ObjectId (ref: User),
  items: Array,
  totalPrice: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  userId: ObjectId (ref: User),
  orderNumber: String (unique),
  items: Array,
  totalAmount: Number,
  shippingAddress: Object,
  paymentMethod: String,
  paymentStatus: String,
  orderStatus: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

Use Postman or similar tools to test API endpoints. Import the base URL and test with the provided examples.

## 📝 Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/flipcart

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this project as you wish!

---

**API Documentation Generated**: December 2024

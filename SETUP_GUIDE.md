# 🚀 ShopHub E-Commerce Platform - Setup Guide

Complete step-by-step guide to get the ShopHub e-commerce platform running.

## 📋 Prerequisites

Before you start, make sure you have:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or MongoDB Atlas) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** - VS Code recommended - [Download](https://code.visualstudio.com/)

## ✅ Verification

Check if Node.js and npm are installed:
```bash
node --version
npm --version
```

## 🔧 Installation Steps

### Step 1: Backend Setup (Important!)

Navigate to the backend folder:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create `.env` file in the backend folder with:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shophub
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

**For MongoDB:**
- **Option A (Local MongoDB)**: 
  - Download and install MongoDB Community Edition
  - Start MongoDB service:
    - Windows: `mongod` in command prompt
    - Mac: `brew services start mongodb-community`
    - Linux: `sudo systemctl start mongod`

- **Option B (MongoDB Atlas - Cloud)**:
  - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  - Create free account
  - Create a cluster
  - Get connection string and add to `.env` file:
    ```
    MONGODB_URI=<your-mongodb-atlas-connection-string>
    ```
    ⚠️ **Get your connection string from MongoDB Atlas dashboard and keep it secret in `.env` file**

**Seed the database** (creates demo users and products):
```bash
npm run seed
```

You'll see:
```
✓ Admin user created
✓ Customer user created
✓ 10 products created
✓ Database seeding completed successfully!
```

**Start the backend server**:
```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected
```

Keep this terminal running!

### Step 2: Frontend Setup

Open a **new terminal** and navigate to frontend:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

This installs:
- React, React Router, Zustand
- Axios, TailwindCSS
- React Icons and Vite

Start the frontend development server:
```bash
npm run dev
```

You should see:
```
  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

## 🌐 Access the Application

Open your browser and visit:
```
http://localhost:3000
```

## 🔑 Demo Credentials

### Admin Account
- **Email**: admin@shophub.com
- **Password**: password

### Customer Account
- **Email**: user@shophub.com
- **Password**: password

## 📱 Testing the Application

### 1. Customer Flow
1. Go to homepage - see product listing
2. Click Login → Use customer credentials
3. View products, search, and filter by category
4. Click on product → View details, add to cart
5. Go to Cart → Update quantities, proceed to checkout
6. Enter shipping details → Place order
7. Go to Orders → See order history and status

### 2. Admin Flow
1. Login with admin credentials
2. Click Admin button in header
3. **Products Tab**:
   - Add new product
   - Edit existing products
   - Delete products (soft delete)
   - View inventory

4. **Orders Tab**:
   - View all customer orders
   - Update order status (Pending → Processing → Shipped → Delivered)
   - See order details

### 3. Shopping Features
- Search products by name
- Filter by category
- View product ratings and reviews count
- See stock availability
- Track discounts (original vs current price)

## 🛠️ Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution**: 
- Make sure MongoDB is running
- Check connection string in `.env`
- Verify port 27017 is not blocked

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**:
- Change PORT in backend `.env` (e.g., PORT=5001)
- Or kill the process using the port

### CORS Error in Frontend
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**:
- Backend CORS is already enabled
- Check that API URL in `src/services/api.js` matches your backend

### npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

### Vite Port Conflict
Change port in `frontend/vite.config.js`:
```javascript
server: {
  port: 3001,  // Change to 3001 or another port
}
```

## 📦 Building for Production

### Backend Production Build
```bash
cd backend
npm start
```

### Frontend Production Build
```bash
cd frontend
npm run build
npm run preview
```

## 🎨 Customization

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color'
    }
  }
}
```

### Add New Products via Admin Panel
1. Login as admin
2. Go to Admin Dashboard
3. Click "Add Product"
4. Fill in details:
   - Name
   - Description
   - Price & Original Price
   - Category
   - Stock quantity
   - Images (URLs from Unsplash, Pexels, etc.)
   - Tags

### Database Management
View/manage data using MongoDB Compass:
1. Download [MongoDB Compass](https://www.mongodb.com/products/tools/compass)
2. Connect to: `mongodb://localhost:27017`
3. Browse collections: Users, Products, Carts, Orders

## 🚀 Project Structure Summary

```
E-commerce web/
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── server.js     # Main server
│   │   ├── seed.js       # Demo data
│   │   └── ...
│   └── .env              # Configuration
│
└── frontend/             # React + Vite
    ├── src/
    │   ├── pages/        # Page components
    │   ├── components/   # Reusable components
    │   └── services/     # API calls
    └── index.html        # Entry HTML
```

## 📚 API Endpoints Quick Reference

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get profile
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - List products
- `GET /api/products/:id` - Get details
- `GET /api/products/categories` - Get categories
- `POST /api/products` - Create (admin)
- `PUT /api/products/:id` - Update (admin)
- `DELETE /api/products/:id` - Delete (admin)

### Cart
- `GET /api/cart` - View cart
- `POST /api/cart/add` - Add item
- `PUT /api/cart/:productId` - Update quantity
- `DELETE /api/cart/:productId` - Remove item

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - My orders
- `GET /api/orders/admin/all` - All orders (admin)
- `PUT /api/orders/:id/status` - Update status (admin)

## 🔒 Security Notes

1. **Change JWT Secret** in `.env`:
   ```env
   JWT_SECRET=your-very-secure-random-string-min-32-chars
   ```

2. **Change Admin Password** after first login:
   - Login as admin
   - Update profile with new password

3. **Use HTTPS** in production

4. **Hide .env** file:
   - Already in `.gitignore`
   - Never commit sensitive data

## 📊 Monitoring

### Check API Health
```
http://localhost:5000/api/health
```

### View Database
Use MongoDB Compass to inspect collections

### Check Console Logs
- Backend: Terminal running `npm run dev`
- Frontend: Browser Developer Tools (F12)

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [JWT.io](https://jwt.io)

## 🆘 Need Help?

1. Check the README.md files in each folder
2. Look at console errors (Ctrl+Shift+K in browser)
3. Verify all services are running
4. Check MongoDB connection
5. Restart both servers

## ✨ Features Implemented

✅ User Authentication (JWT)
✅ Product Management
✅ Shopping Cart
✅ Order Management
✅ Admin Dashboard
✅ Responsive Design
✅ Search & Filter
✅ Order Status Tracking
✅ Payment Method Support (COD)
✅ Image Management

## 🚀 Ready to Deploy?

See deployment guides in each README:
- Backend: `backend/README.md`
- Frontend: `frontend/README.md`

---

**Congratulations! Your ShopHub e-commerce platform is ready to use! 🎉**

For detailed API documentation, see `backend/README.md`
For frontend development, see `frontend/README.md`

# ⚡ Quick Commands Reference

Fast reference for all commonly used commands.

---

## 🚀 Startup Commands

### Terminal 1: Backend Server
```bash
cd backend
npm install
npm run seed
npm run dev
```

**Expected Output**:
```
Server running on port 5000
MongoDB connected
```

### Terminal 2: Frontend Server
```bash
cd frontend
npm install
npm run dev
```

**Expected Output**:
```
Local:   http://localhost:3000/
```

---

## 📍 Quick URLs

| Page | URL |
|------|-----|
| Home | `http://localhost:3000` |
| Login | `http://localhost:3000/login` |
| Signup | `http://localhost:3000/signup` |
| Products | `http://localhost:3000` |
| Product Detail | `http://localhost:3000/product/:id` |
| Cart | `http://localhost:3000/cart` |
| Orders | `http://localhost:3000/orders` |
| Admin | `http://localhost:3000/admin` |
| API Health | `http://localhost:5000/api/health` |

---

## 🔑 Demo Credentials

### Admin Account
```
Email: admin@shophub.com
Password: password
```

### Customer Account
```
Email: user@shophub.com
Password: password
```

---

## 🛠️ Development Commands

### Backend

```bash
# Install dependencies
cd backend && npm install

# Seed database with demo data
npm run seed

# Start development server (auto-reload)
npm run dev

# Start production server
npm start

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json && npm install
```

### Frontend

```bash
# Install dependencies
cd frontend && npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json && npm install
```

---

## 🗂️ File Structure Quick Reference

```
backend/
├── src/
│   ├── server.js          # Main server
│   ├── seed.js            # Demo data seeder
│   ├── config/            # Config files
│   ├── models/            # Database schemas
│   ├── controllers/       # Business logic
│   ├── routes/            # API routes
│   ├── middleware/        # Middleware (auth)
│   └── utils/             # Helper functions
├── .env                   # Environment variables
└── package.json

frontend/
├── src/
│   ├── main.jsx           # Entry point
│   ├── App.jsx            # Main app component
│   ├── pages/             # Page components
│   ├── components/        # Reusable components
│   ├── services/          # API calls
│   ├── store/             # State management
│   └── index.css          # Global styles
├── index.html             # HTML template
├── vite.config.js         # Vite config
├── tailwind.config.js     # Tailwind config
└── package.json
```

---

## 🔗 API Endpoints Quick Reference

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile
PUT    /api/auth/profile
```

### Products
```
GET    /api/products                    (paginated)
GET    /api/products/:id
GET    /api/products/categories
GET    /api/products/category/:category
POST   /api/products                    (admin)
PUT    /api/products/:id                (admin)
DELETE /api/products/:id                (admin)
```

### Cart
```
GET    /api/cart
POST   /api/cart/add
PUT    /api/cart/:productId
DELETE /api/cart/:productId
DELETE /api/cart
```

### Orders
```
POST   /api/orders
GET    /api/orders
GET    /api/orders/:id
GET    /api/orders/admin/all            (admin)
PUT    /api/orders/:id/status           (admin)
PUT    /api/orders/:id/cancel
```

---

## 🧪 Testing Commands

### Using Postman/Insomnia

#### 1. Register
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "role": "customer"
}
```

#### 2. Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@shophub.com",
  "password": "password"
}
```

#### 3. Get Products
```
GET http://localhost:5000/api/products?page=1&limit=12&category=Electronics&search=headphones
```

#### 4. Get Cart
```
GET http://localhost:5000/api/cart
Authorization: Bearer <token>
```

#### 5. Add to Cart
```
POST http://localhost:5000/api/cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "<product_id>",
  "quantity": 1
}
```

---

## 🐛 Debugging Commands

### Check Node Version
```bash
node --version
```

### Check npm Version
```bash
npm --version
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Kill Process on Port
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Check MongoDB Connection
```bash
# Test connection
mongosh mongodb://localhost:27017

# Show databases
show dbs

# Use flipcart database
use flipcart

# Show collections
show collections

# Count documents
db.users.countDocuments()
```

---

## 📦 Environment Variables

### Backend `.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/flipcart
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### Frontend `.env` (optional, in frontend folder)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📝 Git Commands (if using Git)

```bash
# Initialize repo
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Flipcart e-commerce platform"

# Add remote
git remote add origin <your-repo-url>

# Push to remote
git push -u origin main
```

---

## 🚀 Deployment Commands

### Build Backend
```bash
cd backend
npm install
npm start
```

### Build Frontend
```bash
cd frontend
npm install
npm run build
```

---

## 📊 Database Commands

### Seed Database
```bash
cd backend
npm run seed
```

### View Database in Compass
1. Download MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Browse collections

### Reset Database
```bash
# Delete all data (careful!)
# In MongoDB Compass:
# 1. Right-click database
# 2. Select "Drop Database"
# Then run: npm run seed
```

---

## 🔍 Useful Browser DevTools

### Check Network
- Press F12
- Click Network tab
- Perform action
- Check request/response

### Check Console
- Press F12 → Console
- Look for errors (red text)
- Check API responses

### Check Application/Storage
- Press F12 → Application
- View localStorage (tokens, user data)
- Clear cache if needed

---

## 💡 Troubleshooting Quick Fixes

### Port 5000 In Use
```bash
lsof -ti:5000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :5000   # Windows
```

### MongoDB Connection Failed
```bash
# Start MongoDB
mongod

# Or use MongoDB Atlas URL in .env
```

### npm install Fails
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear everything and reinstall
rm -rf node_modules
npm install
npm run dev
```

### CORS Errors
Check API URL in `frontend/src/services/api.js`
Should be: `http://localhost:5000/api`

### Token Expired
Clear localStorage and login again:
```javascript
localStorage.clear()
// Refresh page
```

---

## 📱 Testing on Different Devices

### Chrome DevTools
1. Press F12
2. Click device icon (top left)
3. Select device type

### Local Network Testing
```bash
# Find your machine IP
# Windows: ipconfig
# Mac/Linux: ifconfig

# Then visit:
http://<your-ip>:3000
http://<your-ip>:5000/api/health
```

---

## 🎯 Performance Testing

### Lighthouse (Chrome)
1. Press F12
2. Click Lighthouse tab
3. Select Mobile/Desktop
4. Click Analyze page load

### Network Throttling
1. Press F12 → Network
2. Set throttle to "Slow 3G"
3. Refresh and check performance

---

## 📚 Essential Docs Links

- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [TailwindCSS Docs](https://tailwindcss.com)
- [JWT.io](https://jwt.io)
- [React Router](https://reactrouter.com)
- [Zustand](https://github.com/pmndrs/zustand)

---

## 🆘 Getting Help

1. **Check Documentation**:
   - `SETUP_GUIDE.md` - Setup issues
   - `backend/README.md` - API issues
   - `frontend/README.md` - Frontend issues

2. **Check Console Errors**:
   - Backend: Terminal
   - Frontend: Browser (F12)

3. **Check Database**:
   - Use MongoDB Compass
   - Verify collections exist

4. **Restart Servers**:
   - Kill processes
   - Run npm commands again

---

## ✨ Quick Win Commands

```bash
# One-liner setup (from project root)
cd backend && npm install && npm run seed && npm run dev &
cd ../frontend && npm install && npm run dev

# Check everything is running
curl http://localhost:5000/api/health
curl http://localhost:3000

# View all processes
ps aux | grep node

# Kill all node processes
killall node
```

---

**Save this file for quick reference! 📌**

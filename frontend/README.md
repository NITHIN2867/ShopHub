# Flipcart Frontend

Modern, responsive React frontend for the Flipcart e-commerce platform.

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

### Production Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx         # Navigation header
│   │   ├── Footer.jsx         # Footer component
│   │   └── ProductCard.jsx    # Product display card
│   ├── pages/
│   │   ├── Home.jsx           # Home/Products page
│   │   ├── Login.jsx          # Login page
│   │   ├── Signup.jsx         # Registration page
│   │   ├── ProductDetail.jsx  # Product details page
│   │   ├── Cart.jsx           # Shopping cart
│   │   ├── Orders.jsx         # Order history
│   │   └── AdminDashboard.jsx # Admin panel
│   ├── services/
│   │   └── api.js             # API service calls
│   ├── store/
│   │   ├── authStore.js       # Auth state (Zustand)
│   │   └── cartStore.js       # Cart state (Zustand)
│   ├── App.jsx                # Main App component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html                 # HTML template
├── package.json
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # TailwindCSS config
├── postcss.config.js          # PostCSS config
└── README.md
```

## 🎨 Features

### Pages
- **Home** - Product listing with search & filters
- **Product Detail** - Full product information
- **Login/Signup** - User authentication
- **Cart** - Shopping cart management
- **Orders** - Order history and tracking
- **Admin Dashboard** - Product & order management

### Components
- **Header** - Responsive navigation
- **Footer** - Site footer
- **ProductCard** - Product display card

### State Management
- **Zustand** - Lightweight state management
- **Auth Store** - User authentication state
- **Cart Store** - Shopping cart state

## 🔧 Configuration

### API Configuration
Update `src/services/api.js` if your backend URL is different:

```javascript
const API_URL = 'http://localhost:5000/api';
```

### Tailwind Configuration
Customize styles in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#1e40af',
      secondary: '#0ea5e9'
    }
  }
}
```

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

## 🔐 Authentication

The app uses JWT tokens stored in localStorage:

```javascript
// Token stored as:
localStorage.setItem('token', 'jwt-token');
localStorage.setItem('user', JSON.stringify(user));
```

Protected routes redirect to login if not authenticated.

## 📦 Dependencies

### Main Dependencies
- `react` - UI library
- `react-dom` - React DOM
- `react-router-dom` - Routing
- `axios` - HTTP client
- `zustand` - State management
- `react-icons` - Icon library

### Dev Dependencies
- `vite` - Build tool
- `tailwindcss` - Styling
- `autoprefixer` - CSS vendor prefixes
- `postcss` - CSS processing

## 🎯 Key Features

### Customer Features
- ✅ Browse products with search and filters
- ✅ View detailed product information
- ✅ Add/remove items from cart
- ✅ Place orders with shipping details
- ✅ Track order status
- ✅ Manage user profile
- ✅ View order history

### Admin Features
- ✅ Add new products
- ✅ Edit product details
- ✅ Delete products
- ✅ Manage orders
- ✅ Update order status
- ✅ View all orders

### Responsive Design
- ✅ Mobile-first approach
- ✅ Tablet optimized
- ✅ Desktop responsive
- ✅ Touch-friendly buttons
- ✅ Optimized images

## 🚀 Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

### Deployment Options
- Vercel
- Netlify
- AWS Amplify
- GitHub Pages
- Any static hosting service

### Environment Variables for Production

Create `.env.production`:
```
VITE_API_URL=https://your-api.com/api
```

## 🔍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## ⚡ Performance

- Lazy loading components
- Code splitting with React Router
- Image optimization
- CSS minification
- Bundle size optimization

## 🎨 Styling

Uses **TailwindCSS** for utility-first styling:

```html
<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
  Click me
</button>
```

### Color Scheme
- Primary Blue: `#1e40af`
- Secondary Blue: `#0ea5e9`
- Gray Scale: 50-900
- Alert Colors: Red, Green, Yellow

## 🛠️ Development Tools

### Recommended VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint

### Debugging
- React Developer Tools browser extension
- Redux DevTools (if using Redux)
- Zustand DevTools integration

## 📝 Code Standards

### Component Structure
```javascript
// Imports
import { useState, useEffect } from 'react';

// Component
export default function ComponentName() {
  // State
  const [data, setData] = useState(null);

  // Effects
  useEffect(() => {
    // Code
  }, []);

  // Handlers
  const handleEvent = () => {};

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Naming Conventions
- Components: PascalCase (Header, ProductCard)
- Functions: camelCase (handleClick, fetchData)
- Constants: UPPER_SNAKE_CASE (API_URL, MAX_ITEMS)
- Files: match component name or lowercase for utilities

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Commit with clear messages
4. Push and create a pull request

## 📄 License

MIT License - use freely!

---

**Happy Coding! 🚀**

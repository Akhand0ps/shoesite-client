# Shoesite Client

Modern, minimalistic e-commerce frontend for the Shoesite application. Built with React, Tailwind CSS, and Vite.

## Features

- 🎨 **Minimalistic Design**: Clean, modern UI inspired by contemporary web design
- 🔐 **Authentication**: JWT-based user authentication with protected routes
- 🛒 **Shopping Cart**: Real-time cart management with quantity controls
- 📦 **Order Management**: Place orders, track status, and view order history
- 🔍 **Product Search**: Search and browse products with detailed views
- 📱 **Responsive**: Fully responsive design for mobile, tablet, and desktop
- ⚡ **Fast**: Built with Vite for lightning-fast development and builds

## Tech Stack

- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Axios** - HTTP client with interceptors
- **Vite** - Build tool and dev server

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Backend server running (see shoesite-server)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Update API endpoint:
   - Open `src/api/axios.js`
   - Update `baseURL` if your backend is not on `http://localhost:3000`

3. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── api/
│   └── axios.js           # Axios instance with interceptors
├── components/
│   ├── Navbar.jsx         # Navigation bar with cart count
│   └── ProductCard.jsx    # Product card component
├── context/
│   ├── AuthContext.jsx    # Authentication state management
│   └── CartContext.jsx    # Shopping cart state management
├── pages/
│   ├── Home.jsx           # Landing page
│   ├── Login.jsx          # Login page
│   ├── Register.jsx       # Registration page
│   ├── Products.jsx       # Products listing
│   ├── ProductDetail.jsx  # Single product view
│   ├── Cart.jsx           # Shopping cart
│   ├── Checkout.jsx       # Checkout page
│   ├── Orders.jsx         # Order history
│   └── OrderDetail.jsx    # Single order view
├── App.jsx                # Main app component with routes
├── main.jsx              # App entry point
└── index.css             # Global styles
```

## Available Routes

- `/` - Home page
- `/login` - User login
- `/register` - User registration
- `/products` - Browse all products
- `/product/:slug` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout page (requires auth)
- `/orders` - Order history (requires auth)
- `/orders/:ordernumber` - Order details (requires auth)

## API Integration

The app connects to the backend API with the following features:

### Authentication
- Register new users
- Login with email/password
- Auto-refresh JWT tokens
- Logout and clear cookies

### Products
- Fetch all products
- Search products
- View product details by slug
- Filter by brand/category

### Cart
- Add items to cart
- Update quantities
- Remove items
- Clear cart

### Orders
- Create orders from cart
- View order history
- View order details
- Cancel pending orders

## Environment Variables

You can create a `.env` file to configure:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

Then update `src/api/axios.js` to use:
```javascript
baseURL: import.meta.env.VITE_API_URL
```

## Building for Production

```bash
npm run build
```

Build output will be in the `dist/` directory.

Preview production build:
```bash
npm run preview
```

## Design Philosophy

The design follows a minimalistic approach inspired by modern web aesthetics:

- **Dark Theme**: Black background with subtle white/gray accents
- **Glass Morphism**: Backdrop blur effects on cards and containers
- **Minimalist Typography**: Clean fonts with clear hierarchy
- **Smooth Transitions**: Subtle hover effects and transitions
- **Responsive Grid**: Mobile-first design with responsive layouts

## Notes

- Make sure the backend server is running before starting the frontend
- Authentication tokens are stored in localStorage and httpOnly cookies
- Cart state syncs automatically when user logs in/out
- All protected routes require authentication

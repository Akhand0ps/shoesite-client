# API Configuration Guide

This guide explains how to configure the frontend to connect to your backend API.

## Default Configuration

By default, the app connects to: `http://localhost:3000/api/v1`

This is configured in [src/api/axios.js](src/api/axios.js#L3-L8)

## Changing the API URL

### Option 1: Direct Edit (Simple)

1. Open `src/api/axios.js`
2. Change the `baseURL` value:

```javascript
const api = axios.create({
  baseURL: 'http://YOUR_BACKEND_URL/api/v1',  // Change this
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### Option 2: Environment Variables (Recommended)

1. Create a `.env` file in the root of `shoesite-client`:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

2. Update `src/api/axios.js` to use the environment variable:

```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

3. For production, set the environment variable in your deployment platform:
   - Vercel: Add in Settings → Environment Variables
   - Netlify: Add in Site Settings → Environment Variables
   - Custom server: Add to `.env` file

## Common Backend URLs

### Development
```
http://localhost:3000/api/v1
```

### Production Examples
```
https://your-backend.herokuapp.com/api/v1
https://api.yourshoesite.com/api/v1
https://your-backend.onrender.com/api/v1
```

## CORS Configuration

Your backend must allow requests from your frontend URL.

### Backend CORS Setup (Express)

In your `shoesite-server/src/app.js` or `server.js`:

```javascript
import cors from 'cors';

app.use(cors({
  origin: [
    'http://localhost:5173',        // Development
    'https://your-frontend.vercel.app'  // Production
  ],
  credentials: true
}));
```

## Testing the Connection

### 1. Check if backend is running

Open your browser and go to:
```
http://localhost:3000/api/v1/product/products
```

You should see product data (or an auth error, which is fine).

### 2. Check from frontend

Open the browser console on your frontend app and run:

```javascript
fetch('http://localhost:3000/api/v1/product/products', {
  credentials: 'include'
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

### 3. Network Tab

1. Open DevTools → Network tab
2. Try logging in on your frontend
3. Look for the login request
4. Check:
   - Request URL matches your backend
   - Response is successful (200)
   - Cookies are set

## Troubleshooting

### Error: "Network Error"

**Possible causes:**
1. Backend is not running
2. Wrong API URL
3. CORS not configured
4. Firewall blocking connection

**Solutions:**
- Check backend is running on correct port
- Verify API URL in axios.js
- Check CORS configuration in backend
- Try disabling firewall temporarily

### Error: "CORS Error"

**Problem:** Backend not accepting requests from frontend

**Solution:**
```javascript
// In backend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Error: "401 Unauthorized"

**Problem:** Token not being sent or invalid

**Check:**
1. Token is stored in localStorage
2. Authorization header is set
3. Cookies are being sent (`withCredentials: true`)

### Error: "Failed to fetch"

**Possible causes:**
1. Backend crashed
2. Network issue
3. Wrong URL

**Check:**
- Backend console for errors
- Backend is actually running
- URL spelling is correct

## API Endpoints Reference

All endpoints should be prefixed with the base URL.

### Authentication
```
POST /auth/register
POST /auth/login
GET  /auth/refresh
POST /auth/logout
```

### Products
```
GET  /product/products
GET  /product/:slug
GET  /product/searchBar?q=query
```

### Cart
```
POST   /cart/addItem
GET    /cart/viewcart
DELETE /cart/remove/:sku
PATCH  /cart/decrease/:sku
DELETE /cart/clear
```

### Orders
```
POST /order/order
GET  /order/my
GET  /order/:ordernumber
PUT  /order/cancel/:ordernumber
```

## Environment-Specific Configs

### Development
```env
VITE_API_URL=http://localhost:3000/api/v1
```

### Staging
```env
VITE_API_URL=https://staging-api.yoursite.com/api/v1
```

### Production
```env
VITE_API_URL=https://api.yoursite.com/api/v1
```

## Quick Setup Commands

### Start Backend
```bash
cd shoesite-server
npm install
npm run dev
```

### Start Frontend
```bash
cd shoesite-client
npm install
npm run dev
```

### Verify Connection
```bash
# Test backend
curl http://localhost:3000/api/v1/product/products

# Frontend should connect automatically
```

## Additional Notes

- The `withCredentials: true` setting is crucial for cookie-based auth
- Make sure to restart the dev server after changing `.env` files
- In production, use HTTPS for both frontend and backend
- Never commit `.env` files to git (already in .gitignore)

## Support

If you're still having issues:

1. Check backend logs for errors
2. Check browser console for errors
3. Check Network tab in DevTools
4. Verify all URLs and ports
5. Try clearing browser cache and localStorage

---

**Last Updated:** December 12, 2025

# Shoesite Frontend - Testing Checklist

## ✅ Pre-Deployment Testing

### Environment Setup
- [ ] Backend server is running on `http://localhost:3000`
- [ ] Frontend server is running on `http://localhost:5173`
- [ ] MongoDB is connected
- [ ] Cloudinary is configured (for product images)

### Authentication Flow
- [ ] Register a new user account
- [ ] Login with valid credentials
- [ ] Logout successfully
- [ ] Try accessing protected routes when logged out (should redirect to login)
- [ ] Token auto-refresh works (check network tab)

### Product Browsing
- [ ] View all products on `/products`
- [ ] Search for products using search bar
- [ ] Click on a product card to view details
- [ ] Product images display correctly
- [ ] Product variants (sizes) are shown
- [ ] Stock status is visible

### Shopping Cart
- [ ] Add product to cart (must be logged in)
- [ ] Cart badge updates with item count
- [ ] View cart at `/cart`
- [ ] Increase item quantity
- [ ] Decrease item quantity
- [ ] Remove item from cart
- [ ] Clear entire cart

### Checkout Process
- [ ] Navigate to checkout from cart
- [ ] Fill in shipping address form
- [ ] Select payment method
- [ ] Review order summary
- [ ] Place order successfully
- [ ] Redirect to order details page

### Order Management
- [ ] View all orders at `/orders`
- [ ] Click on an order to view details
- [ ] Order status is displayed correctly
- [ ] Cancel pending order (if status is "pending")
- [ ] Cannot cancel processed/shipped orders

### Responsive Design
- [ ] Test on mobile (< 768px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Navigation works on all screen sizes
- [ ] All forms are usable on mobile

### Error Handling
- [ ] Login with wrong credentials shows error
- [ ] Registration with existing email shows error
- [ ] Add to cart with out of stock item shows error
- [ ] Network errors are handled gracefully

### Performance
- [ ] Pages load quickly
- [ ] Images load without flickering
- [ ] No console errors
- [ ] Smooth animations and transitions

### API Integration
- [ ] All API calls use correct endpoints
- [ ] Authorization headers are sent
- [ ] Cookies are set correctly
- [ ] CORS is configured properly

## 🐛 Common Issues & Solutions

### Issue: "Network Error" when calling API
**Solution**: 
- Check if backend is running
- Verify CORS is enabled in backend
- Check API URL in `src/api/axios.js`

### Issue: Cart doesn't update after adding items
**Solution**:
- Make sure user is logged in
- Check if cart endpoint returns data
- Look for errors in browser console

### Issue: Protected routes not working
**Solution**:
- Check if token is stored in localStorage
- Verify token expiration
- Check AuthContext implementation

### Issue: Images not displaying
**Solution**:
- Verify Cloudinary configuration
- Check image URLs in database
- Use placeholder images for testing

### Issue: Token expired error
**Solution**:
- Token refresh should happen automatically
- If not, logout and login again
- Check refresh token endpoint

## 📊 Test Data Needed

### Users
- At least 1 regular user account
- Test with multiple user accounts

### Products
- At least 5-10 products with:
  - Images
  - Multiple variants (sizes)
  - Different prices
  - Different stock levels
  - Different brands

### Categories
- At least 3-4 categories
- Some products in each category

## 🎯 User Journey Test

### Complete Purchase Flow
1. ✅ Open homepage
2. ✅ Click "Shop Now"
3. ✅ Browse products
4. ✅ Search for a specific product
5. ✅ View product details
6. ✅ Select size
7. ✅ Add to cart
8. ✅ View cart
9. ✅ Update quantities
10. ✅ Proceed to checkout
11. ✅ Fill shipping details
12. ✅ Place order
13. ✅ View order confirmation
14. ✅ Check order history

### New User Flow
1. ✅ Land on homepage
2. ✅ Click "Sign Up"
3. ✅ Fill registration form
4. ✅ Submit registration
5. ✅ Login with new account
6. ✅ Start shopping

## 🔍 Edge Cases to Test

- [ ] Add same product multiple times
- [ ] Change quantity beyond stock limit
- [ ] Cancel order immediately after placing
- [ ] Logout while items in cart
- [ ] Login from different browser/device
- [ ] Submit empty forms
- [ ] Very long product names
- [ ] Products with no images
- [ ] Orders with many items

## 📱 Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

## ✨ Final Checklist

- [ ] All features working
- [ ] No console errors
- [ ] No broken links
- [ ] Images load properly
- [ ] Responsive on all devices
- [ ] Good performance
- [ ] Error messages are clear
- [ ] Success messages show
- [ ] Loading states display
- [ ] Navigation is intuitive

## 🚀 Ready for Demo/Submission

- [ ] Backend is running
- [ ] Frontend is running
- [ ] Sample data is loaded
- [ ] Test account credentials ready
- [ ] Screenshots taken (if needed)
- [ ] Demo script prepared
- [ ] Known issues documented

---

**Testing Date**: _____________
**Tested By**: _____________
**Status**: ⬜ Pass | ⬜ Fail | ⬜ In Progress

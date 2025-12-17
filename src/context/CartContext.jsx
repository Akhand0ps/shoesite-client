import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) {
      setCart(null);
      setCartCount(0);
      return;
    }

    try {
      const { data } = await api.get('/cart/viewcart');
      setCart(data.cart);
      setCartCount(data.cart?.items?.length || 0);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      setCart(null);
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (sku, quantity = 1) => {
    try {
      await api.post('/cart/addItem', { sku, quantity });
      await fetchCart();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add to cart' 
      };
    }
  };

  const removeFromCart = async (sku) => {
    try {
      await api.delete(`/cart/remove/${sku}`);
      await fetchCart();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to remove from cart' 
      };
    }
  };

  const decreaseQuantity = async (sku) => {
    try {
      await api.patch(`/cart/decrease/${sku}`);
      await fetchCart();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update cart' 
      };
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/cart/clear');
      await fetchCart();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to clear cart' 
      };
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      cartCount, 
      addToCart, 
      removeFromCart, 
      decreaseQuantity,
      clearCart,
      refreshCart: fetchCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

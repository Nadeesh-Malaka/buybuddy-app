// src/context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useUser } from './UserContext';
import { cartService } from '../services/cartService';

// Create the Cart Context
const CartContext = createContext();

// Cart Provider to wrap the app
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, isLoggedIn } = useUser();

  // Load cart from backend when user logs in
  useEffect(() => {
    if (isLoggedIn && user) {
      loadCartFromBackend();
    } else {
      // Clear cart when user logs out
      setCartItems([]);
    }
  }, [isLoggedIn, user]);

  const loadCartFromBackend = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const backendCartItems = await cartService.getUserCart(user.id);
      
      // Convert backend cart format to frontend format
      const frontendCartItems = backendCartItems.map(item => ({
        id: item.productId,
        cartId: item.id,
        name: item.productName,
        image: item.productImage,
        price: parseFloat(item.productPrice), // Convert BigDecimal to number
        description: item.productDescription,
        quantity: item.quantity
      }));
      
      setCartItems(frontendCartItems);
    } catch (error) {
      console.error('Error loading cart from backend:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    // Check if user is logged in before adding to cart
    if (!isLoggedIn || !user) {
      return { success: false, requiresLogin: true };
    }

    try {
      setLoading(true);
      await cartService.addToCart(user.id, product.id, 1);
      
      // Reload cart from backend to get updated data
      await loadCartFromBackend();
      
      return { success: true, requiresLogin: false };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, requiresLogin: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (!isLoggedIn || !user) {
      return;
    }

    try {
      setLoading(true);
      // Find the cart item to get the cartId
      const cartItem = cartItems.find(item => item.id === productId);
      if (!cartItem) return;

      await cartService.updateCartQuantity(user.id, cartItem.cartId, newQuantity);
      
      // Reload cart from backend
      await loadCartFromBackend();
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (!isLoggedIn || !user) {
      return;
    }

    try {
      setLoading(true);
      // Find the cart item to get the cartId
      const cartItem = cartItems.find(item => item.id === productId);
      if (!cartItem) return;

      await cartService.removeFromCart(user.id, cartItem.cartId);
      
      // Reload cart from backend
      await loadCartFromBackend();
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!isLoggedIn || !user) {
      return;
    }

    try {
      setLoading(true);
      await cartService.clearCart(user.id);
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to clear cart when user logs out
  const clearCartOnLogout = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        clearCartOnLogout,
        loadCartFromBackend,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the Cart Context
export function useCart() {
  return useContext(CartContext);
}
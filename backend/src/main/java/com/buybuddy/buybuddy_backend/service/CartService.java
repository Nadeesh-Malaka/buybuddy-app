package com.buybuddy.buybuddy_backend.service;

import com.buybuddy.buybuddy_backend.dto.AddToCartDTO;
import com.buybuddy.buybuddy_backend.dto.CartDTO;
import com.buybuddy.buybuddy_backend.model.Cart;
import com.buybuddy.buybuddy_backend.model.Product;
import com.buybuddy.buybuddy_backend.model.User;
import com.buybuddy.buybuddy_backend.repo.CartRepository;
import com.buybuddy.buybuddy_backend.repo.ProductRepository;
import com.buybuddy.buybuddy_backend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<CartDTO> getCartByUserId(Integer userId) {
        List<Cart> cartItems = cartRepository.findByUserId(userId);
        return cartItems.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public CartDTO addToCart(Integer userId, AddToCartDTO addToCartDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Product product = productRepository.findById(addToCartDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Check if item already exists in cart
        Optional<Cart> existingCart = cartRepository.findByUserIdAndProductId(userId, addToCartDTO.getProductId());
        
        Cart cart;
        if (existingCart.isPresent()) {
            // Update quantity
            cart = existingCart.get();
            cart.setQuantity(cart.getQuantity() + addToCartDTO.getQuantity());
        } else {
            // Create new cart item
            cart = new Cart();
            cart.setUser(user);
            cart.setProduct(product);
            cart.setQuantity(addToCartDTO.getQuantity());
        }

        cart = cartRepository.save(cart);
        return convertToDTO(cart);
    }

    @Transactional
    public CartDTO updateCartQuantity(Integer userId, Long cartId, Integer quantity) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (!cart.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to cart item");
        }

        if (quantity <= 0) {
            cartRepository.delete(cart);
            return null;
        }

        cart.setQuantity(quantity);
        cart = cartRepository.save(cart);
        return convertToDTO(cart);
    }

    @Transactional
    public void removeFromCart(Integer userId, Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (!cart.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to cart item");
        }

        cartRepository.delete(cart);
    }

    @Transactional
    public void clearCart(Integer userId) {
        cartRepository.deleteByUserId(userId);
    }

    private CartDTO convertToDTO(Cart cart) {
        CartDTO cartDTO = new CartDTO();
        cartDTO.setId(cart.getId());
        cartDTO.setUserId(cart.getUser().getId());
        cartDTO.setProductId(cart.getProduct().getId());
        cartDTO.setProductName(cart.getProduct().getName());
        cartDTO.setProductImage(cart.getProduct().getImage());
        cartDTO.setProductPrice(cart.getProduct().getPrice());
        cartDTO.setProductDescription(cart.getProduct().getDescription());
        cartDTO.setQuantity(cart.getQuantity());
        cartDTO.setTotalPrice(cart.getProduct().getPrice().multiply(BigDecimal.valueOf(cart.getQuantity())));
        return cartDTO;
    }
}

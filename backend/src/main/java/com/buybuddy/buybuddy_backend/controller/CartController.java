package com.buybuddy.buybuddy_backend.controller;

import com.buybuddy.buybuddy_backend.dto.AddToCartDTO;
import com.buybuddy.buybuddy_backend.dto.CartDTO;
import com.buybuddy.buybuddy_backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<CartDTO>> getCartByUserId(@PathVariable Integer userId) {
        try {
            List<CartDTO> cartItems = cartService.getCartByUserId(userId);
            return ResponseEntity.ok(cartItems);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{userId}/add")
    public ResponseEntity<CartDTO> addToCart(
            @PathVariable Integer userId,
            @RequestBody AddToCartDTO addToCartDTO) {
        try {
            CartDTO cartItem = cartService.addToCart(userId, addToCartDTO);
            return ResponseEntity.ok(cartItem);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{userId}/update/{cartId}")
    public ResponseEntity<CartDTO> updateCartQuantity(
            @PathVariable Integer userId,
            @PathVariable Long cartId,
            @RequestParam Integer quantity) {
        try {
            CartDTO cartItem = cartService.updateCartQuantity(userId, cartId, quantity);
            if (cartItem == null) {
                return ResponseEntity.ok().build(); // Item was removed
            }
            return ResponseEntity.ok(cartItem);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{userId}/remove/{cartId}")
    public ResponseEntity<Void> removeFromCart(
            @PathVariable Integer userId,
            @PathVariable Long cartId) {
        try {
            cartService.removeFromCart(userId, cartId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{userId}/clear")
    public ResponseEntity<Void> clearCart(@PathVariable Integer userId) {
        try {
            cartService.clearCart(userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

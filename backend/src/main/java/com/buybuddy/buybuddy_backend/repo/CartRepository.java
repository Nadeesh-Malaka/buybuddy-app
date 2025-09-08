package com.buybuddy.buybuddy_backend.repo;

import com.buybuddy.buybuddy_backend.model.Cart;
import com.buybuddy.buybuddy_backend.model.User;
import com.buybuddy.buybuddy_backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    
    List<Cart> findByUser(User user);
    
    List<Cart> findByUserId(Integer userId);
    
    Optional<Cart> findByUserAndProduct(User user, Product product);
    
    Optional<Cart> findByUserIdAndProductId(Integer userId, Long productId);
    
    void deleteByUser(User user);
    
    void deleteByUserId(Integer userId);
}

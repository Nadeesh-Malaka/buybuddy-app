package com.buybuddy.buybuddy_backend.repo;

import com.buybuddy.buybuddy_backend.model.PaymentMethod;
import com.buybuddy.buybuddy_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Integer> {
    
    List<PaymentMethod> findByUserOrderByIsDefaultDescIdAsc(User user);
    
    Optional<PaymentMethod> findByUserAndIsDefaultTrue(User user);
    
    @Modifying
    @Transactional
    @Query("UPDATE PaymentMethod p SET p.isDefault = false WHERE p.user = :user")
    void resetDefaultPaymentMethod(@Param("user") User user);
}

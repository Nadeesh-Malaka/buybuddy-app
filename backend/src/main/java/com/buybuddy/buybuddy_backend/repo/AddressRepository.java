package com.buybuddy.buybuddy_backend.repo;

import com.buybuddy.buybuddy_backend.model.Address;
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
public interface AddressRepository extends JpaRepository<Address, Integer> {
    
    List<Address> findByUserOrderByIsDefaultDescIdAsc(User user);
    
    Optional<Address> findByUserAndIsDefaultTrue(User user);
    
    @Modifying
    @Transactional
    @Query("UPDATE Address a SET a.isDefault = false WHERE a.user = :user")
    void resetDefaultAddress(@Param("user") User user);
}

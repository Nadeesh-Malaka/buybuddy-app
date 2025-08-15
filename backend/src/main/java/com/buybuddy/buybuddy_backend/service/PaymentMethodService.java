package com.buybuddy.buybuddy_backend.service;

import com.buybuddy.buybuddy_backend.dto.PaymentMethodDTO;
import com.buybuddy.buybuddy_backend.model.PaymentMethod;
import com.buybuddy.buybuddy_backend.model.User;
import com.buybuddy.buybuddy_backend.repo.PaymentMethodRepository;
import com.buybuddy.buybuddy_backend.repo.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class PaymentMethodService {

    private final PaymentMethodRepository paymentMethodRepository;
    private final UserRepository userRepository;

    public PaymentMethodService(PaymentMethodRepository paymentMethodRepository, UserRepository userRepository) {
        this.paymentMethodRepository = paymentMethodRepository;
        this.userRepository = userRepository;
    }

    // Get all payment methods for a user
    public List<PaymentMethod> getUserPaymentMethods(Integer userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found with id: " + userId);
        }
        return paymentMethodRepository.findByUserOrderByIsDefaultDescIdAsc(user.get());
    }

    // Add new payment method
    public PaymentMethod addPaymentMethod(Integer userId, PaymentMethodDTO paymentMethodDTO) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found with id: " + userId);
        }

        // Validate required fields
        if (paymentMethodDTO.getCvv() == null || paymentMethodDTO.getCvv().trim().isEmpty()) {
            throw new RuntimeException("CVV is required for new payment methods");
        }

        User user = userOpt.get();
        PaymentMethod paymentMethod = new PaymentMethod();
        paymentMethod.setUser(user);
        paymentMethod.setCardType(paymentMethodDTO.getCardType());
        paymentMethod.setCardNumber(paymentMethodDTO.getCardNumber());
        paymentMethod.setCardHolderName(paymentMethodDTO.getCardHolderName());
        paymentMethod.setExpiryMonth(paymentMethodDTO.getExpiryMonth());
        paymentMethod.setExpiryYear(paymentMethodDTO.getExpiryYear());
        paymentMethod.setCvv(paymentMethodDTO.getCvv());
        paymentMethod.setBillingAddress(null); // Remove billing address requirement
        paymentMethod.setIsDefault(paymentMethodDTO.getIsDefault() != null ? paymentMethodDTO.getIsDefault() : false);

        // If this is set as default, reset other defaults
        if (paymentMethod.getIsDefault()) {
            paymentMethodRepository.resetDefaultPaymentMethod(user);
        }

        return paymentMethodRepository.save(paymentMethod);
    }

    // Update payment method
    public PaymentMethod updatePaymentMethod(Integer paymentMethodId, PaymentMethodDTO paymentMethodDTO) {
        Optional<PaymentMethod> existingPaymentMethod = paymentMethodRepository.findById(paymentMethodId);
        if (existingPaymentMethod.isEmpty()) {
            throw new RuntimeException("Payment method not found with id: " + paymentMethodId);
        }

        PaymentMethod paymentMethod = existingPaymentMethod.get();
        paymentMethod.setCardType(paymentMethodDTO.getCardType());
        paymentMethod.setCardNumber(paymentMethodDTO.getCardNumber());
        paymentMethod.setCardHolderName(paymentMethodDTO.getCardHolderName());
        paymentMethod.setExpiryMonth(paymentMethodDTO.getExpiryMonth());
        paymentMethod.setExpiryYear(paymentMethodDTO.getExpiryYear());
        
        // Only update CVV if it's provided (not empty)
        if (paymentMethodDTO.getCvv() != null && !paymentMethodDTO.getCvv().trim().isEmpty()) {
            paymentMethod.setCvv(paymentMethodDTO.getCvv());
        }
        
        paymentMethod.setBillingAddress(null); // Remove billing address requirement
        
        // Handle isDefault properly
        Boolean isDefault = paymentMethodDTO.getIsDefault();
        if (isDefault != null && isDefault) {
            // If this is set as default, reset other defaults first
            paymentMethodRepository.resetDefaultPaymentMethod(paymentMethod.getUser());
            paymentMethod.setIsDefault(true);
        } else if (isDefault != null) {
            paymentMethod.setIsDefault(false);
        }

        return paymentMethodRepository.save(paymentMethod);
    }

    // Set payment method as default
    public PaymentMethod setDefaultPaymentMethod(Integer paymentMethodId) {
        Optional<PaymentMethod> paymentMethodOpt = paymentMethodRepository.findById(paymentMethodId);
        if (paymentMethodOpt.isEmpty()) {
            throw new RuntimeException("Payment method not found with id: " + paymentMethodId);
        }

        PaymentMethod paymentMethod = paymentMethodOpt.get();
        // Reset all other payment methods to non-default first
        paymentMethodRepository.resetDefaultPaymentMethod(paymentMethod.getUser());
        // Then set this one as default
        paymentMethod.setIsDefault(true);
        
        return paymentMethodRepository.save(paymentMethod);
    }

    // Delete payment method
    public boolean deletePaymentMethod(Integer paymentMethodId) {
        Optional<PaymentMethod> paymentMethod = paymentMethodRepository.findById(paymentMethodId);
        if (paymentMethod.isPresent()) {
            paymentMethodRepository.deleteById(paymentMethodId);
            return true;
        }
        return false;
    }

    // Get payment method by ID
    public Optional<PaymentMethod> getPaymentMethodById(Integer paymentMethodId) {
        return paymentMethodRepository.findById(paymentMethodId);
    }
}

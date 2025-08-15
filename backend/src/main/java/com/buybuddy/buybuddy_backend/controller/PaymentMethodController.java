package com.buybuddy.buybuddy_backend.controller;

import com.buybuddy.buybuddy_backend.dto.PaymentMethodDTO;
import com.buybuddy.buybuddy_backend.model.PaymentMethod;
import com.buybuddy.buybuddy_backend.service.PaymentMethodService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payment-methods")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentMethodController {

    private final PaymentMethodService paymentMethodService;

    public PaymentMethodController(PaymentMethodService paymentMethodService) {
        this.paymentMethodService = paymentMethodService;
    }

    // Get all payment methods for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PaymentMethod>> getUserPaymentMethods(@PathVariable Integer userId) {
        try {
            List<PaymentMethod> paymentMethods = paymentMethodService.getUserPaymentMethods(userId);
            return ResponseEntity.ok(paymentMethods);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Add new payment method
    @PostMapping("/user/{userId}")
    public ResponseEntity<?> addPaymentMethod(@PathVariable Integer userId, @RequestBody PaymentMethodDTO paymentMethodDTO) {
        try {
            PaymentMethod savedPaymentMethod = paymentMethodService.addPaymentMethod(userId, paymentMethodDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPaymentMethod);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    // Update payment method
    @PutMapping("/{paymentMethodId}")
    public ResponseEntity<?> updatePaymentMethod(@PathVariable Integer paymentMethodId, @RequestBody PaymentMethodDTO paymentMethodDTO) {
        try {
            System.out.println("Updating payment method with ID: " + paymentMethodId);
            System.out.println("Received data: " + paymentMethodDTO);
            PaymentMethod updatedPaymentMethod = paymentMethodService.updatePaymentMethod(paymentMethodId, paymentMethodDTO);
            System.out.println("Update successful: " + updatedPaymentMethod);
            return ResponseEntity.ok(updatedPaymentMethod);
        } catch (RuntimeException e) {
            System.err.println("Error updating payment method: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Unexpected error updating payment method: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unexpected error occurred");
        }
    }

    // Set payment method as default
    @PutMapping("/{paymentMethodId}/set-default")
    public ResponseEntity<?> setDefaultPaymentMethod(@PathVariable Integer paymentMethodId) {
        try {
            PaymentMethod defaultPaymentMethod = paymentMethodService.setDefaultPaymentMethod(paymentMethodId);
            return ResponseEntity.ok(defaultPaymentMethod);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unexpected error occurred");
        }
    }

    // Delete payment method
    @DeleteMapping("/{paymentMethodId}")
    public ResponseEntity<?> deletePaymentMethod(@PathVariable Integer paymentMethodId) {
        boolean deleted = paymentMethodService.deletePaymentMethod(paymentMethodId);
        if (deleted) {
            return ResponseEntity.ok("Payment method deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment method not found");
        }
    }

    // Get payment method by ID
    @GetMapping("/{paymentMethodId}")
    public ResponseEntity<PaymentMethod> getPaymentMethodById(@PathVariable Integer paymentMethodId) {
        Optional<PaymentMethod> paymentMethod = paymentMethodService.getPaymentMethodById(paymentMethodId);
        if (paymentMethod.isPresent()) {
            return ResponseEntity.ok(paymentMethod.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}

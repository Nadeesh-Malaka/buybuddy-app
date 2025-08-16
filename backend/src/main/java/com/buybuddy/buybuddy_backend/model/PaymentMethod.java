package com.buybuddy.buybuddy_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "payment_methods")
@Data
public class PaymentMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "addresses", "paymentMethods", "password"})
    private User user;

    @Column(nullable = false)
    private String cardType; // CREDIT, DEBIT, PAYPAL, etc.

    @Column(nullable = false)
    private String cardHolderName;

    @Column(nullable = false)
    private String cardNumber; // This should be encrypted in production

    @Column(nullable = false)
    private String expiryMonth;

    @Column(nullable = false)
    private String expiryYear;

    @Column(nullable = false)
    private String cvv; // This should be encrypted in production

    @Column(nullable = true)
    private String billingAddress;

    @Column(nullable = false)
    private Boolean isDefault = false;
}

package com.buybuddy.buybuddy_backend.dto;

import lombok.Data;

@Data
public class PaymentMethodDTO {
    private String cardType;
    private String cardHolderName;
    private String cardNumber;
    private String expiryMonth;
    private String expiryYear;
    private String cvv;
    private String billingAddress;
    private Boolean isDefault;
    
    @Override
    public String toString() {
        return "PaymentMethodDTO{" +
                "cardType='" + cardType + '\'' +
                ", cardHolderName='" + cardHolderName + '\'' +
                ", cardNumber='****" + (cardNumber != null && cardNumber.length() > 4 ? cardNumber.substring(cardNumber.length()-4) : "****") + '\'' +
                ", expiryMonth='" + expiryMonth + '\'' +
                ", expiryYear='" + expiryYear + '\'' +
                ", cvv='" + (cvv != null && !cvv.isEmpty() ? "***" : "empty") + '\'' +
                ", billingAddress='" + billingAddress + '\'' +
                ", isDefault=" + isDefault +
                '}';
    }
}

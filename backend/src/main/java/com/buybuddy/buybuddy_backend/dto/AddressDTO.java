package com.buybuddy.buybuddy_backend.dto;

import lombok.Data;

@Data
public class AddressDTO {
    private String fullName;
    private String phoneNumber;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private String addressType;
    private Boolean isDefault;
}

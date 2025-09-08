package com.buybuddy.buybuddy_backend.dto;

import lombok.Data;

@Data
public class AddToCartDTO {
    private Long productId;
    private Integer quantity = 1;
}

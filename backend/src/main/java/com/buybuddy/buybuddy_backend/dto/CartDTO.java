package com.buybuddy.buybuddy_backend.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class CartDTO {
    private Long id;
    private Integer userId;
    private Long productId;
    private String productName;
    private String productImage;
    private BigDecimal productPrice;
    private String productDescription;
    private Integer quantity;
    private BigDecimal totalPrice;
}

package com.buybuddy.buybuddy_backend.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private Integer stock;
    private Double rating;
    private Integer reviews;
    private Integer discountPercentage;
    private String image;
    private Long categoryId;
    private String category; // For display purposes
}

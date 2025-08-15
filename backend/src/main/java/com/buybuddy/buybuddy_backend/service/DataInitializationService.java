package com.buybuddy.buybuddy_backend.service;

import com.buybuddy.buybuddy_backend.model.Category;
import com.buybuddy.buybuddy_backend.model.Product;
import com.buybuddy.buybuddy_backend.repo.CategoryRepository;
import com.buybuddy.buybuddy_backend.repo.ProductRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Service
public class DataInitializationService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @PostConstruct
    public void initializeData() {
        if (categoryRepository.count() == 0) {
            initializeCategories();
        }
        if (productRepository.count() == 0) {
            initializeProducts();
        }
    }

    private void initializeCategories() {
        List<Category> categories = Arrays.asList(
            createCategory("Electronics", "Electronic devices and gadgets"),
            createCategory("Accessories", "Accessories and add-ons"),
            createCategory("Home", "Home and lifestyle products")
        );
        
        categoryRepository.saveAll(categories);
    }

    private void initializeProducts() {
        Category electronics = categoryRepository.findByName("Electronics").orElse(null);
        Category accessories = categoryRepository.findByName("Accessories").orElse(null);
        Category home = categoryRepository.findByName("Home").orElse(null);

        if (electronics == null || accessories == null || home == null) {
            return; // Categories not found, skip product initialization
        }

        List<Product> products = Arrays.asList(
            createProduct("Wireless Bluetooth Headphones", "High-quality wireless headphones with noise cancellation and 20-hour battery", 
                         BigDecimal.valueOf(129.99), BigDecimal.valueOf(92.29), 25, 4.5, 55, 29, "/uploads/products/headphones.jpg", accessories),
            
            createProduct("Smartphone Stand & Holder", "Adjustable smartphone stand compatible with all models and sizes", 
                         BigDecimal.valueOf(24.99), BigDecimal.valueOf(24.99), 25, 4.2, 22, 10, "/uploads/products/phone-stand.jpg", electronics),
            
            createProduct("Smart Watch", "Fitness tracker with heart rate monitor, sleep tracking, and smartphone notifications", 
                         BigDecimal.valueOf(89.99), BigDecimal.valueOf(89.99), 25, 4.7, 74, 20, "/uploads/products/smartwatch.jpg", electronics),
            
            createProduct("Portable Power Bank", "20000mAh high-capacity portable charger with fast charging capability", 
                         BigDecimal.valueOf(49.99), BigDecimal.valueOf(49.99), 25, 4.4, 544, 17, "/uploads/products/powerbank.jpg", electronics),
            
            createProduct("Laptop Backpack", "Water-resistant backpack with padded compartments for laptops up to 15.6 inches", 
                         BigDecimal.valueOf(59.99), BigDecimal.valueOf(59.99), 25, 4.3, 584, 11, "/uploads/products/backpack.jpg", accessories),
            
            createProduct("Wireless Mouse", "Ergonomic wireless mouse with adjustable DPI and silent clicking", 
                         BigDecimal.valueOf(34.99), BigDecimal.valueOf(34.99), 25, 4.1, 74, 29, "/uploads/products/mouse.jpg", electronics),
            
            createProduct("Smart LED Desk Lamp", "Adjustable brightness and colors with touch controls and USB charging port", 
                         BigDecimal.valueOf(45.99), BigDecimal.valueOf(45.99), 25, 4.6, 64, 13, "/uploads/products/lamp.jpg", home),
            
            createProduct("Wireless Charging Pad", "Fast wireless charger compatible with all Qi-enabled devices", 
                         BigDecimal.valueOf(29.99), BigDecimal.valueOf(29.99), 25, 4.3, 14, 13, "/uploads/products/charging-pad.jpg", electronics)
        );

        productRepository.saveAll(products);
    }

    private Category createCategory(String name, String description) {
        Category category = new Category();
        category.setName(name);
        category.setDescription(description);
        return category;
    }

    private Product createProduct(String name, String description, BigDecimal price, BigDecimal originalPrice,
                                 Integer stock, Double rating, Integer reviews, Integer discountPercentage, 
                                 String image, Category category) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setOriginalPrice(originalPrice);
        product.setStock(stock);
        product.setRating(rating);
        product.setReviews(reviews);
        product.setDiscountPercentage(discountPercentage);
        product.setImage(image);
        product.setCategory(category);
        return product;
    }
}

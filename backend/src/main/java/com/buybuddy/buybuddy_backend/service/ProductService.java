package com.buybuddy.buybuddy_backend.service;

import com.buybuddy.buybuddy_backend.dto.ProductDTO;
import com.buybuddy.buybuddy_backend.model.Category;
import com.buybuddy.buybuddy_backend.model.Product;
import com.buybuddy.buybuddy_backend.repo.CategoryRepository;
import com.buybuddy.buybuddy_backend.repo.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    private final String uploadDir = "uploads/products/";

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<ProductDTO> getProductById(Long id) {
        return productRepository.findById(id)
                .map(this::convertToDTO);
    }

    public List<ProductDTO> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsByCategory(String categoryName) {
        return productRepository.findByCategoryName(categoryName).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> searchProducts(String keyword) {
        return productRepository.findByKeyword(keyword).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsOnSale() {
        return productRepository.findProductsOnSale().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getAvailableProducts() {
        return productRepository.findByStockGreaterThan(0).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + productDTO.getCategoryId()));

        Product product = convertToEntity(productDTO);
        product.setId(null); // Ensure new entity
        product.setCategory(category);
        
        Product savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }

    public Optional<ProductDTO> updateProduct(Long id, ProductDTO productDTO) {
        return productRepository.findById(id)
                .map(existingProduct -> {
                    Category category = categoryRepository.findById(productDTO.getCategoryId())
                            .orElseThrow(() -> new RuntimeException("Category not found with id: " + productDTO.getCategoryId()));

                    existingProduct.setName(productDTO.getName());
                    existingProduct.setDescription(productDTO.getDescription());
                    existingProduct.setPrice(productDTO.getPrice());
                    existingProduct.setOriginalPrice(productDTO.getOriginalPrice());
                    existingProduct.setStock(productDTO.getStock());
                    existingProduct.setRating(productDTO.getRating());
                    existingProduct.setReviews(productDTO.getReviews());
                    existingProduct.setDiscountPercentage(productDTO.getDiscountPercentage());
                    existingProduct.setCategory(category);
                    
                    // Only update image if provided
                    if (productDTO.getImage() != null && !productDTO.getImage().isEmpty()) {
                        existingProduct.setImage(productDTO.getImage());
                    }

                    Product updatedProduct = productRepository.save(existingProduct);
                    return convertToDTO(updatedProduct);
                });
    }

    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            // TODO: Consider deleting associated image file
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public String uploadProductImage(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String filename = UUID.randomUUID().toString() + extension;

        // Save file
        Path filePath = uploadPath.resolve(filename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return "/uploads/products/" + filename;
    }

    private ProductDTO convertToDTO(Product product) {
        ProductDTO dto = modelMapper.map(product, ProductDTO.class);
        dto.setCategoryId(product.getCategory().getId());
        dto.setCategory(product.getCategory().getName());
        return dto;
    }

    private Product convertToEntity(ProductDTO dto) {
        return modelMapper.map(dto, Product.class);
    }
}

package com.buybuddy.buybuddy_backend.service;

import com.buybuddy.buybuddy_backend.dto.CategoryDTO;
import com.buybuddy.buybuddy_backend.model.Category;
import com.buybuddy.buybuddy_backend.repo.CategoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(category -> modelMapper.map(category, CategoryDTO.class))
                .collect(Collectors.toList());
    }

    public Optional<CategoryDTO> getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .map(category -> modelMapper.map(category, CategoryDTO.class));
    }

    public Optional<CategoryDTO> getCategoryByName(String name) {
        return categoryRepository.findByName(name)
                .map(category -> modelMapper.map(category, CategoryDTO.class));
    }

    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        if (categoryRepository.existsByName(categoryDTO.getName())) {
            throw new RuntimeException("Category with name '" + categoryDTO.getName() + "' already exists");
        }
        
        Category category = modelMapper.map(categoryDTO, Category.class);
        category.setId(null); // Ensure new entity
        Category savedCategory = categoryRepository.save(category);
        return modelMapper.map(savedCategory, CategoryDTO.class);
    }

    public Optional<CategoryDTO> updateCategory(Long id, CategoryDTO categoryDTO) {
        return categoryRepository.findById(id)
                .map(existingCategory -> {
                    // Check if name already exists for different category
                    if (!existingCategory.getName().equals(categoryDTO.getName()) && 
                        categoryRepository.existsByName(categoryDTO.getName())) {
                        throw new RuntimeException("Category with name '" + categoryDTO.getName() + "' already exists");
                    }
                    
                    existingCategory.setName(categoryDTO.getName());
                    existingCategory.setDescription(categoryDTO.getDescription());
                    Category updatedCategory = categoryRepository.save(existingCategory);
                    return modelMapper.map(updatedCategory, CategoryDTO.class);
                });
    }

    public boolean deleteCategory(Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

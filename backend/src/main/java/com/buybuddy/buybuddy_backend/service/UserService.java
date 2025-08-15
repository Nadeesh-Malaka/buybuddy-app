package com.buybuddy.buybuddy_backend.service;

import com.buybuddy.buybuddy_backend.dto.UserDTO;
import com.buybuddy.buybuddy_backend.model.User;
import com.buybuddy.buybuddy_backend.repo.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Transactional
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(UserDTO userDTO) {
        Optional<User> existingUser = userRepository.findByEmail(userDTO.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already exists: " + userDTO.getEmail());
        }

        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setName(userDTO.getName());
        user.setNumber(userDTO.getNumber());
        user.setPassword(userDTO.getPassword());
        // Set default profile picture if none provided
        if (userDTO.getProfilePic() == null || userDTO.getProfilePic().isEmpty()) {
            user.setProfilePic("/default-profile.svg");
        } else {
            user.setProfilePic(userDTO.getProfilePic());
        }

        return userRepository.save(user);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    // Get user by email
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Update user
    public User updateUser(Integer id, UserDTO userDTO) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isEmpty()) {
            throw new RuntimeException("User not found with id: " + id);
        }

        // Check if email is being changed and if new email already exists
        if (!existingUser.get().getEmail().equals(userDTO.getEmail())) {
            Optional<User> emailExists = userRepository.findByEmail(userDTO.getEmail());
            if (emailExists.isPresent()) {
                throw new RuntimeException("Email already exists: " + userDTO.getEmail());
            }
        }

        User user = existingUser.get();
        user.setEmail(userDTO.getEmail());
        user.setName(userDTO.getName());
        user.setNumber(userDTO.getNumber());
        user.setPassword(userDTO.getPassword());
        user.setProfilePic(userDTO.getProfilePic());

        return userRepository.save(user);
    }

    // Delete user by ID
    public boolean deleteUser(Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Login user
    public User loginUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user.get();
        }
        throw new RuntimeException("Invalid email or password");
    }

    // Update profile picture
    public User updateProfilePicture(Integer id, MultipartFile file) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isEmpty()) {
            throw new RuntimeException("User not found with id: " + id);
        }

        try {
            // Create uploads directory if it doesn't exist
            String uploadDir = "uploads/profile-pictures/";
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String fileExtension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf('.'));
            } else {
                fileExtension = ".jpg"; // Default extension
            }
            String filename = UUID.randomUUID().toString() + fileExtension;
            
            // Save file
            Path filePath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath);

            // Update user profile picture path
            User user = existingUser.get();
            user.setProfilePic("/uploads/profile-pictures/" + filename);
            
            return userRepository.save(user);
            
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload profile picture: " + e.getMessage());
        }
    }
}

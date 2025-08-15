package com.buybuddy.buybuddy_backend.controller;

import com.buybuddy.buybuddy_backend.dto.AddressDTO;
import com.buybuddy.buybuddy_backend.model.Address;
import com.buybuddy.buybuddy_backend.service.AddressService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/addresses")
@CrossOrigin(origins = "http://localhost:3000")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    // Get all addresses for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Address>> getUserAddresses(@PathVariable Integer userId) {
        try {
            List<Address> addresses = addressService.getUserAddresses(userId);
            return ResponseEntity.ok(addresses);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Add new address
    @PostMapping("/user/{userId}")
    public ResponseEntity<?> addAddress(@PathVariable Integer userId, @RequestBody AddressDTO addressDTO) {
        try {
            Address savedAddress = addressService.addAddress(userId, addressDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAddress);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    // Update address
    @PutMapping("/{addressId}")
    public ResponseEntity<?> updateAddress(@PathVariable Integer addressId, @RequestBody AddressDTO addressDTO) {
        try {
            Address updatedAddress = addressService.updateAddress(addressId, addressDTO);
            return ResponseEntity.ok(updatedAddress);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }

    // Set address as default
    @PutMapping("/{addressId}/set-default")
    public ResponseEntity<?> setDefaultAddress(@PathVariable Integer addressId) {
        try {
            Address defaultAddress = addressService.setDefaultAddress(addressId);
            return ResponseEntity.ok(defaultAddress);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }

    // Delete address
    @DeleteMapping("/{addressId}")
    public ResponseEntity<?> deleteAddress(@PathVariable Integer addressId) {
        boolean deleted = addressService.deleteAddress(addressId);
        if (deleted) {
            return ResponseEntity.ok("Address deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Address not found");
        }
    }

    // Get address by ID
    @GetMapping("/{addressId}")
    public ResponseEntity<Address> getAddressById(@PathVariable Integer addressId) {
        Optional<Address> address = addressService.getAddressById(addressId);
        if (address.isPresent()) {
            return ResponseEntity.ok(address.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}

package com.buybuddy.buybuddy_backend.service;

import com.buybuddy.buybuddy_backend.dto.AddressDTO;
import com.buybuddy.buybuddy_backend.model.Address;
import com.buybuddy.buybuddy_backend.model.User;
import com.buybuddy.buybuddy_backend.repo.AddressRepository;
import com.buybuddy.buybuddy_backend.repo.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public AddressService(AddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    // Get all addresses for a user
    public List<Address> getUserAddresses(Integer userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found with id: " + userId);
        }
        return addressRepository.findByUserOrderByIsDefaultDescIdAsc(user.get());
    }

    // Add new address
    public Address addAddress(Integer userId, AddressDTO addressDTO) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found with id: " + userId);
        }

        User user = userOpt.get();
        Address address = new Address();
        address.setUser(user);
        address.setFullName(addressDTO.getFullName());
        address.setPhoneNumber(addressDTO.getPhoneNumber());
        address.setAddressLine1(addressDTO.getAddressLine1());
        address.setAddressLine2(addressDTO.getAddressLine2());
        address.setCity(addressDTO.getCity());
        address.setState(addressDTO.getState());
        address.setZipCode(addressDTO.getZipCode());
        address.setCountry(addressDTO.getCountry());
        address.setAddressType(addressDTO.getAddressType());
        address.setIsDefault(addressDTO.getIsDefault() != null ? addressDTO.getIsDefault() : false);

        // If this is set as default, reset other defaults
        if (address.getIsDefault()) {
            addressRepository.resetDefaultAddress(user);
        }

        return addressRepository.save(address);
    }

    // Update address
    public Address updateAddress(Integer addressId, AddressDTO addressDTO) {
        Optional<Address> existingAddress = addressRepository.findById(addressId);
        if (existingAddress.isEmpty()) {
            throw new RuntimeException("Address not found with id: " + addressId);
        }

        Address address = existingAddress.get();
        address.setFullName(addressDTO.getFullName());
        address.setPhoneNumber(addressDTO.getPhoneNumber());
        address.setAddressLine1(addressDTO.getAddressLine1());
        address.setAddressLine2(addressDTO.getAddressLine2());
        address.setCity(addressDTO.getCity());
        address.setState(addressDTO.getState());
        address.setZipCode(addressDTO.getZipCode());
        address.setCountry(addressDTO.getCountry());
        address.setAddressType(addressDTO.getAddressType());
        address.setIsDefault(addressDTO.getIsDefault() != null ? addressDTO.getIsDefault() : false);

        // If this is set as default, reset other defaults
        if (address.getIsDefault()) {
            addressRepository.resetDefaultAddress(address.getUser());
        }

        return addressRepository.save(address);
    }

    // Set address as default
    public Address setDefaultAddress(Integer addressId) {
        Optional<Address> addressOpt = addressRepository.findById(addressId);
        if (addressOpt.isEmpty()) {
            throw new RuntimeException("Address not found with id: " + addressId);
        }

        Address address = addressOpt.get();
        addressRepository.resetDefaultAddress(address.getUser());
        address.setIsDefault(true);
        
        return addressRepository.save(address);
    }

    // Delete address
    public boolean deleteAddress(Integer addressId) {
        Optional<Address> address = addressRepository.findById(addressId);
        if (address.isPresent()) {
            addressRepository.deleteById(addressId);
            return true;
        }
        return false;
    }

    // Get address by ID
    public Optional<Address> getAddressById(Integer addressId) {
        return addressRepository.findById(addressId);
    }
}

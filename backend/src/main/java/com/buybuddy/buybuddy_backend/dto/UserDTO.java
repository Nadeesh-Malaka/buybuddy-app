package com.buybuddy.buybuddy_backend.dto;

import lombok.Data;

@Data
public class UserDTO {
    private String email;
    private String name;
    private String fullName; // For frontend compatibility
    private String number;
    private String password;
    private String profilePic;

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name != null ? name : fullName; // Use fullName if name is null
    }

    public String getFullName() {
        return fullName;
    }

    public String getNumber() {
        return number;
    }

    public String getPassword() {
        return password;
    }

    public String getProfilePic() {
        return profilePic;
    }
}

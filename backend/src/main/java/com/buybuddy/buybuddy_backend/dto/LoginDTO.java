package com.buybuddy.buybuddy_backend.dto;

import lombok.Data;

@Data
public class LoginDTO {
    private String email;
    private String password;
    
    public String getEmail() {
        return email;
    }
    
    public String getPassword() {
        return password;
    }
}

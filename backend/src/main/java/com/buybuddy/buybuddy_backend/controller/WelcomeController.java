package com.buybuddy.buybuddy_backend.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class WelcomeController {

    @GetMapping("/")
    public String welcome() {
        return "Welcome to BuyBuddy Backend!";
    }
}

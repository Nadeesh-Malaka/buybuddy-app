package com.buybuddy.buybuddy_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve uploaded files (profile pictures and product images)
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
                
        // Serve default profile picture
        registry.addResourceHandler("/default-profile.png", "/default-profile.svg")
                .addResourceLocations("classpath:/static/");
    }
}

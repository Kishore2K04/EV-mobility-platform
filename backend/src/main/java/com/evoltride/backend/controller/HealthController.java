package com.evoltride.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/")
    public String home() {
        return "🚖 EVOLT Ride Backend is Running!";
    }

    @GetMapping("/api/health")
    public String health() {
        return "Application is Healthy ✅";
    }
}
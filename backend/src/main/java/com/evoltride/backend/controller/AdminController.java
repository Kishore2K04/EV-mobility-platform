package com.evoltride.backend.controller;

import com.evoltride.backend.dto.AdminLoginRequest;
import com.evoltride.backend.entity.Driver;
import com.evoltride.backend.entity.Ride;
import com.evoltride.backend.entity.Rider;
import com.evoltride.backend.service.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public String login(@RequestBody AdminLoginRequest request) {
        return adminService.login(request.getEmail(), request.getPassword());
    }

    @GetMapping("/riders")
    public List<Rider> getAllRiders() {
        return adminService.getAllRiders();
    }

    @GetMapping("/drivers")
    public List<Driver> getAllDrivers() {
        return adminService.getAllDrivers();
    }

    @GetMapping("/rides")
    public List<Ride> getAllRides() {
        return adminService.getAllRides();
    }

    @GetMapping("/analytics")
    public Map<String, Object> getAnalytics() {
        return adminService.getAnalytics();
    }
}
package com.evoltride.backend.controller;

import com.evoltride.backend.dto.DriverRegistrationRequest;
import com.evoltride.backend.service.DriverService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    private final DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    @PostMapping("/register")
    public String register(@RequestBody DriverRegistrationRequest request) {

        return driverService.register(request);

    }

}
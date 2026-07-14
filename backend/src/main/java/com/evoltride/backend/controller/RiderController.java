package com.evoltride.backend.controller;

import com.evoltride.backend.dto.RiderRegistrationRequest;
import com.evoltride.backend.service.RiderService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/riders")
public class RiderController {

    private final RiderService riderService;

    public RiderController(RiderService riderService) {
        this.riderService = riderService;
    }

    @PostMapping("/register")
    public String register(@RequestBody RiderRegistrationRequest request) {

        return riderService.register(request);

    }

}
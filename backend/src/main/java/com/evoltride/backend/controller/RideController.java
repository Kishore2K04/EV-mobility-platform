package com.evoltride.backend.controller;

import com.evoltride.backend.dto.RideRequest;
import com.evoltride.backend.entity.Ride;
import com.evoltride.backend.service.RideService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rides")
public class RideController {

    private final RideService rideService;

    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    @PostMapping("/book")
    public String bookRide(@RequestBody RideRequest request) {
        return rideService.bookRide(request);
    }

    @GetMapping("/history/{email}")
    public List<Ride> getRideHistory(@PathVariable String email) {
        return rideService.getRideHistory(email);
    }

    @GetMapping("/pending")
    public List<Ride> getPendingRides() {
        return rideService.getPendingRides();
    }

    @PutMapping("/accept/{rideId}")
    public String acceptRide(@PathVariable Long rideId,
                              @RequestParam String driverEmail) {
        return rideService.acceptRide(rideId, driverEmail);
    }

    @PutMapping("/reject/{rideId}")
    public String rejectRide(@PathVariable Long rideId) {
        return rideService.rejectRide(rideId);
    }
}
package com.evoltride.backend.service;

import com.evoltride.backend.dto.RideRequest;
import com.evoltride.backend.entity.Ride;
import com.evoltride.backend.repository.RideRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RideService {

    private final RideRepository rideRepository;

    public RideService(RideRepository rideRepository) {
        this.rideRepository = rideRepository;
    }

    public String bookRide(RideRequest request) {

        if (rideRepository.findByRiderEmailAndStatus(
                request.getRiderEmail(),
                "REQUESTED").isPresent()) {

            return "You already have an active ride.";
        }

        Ride ride = new Ride();

        ride.setRiderEmail(request.getRiderEmail());
        ride.setPickupLocation(request.getPickupLocation());
        ride.setDestination(request.getDestination());
        ride.setStatus("REQUESTED");

        rideRepository.save(ride);

        return "Ride booked successfully.";
    }

    public List<Ride> getRideHistory(String email) {
        return rideRepository.findByRiderEmail(email);
    }
}
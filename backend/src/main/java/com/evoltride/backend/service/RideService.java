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

    public List<Ride> getPendingRides() {
        return rideRepository.findByStatus("REQUESTED");
    }

    public String acceptRide(Long rideId, String driverEmail) {

        Ride ride = rideRepository.findById(rideId).orElse(null);

        if (ride == null) {
            return "Ride not found.";
        }

        if (!ride.getStatus().equals("REQUESTED")) {
            return "This ride is no longer available.";
        }

        ride.setDriverEmail(driverEmail);
        ride.setStatus("ACCEPTED");

        rideRepository.save(ride);

        return "Ride accepted successfully.";
    }

    public String rejectRide(Long rideId) {

        Ride ride = rideRepository.findById(rideId).orElse(null);

        if (ride == null) {
            return "Ride not found.";
        }

        ride.setStatus("REJECTED");

        rideRepository.save(ride);

        return "Ride rejected.";
    }
}
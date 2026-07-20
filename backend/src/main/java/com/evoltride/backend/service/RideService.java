package com.evoltride.backend.service;

import com.evoltride.backend.dto.RideRequest;
import com.evoltride.backend.entity.Ride;
import com.evoltride.backend.repository.RideRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RideService {

    private static final double BASE_FARE = 30.0;
    private static final double PER_KM_RATE = 8.0;
    private static final double PER_MINUTE_RATE = 1.5;

    private final RideRepository rideRepository;
    private final WalletService walletService;

    public RideService(RideRepository rideRepository, WalletService walletService) {
        this.rideRepository = rideRepository;
        this.walletService = walletService;
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

        ride.setPickupLat(request.getPickupLat());
        ride.setPickupLng(request.getPickupLng());
        ride.setDestinationLat(request.getDestinationLat());
        ride.setDestinationLng(request.getDestinationLng());
        ride.setDistanceKm(request.getDistanceKm());
        ride.setEtaMinutes(request.getEtaMinutes());

        rideRepository.save(ride);

        return "Ride booked successfully.";
    }

    public List<Ride> getRideHistory(String email) {
        return rideRepository.findByRiderEmail(email);
    }

    public List<Ride> getPendingRides() {
        return rideRepository.findByStatus("REQUESTED");
    }

    public List<Ride> getDriverRides(String driverEmail) {
        return rideRepository.findByDriverEmail(driverEmail);
    }

    public Ride getRideById(Long rideId) {
        return rideRepository.findById(rideId).orElse(null);
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

    public String startRide(Long rideId) {

        Ride ride = rideRepository.findById(rideId).orElse(null);

        if (ride == null) {
            return "Ride not found.";
        }

        if (!ride.getStatus().equals("ACCEPTED")) {
            return "Ride cannot be started from its current status.";
        }

        ride.setStatus("STARTED");

        rideRepository.save(ride);

        return "Ride started.";
    }

    public String completeRide(Long rideId) {

        Ride ride = rideRepository.findById(rideId).orElse(null);

        if (ride == null) {
            return "Ride not found.";
        }

        if (!ride.getStatus().equals("STARTED")) {
            return "Ride cannot be completed from its current status.";
        }

        ride.setStatus("COMPLETED");

        Double fare = calculateFare(ride.getDistanceKm(), ride.getEtaMinutes());
        ride.setFareAmount(fare);

        rideRepository.save(ride);

        walletService.processRidePayment(
                ride.getRiderEmail(),
                ride.getDriverEmail(),
                ride.getId(),
                fare
        );

        return "Ride completed.";
    }

    public String updateDriverLocation(Long rideId, Double lat, Double lng) {

        Ride ride = rideRepository.findById(rideId).orElse(null);

        if (ride == null) {
            return "Ride not found.";
        }

        ride.setDriverLat(lat);
        ride.setDriverLng(lng);

        rideRepository.save(ride);

        return "Location updated.";
    }

    private Double calculateFare(Double distanceKm, Integer etaMinutes) {

        double distance = (distanceKm != null) ? distanceKm : 0.0;
        double eta = (etaMinutes != null) ? etaMinutes : 0.0;

        double fare = BASE_FARE + (distance * PER_KM_RATE) + (eta * PER_MINUTE_RATE);

        return Math.round(fare * 100.0) / 100.0;
    }
}
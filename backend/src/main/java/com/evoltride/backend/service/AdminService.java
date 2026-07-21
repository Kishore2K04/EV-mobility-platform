package com.evoltride.backend.service;

import com.evoltride.backend.entity.Driver;
import com.evoltride.backend.entity.Ride;
import com.evoltride.backend.entity.Rider;
import com.evoltride.backend.repository.DriverRepository;
import com.evoltride.backend.repository.RideRepository;
import com.evoltride.backend.repository.RiderRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    private static final String ADMIN_EMAIL = "admin@evoltride.com";
    private static final String ADMIN_PASSWORD = "admin123";

    private final RiderRepository riderRepository;
    private final DriverRepository driverRepository;
    private final RideRepository rideRepository;

    public AdminService(RiderRepository riderRepository,
                         DriverRepository driverRepository,
                         RideRepository rideRepository) {
        this.riderRepository = riderRepository;
        this.driverRepository = driverRepository;
        this.rideRepository = rideRepository;
    }

    public String login(String email, String password) {

        if (ADMIN_EMAIL.equals(email) && ADMIN_PASSWORD.equals(password)) {
            return "Login Successful";
        }

        return "Invalid Credentials";
    }

    public List<Rider> getAllRiders() {
        return riderRepository.findAll();
    }

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    public List<Ride> getAllRides() {
        return rideRepository.findAll();
    }

    public Map<String, Object> getAnalytics() {

        List<Ride> allRides = rideRepository.findAll();

        long completedRides = allRides.stream().filter(r -> r.getStatus().equals("COMPLETED")).count();
        long pendingRides = allRides.stream().filter(r -> r.getStatus().equals("REQUESTED")).count();
        long acceptedRides = allRides.stream().filter(r -> r.getStatus().equals("ACCEPTED")).count();
        long startedRides = allRides.stream().filter(r -> r.getStatus().equals("STARTED")).count();
        long rejectedRides = allRides.stream().filter(r -> r.getStatus().equals("REJECTED")).count();

        double totalRevenue = allRides.stream()
                .filter(r -> r.getFareAmount() != null)
                .mapToDouble(Ride::getFareAmount)
                .sum();

        Map<String, Object> data = new HashMap<>();

        data.put("totalRiders", riderRepository.count());
        data.put("totalDrivers", driverRepository.count());
        data.put("totalRides", allRides.size());
        data.put("completedRides", completedRides);
        data.put("pendingRides", pendingRides);
        data.put("acceptedRides", acceptedRides);
        data.put("startedRides", startedRides);
        data.put("rejectedRides", rejectedRides);
        data.put("totalRevenue", Math.round(totalRevenue * 100.0) / 100.0);

        return data;
    }
}
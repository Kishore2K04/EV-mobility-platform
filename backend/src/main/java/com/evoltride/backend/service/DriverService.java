package com.evoltride.backend.service;

import com.evoltride.backend.dto.DriverRegistrationRequest;
import com.evoltride.backend.entity.Driver;
import com.evoltride.backend.repository.DriverRepository;
import org.springframework.stereotype.Service;

@Service
public class DriverService {

    private final DriverRepository driverRepository;

    public DriverService(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    public String register(DriverRegistrationRequest request) {

        Driver driver = new Driver();

        driver.setFullName(request.getFullName());
        driver.setEmail(request.getEmail());
        driver.setPhoneNumber(request.getPhoneNumber());
        driver.setVehicleNumber(request.getVehicleNumber());
        driver.setPassword(request.getPassword());

        driverRepository.save(driver);

        return "Driver Registered Successfully";
    }
}
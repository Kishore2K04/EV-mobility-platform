package com.evoltride.backend.service;

import com.evoltride.backend.dto.LoginRequest;
import com.evoltride.backend.dto.LoginResponse;
import com.evoltride.backend.entity.Driver;
import com.evoltride.backend.entity.Rider;
import com.evoltride.backend.repository.DriverRepository;
import com.evoltride.backend.repository.RiderRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final RiderRepository riderRepository;
    private final DriverRepository driverRepository;

    public AuthService(RiderRepository riderRepository,
                       DriverRepository driverRepository) {
        this.riderRepository = riderRepository;
        this.driverRepository = driverRepository;
    }

    public LoginResponse login(LoginRequest request) {

        Optional<Rider> rider =
                riderRepository.findByEmail(request.getEmail());

        if (rider.isPresent()
                && rider.get().getPassword().equals(request.getPassword())) {

            return new LoginResponse(
                    "Login Successful",
                    "RIDER",
                    rider.get().getEmail(),
                    rider.get().getFullName()
            );
        }

        Optional<Driver> driver =
                driverRepository.findByEmail(request.getEmail());

        if (driver.isPresent()
                && driver.get().getPassword().equals(request.getPassword())) {

            return new LoginResponse(
                    "Login Successful",
                    "DRIVER",
                    driver.get().getEmail(),
                    driver.get().getFullName()
            );
        }

        return new LoginResponse(
                "Invalid Credentials",
                null,
                null,
                null
        );
    }
}
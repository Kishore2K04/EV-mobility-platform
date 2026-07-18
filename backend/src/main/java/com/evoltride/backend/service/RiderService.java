package com.evoltride.backend.service;

import com.evoltride.backend.dto.RiderRegistrationRequest;
import com.evoltride.backend.entity.Rider;
import com.evoltride.backend.repository.RiderRepository;
import org.springframework.stereotype.Service;

@Service
public class RiderService {

    private final RiderRepository riderRepository;

    public RiderService(RiderRepository riderRepository) {
        this.riderRepository = riderRepository;
    }

    public String register(RiderRegistrationRequest request) {

        if (riderRepository.existsByEmail(request.getEmail())) {
            return "Email already registered";
        }

        Rider rider = new Rider();

        rider.setFullName(request.getFullName());
        rider.setEmail(request.getEmail());
        rider.setPhoneNumber(request.getPhoneNumber());
        rider.setPassword(request.getPassword());

        riderRepository.save(rider);

        return "Registration Successful";
    }
    public Rider getProfile(String email) {

    return riderRepository.findByEmail(email).orElse(null);

}
}
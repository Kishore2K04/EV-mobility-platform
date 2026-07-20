package com.evoltride.backend.repository;

import com.evoltride.backend.entity.Ride;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RideRepository extends JpaRepository<Ride, Long> {

    Optional<Ride> findByRiderEmailAndStatus(String riderEmail, String status);

    List<Ride> findByRiderEmail(String riderEmail);

    List<Ride> findByStatus(String status);

}
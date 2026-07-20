package com.evoltride.backend.repository;

import com.evoltride.backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<Review> findByRideId(Long rideId);

    List<Review> findByDriverEmail(String driverEmail);

    List<Review> findByDriverEmailOrderByTimestampDesc(String driverEmail);

}
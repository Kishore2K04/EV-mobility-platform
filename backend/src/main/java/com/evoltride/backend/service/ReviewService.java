package com.evoltride.backend.service;

import com.evoltride.backend.dto.ReviewRequest;
import com.evoltride.backend.entity.Review;
import com.evoltride.backend.entity.Ride;
import com.evoltride.backend.repository.ReviewRepository;
import com.evoltride.backend.repository.RideRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final RideRepository rideRepository;

    public ReviewService(ReviewRepository reviewRepository, RideRepository rideRepository) {
        this.reviewRepository = reviewRepository;
        this.rideRepository = rideRepository;
    }

    public String submitReview(ReviewRequest request) {

        Ride ride = rideRepository.findById(request.getRideId()).orElse(null);

        if (ride == null) {
            return "Ride not found.";
        }

        if (!ride.getStatus().equals("COMPLETED")) {
            return "Only completed rides can be rated.";
        }

        if (reviewRepository.findByRideId(request.getRideId()).isPresent()) {
            return "This ride has already been rated.";
        }

        Review review = new Review();

        review.setRideId(request.getRideId());
        review.setRiderEmail(ride.getRiderEmail());
        review.setDriverEmail(ride.getDriverEmail());
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setTimestamp(LocalDateTime.now());

        reviewRepository.save(review);

        ride.setRated(true);
        rideRepository.save(ride);

        return "Review submitted successfully.";
    }

    public List<Review> getDriverReviews(String driverEmail) {
        return reviewRepository.findByDriverEmailOrderByTimestampDesc(driverEmail);
    }

    public Map<String, Object> getDriverStats(String driverEmail) {

        List<Review> reviews = reviewRepository.findByDriverEmail(driverEmail);

        double averageRating = 0.0;

        if (!reviews.isEmpty()) {

            double sum = 0;

            for (Review review : reviews) {
                sum += review.getRating();
            }

            averageRating = Math.round((sum / reviews.size()) * 10.0) / 10.0;
        }

        long completedRides = rideRepository.findByDriverEmail(driverEmail)
                .stream()
                .filter(r -> r.getStatus().equals("COMPLETED"))
                .count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("averageRating", averageRating);
        stats.put("totalReviews", reviews.size());
        stats.put("totalCompletedRides", completedRides);

        return stats;
    }
}
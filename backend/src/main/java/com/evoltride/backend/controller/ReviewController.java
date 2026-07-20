package com.evoltride.backend.controller;

import com.evoltride.backend.dto.ReviewRequest;
import com.evoltride.backend.entity.Review;
import com.evoltride.backend.service.ReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/submit")
    public String submitReview(@RequestBody ReviewRequest request) {
        return reviewService.submitReview(request);
    }

    @GetMapping("/driver/{email}")
    public List<Review> getDriverReviews(@PathVariable String email) {
        return reviewService.getDriverReviews(email);
    }

    @GetMapping("/stats/{email}")
    public Map<String, Object> getDriverStats(@PathVariable String email) {
        return reviewService.getDriverStats(email);
    }
}
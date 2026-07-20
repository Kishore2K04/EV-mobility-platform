import { useEffect, useState } from "react";
import api from "../../api/api";

function DriverReviews() {

    const [stats, setStats] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        loadReviews();
    }, []);

    async function loadReviews() {

        try {

            const email = localStorage.getItem("userEmail");

            const statsResponse = await api.get(`/api/reviews/stats/${email}`);
            setStats(statsResponse.data);

            const reviewsResponse = await api.get(`/api/reviews/driver/${email}`);
            setReviews(reviewsResponse.data);

        } catch (error) {

            console.log("Error:", error);

        }

    }

    return (
        <div style={{ padding: "20px" }}>

            <h1>Ratings & Reviews</h1>

            {stats && (
                <div>
                    <h2>Average Rating: {stats.averageRating} ⭐</h2>
                    <p>Total Reviews: {stats.totalReviews}</p>
                    <p>Total Completed Rides: {stats.totalCompletedRides}</p>
                </div>
            )}

            <hr />

            <h2>Reviews</h2>

            {reviews.length === 0 && <p>No reviews yet.</p>}

            {reviews.map((review) => (
                <div key={review.id} style={{ marginBottom: "10px" }}>
                    <p><b>Rating:</b> {review.rating} ⭐</p>
                    <p><b>Comment:</b> {review.comment || "No comment"}</p>
                    <p style={{ fontSize: "12px", color: "gray" }}>{review.timestamp}</p>
                    <hr />
                </div>
            ))}

        </div>
    );
}

export default DriverReviews;
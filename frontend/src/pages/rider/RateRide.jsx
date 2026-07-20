import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

function RateRide() {

    const { rideId } = useParams();
    const navigate = useNavigate();

    const [rating, setRating] = useState("5");
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("");

    async function submitReview() {

        try {

            const response = await api.post("/api/reviews/submit", {
                rideId: parseInt(rideId),
                rating: parseInt(rating),
                comment
            });

            setMessage(response.data);

        } catch (error) {

            setMessage("Failed to submit review.");

        }

    }

    return (
        <div style={{ padding: "20px" }}>

            <h1>Rate Your Ride</h1>

            <label>Rating: </label>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
            </select>

            <br /><br />

            <textarea
                placeholder="Write a comment (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                cols="40"
            />

            <br /><br />

            <button onClick={submitReview}>Submit Review</button>

            <br /><br />

            <h3>{message}</h3>

            <br />

            <button onClick={() => navigate("/rider/history")}>
                Back to Ride History
            </button>

        </div>
    );
}

export default RateRide;
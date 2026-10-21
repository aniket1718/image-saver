import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const CreatePost = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        const form = e.currentTarget;
        const formData = new FormData(form);

        setLoading(true);

        try {
            const res = await axios.post(
                `${API_URL}/create-post`,
                formData
            );

            console.log("Post created successfully:", res.data);

            alert("Post created successfully!");

            form.reset();
            navigate("/feed");
        } catch (err) {
            console.error(
                "Error creating post:",
                err.response?.data || err.message
            );

            alert(
                err.response?.data?.message ||
                "Failed to create post. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="create-post-section">
            <h1>Create Post</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    required
                />

                <input
                    type="text"
                    name="caption"
                    placeholder="Enter caption"
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Creating Post..." : "Create Post"}
                </button>
            </form>
        </section>
    );
};

export default CreatePost;
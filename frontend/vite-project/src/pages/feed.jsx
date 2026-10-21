
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://image-saver-i7uh.onrender.com";

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${API_URL}/posts`);

                setPosts(res.data.posts || []);
            } catch (err) {
                console.error(
                    "Error fetching posts:",
                    err.response?.data || err.message
                );

                setError(
                    "Unable to load posts. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <section className="feed-section">
                <p>Loading posts...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="feed-section">
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>
                    Retry
                </button>
            </section>
        );
    }

    return (
        <section className="feed-section">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className="post-card">
                        <img
                            src={post.image}
                            alt={post.caption || "Shared post"}
                            className="post-image"
                            loading="lazy"
                        />

                        {post.caption && (
                            <p className="post-caption">
                                {post.caption}
                            </p>
                        )}
                    </div>
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </section>
    );
};

export default Feed;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://image-saver-i7uh.onrender.com";

const CreatePost = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState("");
    const [fileName, setFileName] = useState("");

    // Free the preview URL when it changes / component unmounts
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setPreview("");
            setFileName("");
            return;
        }
        setFileName(file.name);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        const form = e.currentTarget;
        const formData = new FormData(form);

        setLoading(true);

        try {
            const res = await axios.post(`${API_URL}/create-post`, formData, {
                timeout: 90000, // Render free tier can take ~60s to wake up
            });

            console.log("Post created successfully:", res.data);
            alert("Post created successfully!");

            form.reset();
            setPreview("");
            setFileName("");
            navigate("/feed");
        } catch (err) {
            console.error("Error creating post:", err.response?.data || err.message);
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
                    onChange={handleFileChange}
                    required
                />

                {fileName && <p className="file-name">Selected: {fileName}</p>}

                {preview && (
                    <img src={preview} alt="Preview" className="preview-image" />
                )}

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
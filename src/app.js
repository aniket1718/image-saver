const express = require('express');
const multer = require('multer');
const cors = require('cors');

const uploadfile = require("./services/storage_services");
const postmodel = require("./models/post_model");

const app = express();

// Allow only the deployed frontend (and localhost for development)
app.use(cors({
    origin: [
        "https://image-saver.netlify.app",
        "http://localhost:5173"
    ]
}));

// Middleware for JSON data
app.use(express.json());

// Multer configuration
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
});

// Health check
app.get('/', (req, res) => {
    res.send('API is running');
});

// Test route
app.get('/test', (req, res) => {
    res.send('Server is working');
});

// Create post route
app.post('/create-post', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        // Upload image to ImageKit
        const result = await uploadfile(req.file.buffer, req.file.originalname);

        // Save post in MongoDB
        const post = await postmodel.create({
            image: result.url,
            caption: req.body.caption
        });

        return res.status(201).json({
            message: "Post created successfully",
            post: post
        });

    } catch (error) {
        console.error("ERROR:", error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});

// Get all posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await postmodel.find();

        return res.status(200).json({
            message: "Posts fetched successfully",
            posts: posts
        });

    } catch (error) {
        console.error("ERROR:", error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
});

module.exports = app;
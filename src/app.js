const express = require('express');
const multer = require('multer');

const uploadfile = require("./services/storage_services");
const postmodel = require("./models/post_model");
const cors = require("cors")
const app = express();
app.use(cors())
// Middleware for JSON data
app.use(express.json());

// Multer configuration
const upload = multer({
    storage: multer.memoryStorage()
});

// Test route
app.get('/test', (req, res) => {
    res.send('Server is working');
});

// Create post route
app.post('/create-post', upload.single('image'), async (req, res) => {

    try {

        console.log("REQUEST RECEIVED");
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        // Check whether file was uploaded
        if (!req.file) {
            return res.status(400).json({
                message: "Image is required"
            });
        }

        // Upload image
        const result = await uploadfile(req.file.buffer);

        console.log("UPLOAD RESULT:", result);

        // Create post in MongoDB
        const post = await postmodel.create({
            image: result.url,
            caption: req.body.caption
        });

        // Send response
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
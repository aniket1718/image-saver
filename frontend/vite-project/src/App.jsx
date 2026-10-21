
import React from "react";



import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import CreatePost from "./pages/create-post.jsx";
import Feed from "./pages/feed.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* <Route
                    path="/"
                    element={<Feed />}
                /> */}

                <Route
                    path="/create-post"
                    element={<CreatePost />}
                />

                <Route
                    path="/about"
                    element={<h2>world</h2>}
                />
                <Route
                path="/feed"
                element={<Feed />}
                />

            </Routes>
        </Router>
    );
};

export default App;

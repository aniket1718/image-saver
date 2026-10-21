
import React, { useState , useEffect } from "react";
import axios from "axios"

const Feed = () => {
    const [posts, setPosts] = useState([
        {
            _id: "1",
            image: "https://ik.imagekit.io/fgomzydwl/tr:n-ik_ml_thumbnail/image_W3KSxRurx.jpg"
        }
    ]);
    useEffect(()=>{
       axios.get("http://localhost:3000/posts")
       .then((res)=>{
        console.log(res.data)
       })
    },[])

    useEffect(()=>{
        axios.get("http://localhost:3000/posts")
        .then((res)=>{
         setPosts(res.data.posts)
        })
    },[])



    return (
        <section className="feed-section">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className="post-card">
                        <img
                            src={post.image}
                            alt="Post"
                            className="post-image"
                        />
                    </div>
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </section>
    );
};

export default Feed;

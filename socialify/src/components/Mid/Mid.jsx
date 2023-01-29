import React, { useEffect, useState } from 'react'
import Post from '../Posts/Post';
import ToTweet from '../ToTweetBox/ToTweet';
import './mid.css';
const Mid = () => {
  const [posts,SetPosts]= useState([]);

  useEffect(()=>{
    const getPosts = async ()=>{
      const res = await fetch('http://localhost:4000/socialify/posts');
      const data = await res.json();

      SetPosts(data.posts);

    }
getPosts();
  },[posts.length])

  console.log(posts);
  return (
    <>
    <div className="midWrapper">

    <div className="tweetBox">
    <ToTweet/>
    </div>
    <div className="posts">

{
  posts.map((post)=>{
    return(<>
    <Post id={post._id}/>
    </>)
  })
}
    </div> 
    </div>
    </>
  )
}

export default Mid
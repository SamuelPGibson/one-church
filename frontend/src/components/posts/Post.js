// this page is what a post will be
import Footer from "./PostFooter";
import Header from "./PostHeader";
import React, { useEffect, useState } from "react";
import { getPost } from "../../api/api";
import { getUser } from "../../api/api";


export default function Post({postId}) {
    postRes = getPost(postId)
    username = getUser(postRes['author_id'])['username']
    image_url = postRes['image_url']
    // hardcoding the number of likes and dislikes right now
    num_likes = 999
    num_dislikes = 1

  return (
    <div className="flex flex-col min-h-screen">
      <Header name={username} profile_image_url={""}/>
      <div className="flex-grow">
        <main className="max-w-3xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-indigo-700 mb-6">
            <img src={image_url}></img>
          </h1>
        </main>
      </div>
      <Footer likes={num_likes} dislikes={num_dislikes}/>
    </div>
  );
}

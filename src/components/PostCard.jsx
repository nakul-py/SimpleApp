import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage, message }) {
  const imageUrl = featuredImage ? service.getFilePreview(featuredImage) : null;

  return (
    <Link to={`/posts/${$id}`}>
      <div className="w-full bg-purple-700 px-4 rounded-xl">
        <div className="w-full justify-center mb-4"></div>
        <img
          src={imageUrl}
          // alt= {`Id: ${title}`}
          className="w-full h-64 object-cover rounded-xl"
        />
      </div>
      <br />
      <div className="w-full bg-cyan-700 px-4 rounded-xl">
      <h2 className=" font-extrabold text-2xl break-words">Title: {title}</h2>
      </div>
      <br />
      <div className="w-full bg-teal-700 px-4 rounded-xl">
        <p className=" font-extrabold text-2xl break-words whitespace-pre-wrap overflow-hidden">Message: {message}</p>
      </div>
    </Link>
  );
}

export default PostCard;

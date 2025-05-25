import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Posts() {
  const [post, setPosts] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const isAuthor = post && user ? post.userId === user.$id : false;

  useEffect(() => {
    if (id) {
      service.getPost(id).then((post) => {
        if (post) setPosts(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [id, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const handelCancel = () => {
    navigate(-1)
  }

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={service.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-20">
              <Button bgColor="bg-blue-500" className="mr-3" onClick={handelCancel}>
                Cancel
              </Button>
              <Link to={`/edit-posts/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">
          {parse(post.content)}
          </div>
      </Container>
    </div>
  ) : null;
}

export default Posts;

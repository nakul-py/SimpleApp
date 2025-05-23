import React, { useEffect } from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/config";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../store/postSlice";

function Allposts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts || []);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await service.getPostss();
        dispatch(setPosts(allPosts.documents));
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <p className="text-xl">Loading Posts...</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="py-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Allposts;

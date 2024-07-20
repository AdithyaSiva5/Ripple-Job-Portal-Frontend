import { useState, useEffect } from 'react';
import { getAllPosts } from '../services/api/user/apiMethods';

export const useInfiniteScroll = () => {
    const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMorePosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response:any = await getAllPosts(page);
      const newPosts = response.data.posts;
      setPosts((prevPosts) => [...prevPosts, ...newPosts]); 
      setHasMore(response.data.hasMore);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMorePosts();
  }, []);

  return { posts, loading, hasMore, loadMorePosts };
};
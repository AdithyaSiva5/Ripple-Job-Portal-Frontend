import { useEffect, useState } from 'react';
import { search } from '../services/api/user/apiMethods';
import PostSkeletonUi from './skeletonUI/PostSkeletonUi';
import Post from './Post';
import { useLocation } from 'react-router-dom';
import NoPost from './skeletonUI/NoPost';

function SearchPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchParamValue = searchParams.get('search');
    setSearchQuery(searchParamValue || ''); 
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response:any = await search(searchQuery);
        const postsData = response.data.posts ;
        setPosts(postsData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery !== '') {
      fetchData();
    }
  }, [searchQuery]);

  return (
    <div className='scrollable-container h-[calc(100vh-100px)] overflow-y-auto'>
      {loading && <PostSkeletonUi />}
      {posts?.length > 0 ? (
        <div className="posts">
          {posts.map((post: any) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      ) : (
       <NoPost/>
      )}
    </div>
  );
}

export default SearchPost;

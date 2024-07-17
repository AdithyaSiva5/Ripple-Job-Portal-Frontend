import "./userHome.css";
import AddPost from "../../../components/AddPost";
import Post from "../../../components/Post";
import PeopleCard from "../../../components/PeopleCard";
import { useCallback, useEffect, useRef, useState } from "react";
import { getAllPosts, getUserSuggestions } from "../../../services/api/user/apiMethods";
import PostSkeletonUi from "../../../components/skeletonUI/PostSkeletonUi";
import Preferences from "../../../components/Preferences";
import { useSelector } from "react-redux";
import BasicInformation from "../../../components/BasicInformation";
import { darkMode } from "../../../utils/context/reducers/darkmodeSlice";
import { Loader } from 'lucide-react';


function UserHome() {
  const dark = useSelector(darkMode);
  const selectUser = (state: any) => state.auth.user || '';
  const user = useSelector(selectUser) || "";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const userId = user._id || "";
  const [users, setUsers] = useState([]);
  const loadingRef = useRef(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!dark) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [dark])

  const loadPosts = useCallback(() => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);
    getAllPosts(page)
      .then((response: any) => {
        setTimeout(() => {
          const newPosts = response.data.posts;
          setPosts(prevPosts => [...prevPosts, ...newPosts]);
          setHasMore(response.data.hasMore);
          setPage(prevPage => prevPage + 1);
          setLoading(false);
          loadingRef.current = false;
          setInitialLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        loadingRef.current = false;
      });
  }, [page, hasMore]);

  useEffect(() => {
    loadPosts();
    getUserSuggestions({ userId }).then((response: any) => {
      setUsers(response.data.suggestedUsers);
    }).catch((error: any) => {
      console.log(error.message);
    });
  }, [loadPosts, userId]);

  const observer = useRef<IntersectionObserver | null>(null)
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadPosts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadPosts]
  );


  return (
    <div>
      {!user.userType && <Preferences />}
      {!user.profile?.fullname && !user.companyProfile?.companyName && user.userType && <BasicInformation />}
      <div className="home-section-2 bg-primary">
        <div className="home-scroll">
          <div className="home-scrollbox">
            <AddPost />
            {initialLoading ? (
              <PostSkeletonUi />
            ) : (
            posts.map((post: any, index: number) => (
              <div key={post._id} ref={index === posts.length - 1 ? lastPostElementRef : null}>
                <Post post={post} />
              </div>
            )))}
            {loading && (
              <div className="flex justify-center items-center py-4 ">
                <Loader className="animate-spin" color="green" size={24} />
              </div>
            )}
            {!hasMore && posts.length > 0 && (
              <div className="text-center py-4 text-gray-500 dark:text-white">
                No more posts to load
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="hidden lg:block home-section-3" id="mobile-menu-2">
        <div className="home-scroll">
          <div className="home-scrollbox">
            {users?.map((user: any) => (
              <PeopleCard key={user._id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;

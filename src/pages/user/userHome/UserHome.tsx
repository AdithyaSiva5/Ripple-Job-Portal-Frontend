import "./userHome.css";
import AddPost from "../../../components/AddPost";
import Post from "../../../components/Post";
import PeopleCard from "../../../components/PeopleCard";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../../services/api/user/apiMethods";
import PostSkeletonUi from "../../../components/skeletonUI/PostSkeletonUi";
import Preferences from "../../../components/Preferences";
import { useDispatch, useSelector } from "react-redux";
import BasicInformation from "../../../components/BasicInformation";


function UserHome() {

  const dispatch = useDispatch()
  const selectUser = (state:any) => state.auth.user || '';
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      setLoading(true);
      setTimeout(() => {
        getAllPosts()
          .then((response: any) => {
            const postsData = response.data;
            setPosts(postsData);

            console.log(postsData);
          })
          .catch((error) => {
            console.log(error);

          })
          .finally(() => {
            setLoading(false);
          });
      }, 2000);
    } catch (error) {
      console.log(error);

    }
  }, []);

  return (

    <div>
       {!user.userType&&(
          <Preferences/>
        )}
        {!user.fullname&&user.userType&&(
          <BasicInformation/>
        )}
      <div className="home-section-2 ">
        <div className="home-scroll">
          <div className="home-scrollbox">
            <AddPost />
            {loading && (
              <PostSkeletonUi />
            )}
            {posts.length > 0 && (
              <div className="posts">
                {posts.map((post: any) => (
                  <Post key={post._id} post={post} />
                ))}
              </div>
            )}

          </div>
        </div>

      </div>

      <div className="hidden lg:block home-section-3" id="mobile-menu-2">
        <div className="home-scroll">
          <div className="home-scrollbox">
            <PeopleCard />
          </div>
        </div>
      </div>

    </div>


  );
}

export default UserHome;

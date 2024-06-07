import Header from "../../../components/Header";
import "./userHome.css";
import AddPost from "../../../components/AddPost";
import UserProfileBar from "../../../components/UserProfileBar";
import Post from "../../../components/Post";
import PeopleCard from "../../../components/PeopleCard";
function userHome() {



  return (
    <div>
      <Header />

      <div className="home-main">
        <div className="home-section-1">
          <UserProfileBar />
        </div>

        <div className="home-section-2">
          <AddPost />
          <Post />

     
        </div>
        <div className="home-section-3">
          <div className="home-scroll">
            <div className="home-scrollbox">
              <PeopleCard/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default userHome;
{
  /* <button onClick={handleLogout}>Logout</button> */
}


import AdminLogin from "../pages/admin/adminLogin/adminLogin";
import AdminDashboard from "../pages/admin/adminDashboard/AdminDashboard";
import UserList from "../pages/admin/userlistPage/UserList";
import JobCategoryPage from "../pages/admin/categoryListPage/JobCategoryPage";
import PostList from "../pages/admin/postlistPage/PostList";
import AdminJobList from "../pages/admin/adminJoblistPage/AdminJobList";



export const adminRouter = {
    path: "/admin",
    element: <AdminDashboard />,
    // errorElement: <Error />,
    children: [
      // {
      //   path:"/admin",
      //   element: <Dashboard />
      // },
      {
        path:"/admin/users",
        element: <UserList/>
      },
      {
        path:"/admin/job-category",
        element:<JobCategoryPage/>
      },
      {
        path:"/admin/posts",
        element:<PostList/>
        
      } ,
      {
        path:"/admin/jobs",
        element:<AdminJobList/>
      }
      
    ]
  };
  
  export const adminLoginRouter = {
    path: "/admin/login",
    element: <AdminLogin />
  }


import AdminLogin from "../pages/admin/adminLogin/adminLogin";
import AdminDashboard from "../pages/admin/adminDashboard/AdminDashboard";
import UserList from "../pages/admin/userlistPage/UserList";
import JobCategoryPage from "../pages/admin/categoryListPage/JobCategoryPage";

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
        path:"/admin/jobs",
        element:<JobCategoryPage/>
      }
    ]
  };
  
  export const adminLoginRouter = {
    path: "/admin/login",
    element: <AdminLogin />
  }
import { RouteObject } from 'react-router-dom';
import AdminLogin from "../pages/admin/adminLogin/adminLogin";
import AdminDashboard from "../pages/admin/adminDashboard/AdminDashboard";
import UserList from "../pages/admin/userlistPage/UserList";
import JobCategoryPage from "../pages/admin/categoryListPage/JobCategoryPage";
import PostList from "../pages/admin/postlistPage/PostList";
import AdminJobList from "../pages/admin/adminJoblistPage/AdminJobList";
import ReportList from "../pages/admin/adminReportlistPage/ReportList";
import ProtectAdmin from "../routes/protectRoutes/ProtectAdminRoute";
import ErrorPage from "../components/errorComponents/ErrorPage";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <ProtectAdmin><AdminDashboard /></ProtectAdmin>,
    errorElement: <ErrorPage />,
    children: [
      { path: "users", element: <UserList /> },
      { path: "job-category", element: <JobCategoryPage /> },
      { path: "posts", element: <PostList /> },
      { path: "jobs", element: <AdminJobList /> },
      { path: "reports", element: <ReportList /> },
    ]
  },
  {
    path: "/admin/login",
    element: <i />,
    errorElement: <ErrorPage />,
  }
];

export default adminRoutes;
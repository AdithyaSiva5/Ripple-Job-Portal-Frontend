import { User ,ClipboardList,FilePenLine,BarChartBig , Layers3, MessageSquareWarning} from "lucide-react";
import { useNavigate } from "react-router-dom";
function AdminSideNav() {

    const navigate=useNavigate()
    return (
        <div className="sidebar-menu w-64   p-4 z-50  bg-white ms-6 mt-5 rounded-lg">
     
        <ul className="mt-4  flex-col ">
            <span className="text-green-600  font-bold flex  pb-8 px-4  ">Overview</span>
            <li className="mb-1 group">
            <a onClick={()=>{navigate('/admin')}}  className="flex font-semibold  items-center gap-1 py-3 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                <BarChartBig  strokeWidth={1.5} size={16} />
                    <span className="text-xs">Dashboard</span>
                </a>
            </li>
            <li className="mb-1 group">
                <a onClick={()=>{navigate('/admin/users')}} className="flex   items-center gap-1 font-semibold py-3 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                <User  strokeWidth={1.5} size={16} />
                    <span className="text-xs">Users</span>
                
                </a>
           
            </li>
            <li className="mb-1 group">
                <a onClick={()=>{navigate('/admin/job-category')}} className="flex   font-semibold items-center gap-1  py-3 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                <Layers3 strokeWidth={1.5} size={16} />
                    <span className="text-xs">Jobs category</span>
                </a>
            </li>
            <li className="mb-1 group">
                <a onClick={()=>{navigate('/admin/jobs')}} className="flex   font-semibold items-center gap-1  py-3 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                <ClipboardList  strokeWidth={1.5} size={16} />
                    <span className="text-xs">Jobs </span>
                </a>
            </li>
    
            <li className="mb-1 group">
                <a onClick={()=>{navigate('/admin/posts')}} className="flex font-semibold items-center gap-1 py-3 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                <FilePenLine  strokeWidth={1.5} size={16} />     
                    <span className="text-xs">Posts</span>
                    
                </a>
           
            </li>
            <li className="mb-1 group">
            <a onClick={()=>{navigate('/admin/reports')}}  
            className={`flex font-semibold items-center gap-1 py-3 px-4  hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-950 group-[.active]:text-white ${
                location.pathname === "/admin/reports" ? "bg-gray-950 text-gray-100" : ""
            }`}>            <MessageSquareWarning  strokeWidth={1.5} size={16} />  
                <span className="text-xs">Reports</span>
            </a>
        </li>
        
        </ul>
    </div>
      )
    }
    
    export default AdminSideNav
import { User ,ClipboardList,Bell,MessageSquareWarning,FilePenLine,BarChartBig} from "lucide-react";

function AdminSideNav() {
  return (
    <div className="sidebar-menu w-64   p-4 z-50  bg-white ms-6 mt-5 rounded-lg">
 
    <ul className="mt-4  flex-col ">
        <span className="text-green-600  font-bold flex  pb-8 px-4  ">Overview</span>
        <li className="mb-1 group">
            <a href="" className="flex font-semibold  items-center gap-1 py-3 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
            <BarChartBig  strokeWidth={1.5} size={16} />
                <span className="text-xs">Dashboard</span>
            </a>
        </li>
        <li className="mb-1 group">
            <a href="" className="flex   items-center gap-1 font-semibold py-3 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
            <User  strokeWidth={1.5} size={16} />
                <span className="text-xs">Users</span>
            
            </a>
       
        </li>
        <li className="mb-1 group">
            <a href="" className="flex   font-semibold items-center gap-1  py-3 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
            <ClipboardList  strokeWidth={1.5} size={16} />
                <span className="text-xs">Jobs</span>
            </a>
        </li>

        <li className="mb-1 group">
            <a href="" className="flex font-semibold items-center gap-1 py-3 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
            <FilePenLine  strokeWidth={1.5} size={16} />     
                <span className="text-xs">Posts</span>
                
            </a>
       
        </li>
        <li className="mb-1 group">
            <a href="" className="flex font-semibold items-center gap-1  py-3 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
            <MessageSquareWarning  strokeWidth={1.5} size={16} />  
                <span className="text-xs">Reports</span>
            </a>
        </li>

        <li className="mb-1 group">
            <a href="" className="flex font-semibold items-center gap-1  py-3 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
            <Bell  strokeWidth={1.5} size={16} />
                <span className="text-xs">Notifications</span>
                <span className=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-600 bg-red-200 rounded-full">5</span>
            </a>
        </li>
        <li className="mb-1 group">
            <a href="" className="flex font-semibold items-center gap-1  py-3 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
            <ClipboardList  strokeWidth={1.5} size={16} />
                <span className="text-xs">Messages</span>
                <span className=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-600 bg-green-200 rounded-full">2 New</span>
            </a>
        </li>
    </ul>
</div>
  )
}

export default AdminSideNav
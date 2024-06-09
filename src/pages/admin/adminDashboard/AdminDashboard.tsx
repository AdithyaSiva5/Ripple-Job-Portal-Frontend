import { Outlet } from 'react-router-dom'
import AdminHeader from '../../../components/AdminHeader'
import AdminSideNav from '../../../components/AdminSideNav'
import './adminDashboard.css'


function AdminDashboard() {
  return (
    <div className='main bg-gray-100 '>
<AdminHeader/>
<div className='flex'>
<AdminSideNav/>
 <Outlet/>

</div>


</div>
  )
}

export default AdminDashboard
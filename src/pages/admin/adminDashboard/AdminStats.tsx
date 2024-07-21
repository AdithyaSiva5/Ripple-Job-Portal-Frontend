import { BarChartBig, Briefcase, Files, Layers3, ShieldCheck, User } from "lucide-react"
import { useEffect, useState } from "react";
import { getDashboardStats } from "../../../services/api/admin/apiMethods";
import ApexChart from "../../../components/Chart";


function AdminStats() {

    const [stats, setStats] = useState<any>();
    useEffect(() => {
        getDashboardStats().then((response: any) => {

            setStats(response.data);
        })
    }, [])
    return (
        <div className="flex flex-col  items-center h-[100vh] pt-4 w-full">
            <div className="min-w-[375px] md:min-w-[700px] xl:min-w-[800px] mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6 w-full px-20">
                <div className="relative h-32 flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                        <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                            <span className="flex items-center text-brand-500 dark:text-white">
                                <User color="green" />
                            </span>
                        </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                        <p className="font-dm text-sm font-medium text-gray-600">Total Users</p>
                        <h4 className="text-xl font-bold text-navy-700 dark:text-white">{stats?.totalUsers || 0}</h4>
                    </div>
                </div>
                <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                        <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                            <span className="flex items-center text-brand-500 dark:text-white">
                                <Files color="green" />
                            </span>
                        </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                        <p className="font-dm text-sm font-medium text-gray-600">Total Posts</p>
                        <h4 className="text-xl font-bold text-navy-700 dark:text-white">{stats?.totalPosts || 0}</h4>
                    </div>
                </div>
                <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                        <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                            <span className="flex items-center text-brand-500 dark:text-white">
                                <Briefcase color="green" />
                            </span>
                        </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                        <p className="font-dm text-sm font-medium text-gray-600">Total Jobs</p>
                        <h4 className="text-xl font-bold text-navy-700 dark:text-white">{stats?.totalJobs || 0}</h4>
                    </div>
                </div>
                <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                        <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                            <span className="flex items-center text-brand-500 dark:text-white">
                                <BarChartBig color="green" />
                            </span>
                        </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                        <p className="font-dm text-sm font-medium text-gray-600">Total Sales</p>
                        <h4 className="text-xl font-bold text-navy-700 dark:text-white"> ₹ {stats?.totalSales * 249 || 0}</h4>
                    </div>
                </div>
                <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                        <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                            <span className="flex items-center text-brand-500 dark:text-white">

                                <Layers3 color="green" />
                            </span>
                        </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                        <p className="font-dm text-sm font-medium text-gray-600">Job Category</p>
                        <h4 className="text-xl font-bold text-navy-700 dark:text-white">{stats?.totalJobsCategories || 0}</h4>
                    </div>
                </div>
                <div className="h-32 relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                    <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                        <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
                            <span className="flex items-center text-brand-500 dark:text-white">
                                <ShieldCheck color="green" />
                            </span>
                        </div>
                    </div>
                    <div className="h-50 ml-4 flex w-auto flex-col justify-center">
                        <p className="font-dm text-sm font-medium text-gray-600">Reports</p>
                        <h4 className="text-xl font-bold text-navy-700 dark:text-white">{stats?.totalReports || 0}</h4>
                    </div>

                </div>

            </div>
            <div className="w-full">
            <ApexChart />
            </div>
        </div>
    )
}

export default AdminStats
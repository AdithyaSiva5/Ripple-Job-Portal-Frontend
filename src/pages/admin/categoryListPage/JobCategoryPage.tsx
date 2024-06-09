import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { addJobCategory,getJobCategory,blockJobCategory} from "../../../services/api/admin/apiMethods";

function JobCategoryPage() {
  const [loading, setLoading] = useState(true);
  const [jobCategories, setjobCategories] = useState<any[]>([]);
  const [jobCategory,setJobCategory] = useState('')
  useEffect(() => {
    try {
      getJobCategory()
        .then((response: any) => {
          const jobCategoryData = response.data;
          setjobCategories(jobCategoryData.jobCategory);

          console.log(jobCategoryData.jobCategory);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error:any) {
      toast.error(error.message);
    }
  }, []);

  const handleSubmit = async () => {
    if (jobCategory.trim() === '') {
      toast.error("Provide a Job Category");
      return;
    }
 
    try {
      await addJobCategory({ jobCategory: jobCategory }).then((response:any)=>{
        const jobCategoryData = response.data;
        setjobCategories(jobCategoryData.jobCategory);
        setJobCategory('');
        toast.info("Job Category Added");
      }).catch((error)=>{
        toast.error(error.message)
      })
     
    } catch (error:any) {
      console.log(error.message);
      toast.error("Failed to add hashtag");
    }
  }

  const handlejobCategoryBlock = (jobCategoryId: string,status:string) => {
    try {
      const requestData = { jobCategoryId };
      blockJobCategory(requestData)
        .then((response: any) => {
          const data = response.data;
          if(status=="block"){
            toast.error(data.message);
          }else{
            toast.info(data.message);

          }
            setjobCategories(prevUsers =>
            prevUsers.map(jobCategory => {
              if (jobCategory._id === jobCategoryId) {
                return { ...jobCategory, isBlocked: !jobCategory.isBlocked };
              }
              return jobCategory;
            })
          );
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (err:any) {
      toast.error(err.message);
    }
  }

console.log(jobCategory);

  

  return (
    <div className="w-full overflow-hidden rounded-lg  m-5">
      <div className="flex gap-3">
        <div className="w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
            <input
              type="text"
              id="search"
              onChange={(e)=>setJobCategory(e.target.value)}
              value={jobCategory}
              className="block w-full p-4 pl-10 text-xs  text-gray-900 border  border-gray-100 rounded-lg bg-white "
              placeholder="Add new Job Category"
              required
            />
            <button
              type="submit" 
              onClick={handleSubmit}
              
              className=" text-xs rounded-md  text-white absolute right-2.5 bottom-2.5 bg-green-600 hover:bg-green-800 px-4 py-2 "
            >
              Add
            </button>
          </div>
        </div>
     
      </div>
      <table className=" w-full border-collapse bg-white text-left text-sm text-gray-500 mt-5">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-xs text-gray-900">
              Category
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-xs text-gray-900">
              Jobs
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-xs text-gray-900">
              Date
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-xs text-gray-900">
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-medium flex justify-center text-xs text-gray-900"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100 ">
          {jobCategories.length && jobCategories.map((jobCategory: any) => (
    
        <tr key={jobCategory._id} className="hover:bg-gray-50">
          <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
            <div className="text-xs">
              <div className="font-medium text-gray-700">{jobCategory.jobCategory}</div>
            </div>
          </th>
          <td className="px-6 py-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
              {jobCategory.jobs.length}
            </span>
          </td>
          <td className="px-6 py-4 text-xs">
            {jobCategory.date}
          </td>

          <td className=" text-xs px-6 py-4">{jobCategory.isBlocked?(<span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
            Blocked
                </span>):(<span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
            UnBlocked
                </span>)}</td>

         
          <td className="px-6 py-4">
            <div className="flex justify-end gap-4">
            {jobCategory.isBlocked?(<button style={{width:'110px'}}  type="button"
            onClick={() => handlejobCategoryBlock(jobCategory._id,"unblock")}
className="text-xs  bg-white text-green-600 hover:bg-gray-100 border border-gray-200  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
              <ShieldCheck size={18} />UnBlock
</button>):(<button style={{width:'110px'}}  type="button" onClick={() => handlejobCategoryBlock(jobCategory._id,"block")} className="text-xs bg-white text-red-600 hover:bg-gray-100 border border-gray-200  focus:outline-none  font-medium rounded-lg  ps-7 py-2.5 text-center inline-flex items-center  me-2 mb-2">
<ShieldAlert size={18} />  Block
</button>)}

              
              
              
            </div>
          </td>
        </tr>
    ))}
          {/* Additional rows can be added here */}
        </tbody>
      </table>
    </div>
  );
}

export default JobCategoryPage;
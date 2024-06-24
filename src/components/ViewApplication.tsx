
"use client";

import {  Modal } from "flowbite-react";
import { X } from "lucide-react";


function  ViewApplication({application,cancelViewApplication}:any) {

const showPdf=(pdf:string)=>{
  console.log(pdf) 
    window.open(`http://localhost:3000/uploads/${pdf}`,"_blank","noreferrer")
}
  return (
    <>
     
      <Modal show={true} className="bg-transparent">
    
        <Modal.Body>
        <div className='flex  justify-between items-center '>
          <p className='text-sm font-semibold'>Review Job Application</p>
          <button onClick={() => cancelViewApplication()}>
            <X size={18} color='gray' />
          </button>
        </div>
           
     
        </Modal.Body>
        <Modal.Footer className="flex flex-col items-start gap-5">
        <div className="flex">
              <img className="w-14 h-14 rounded-md" src={application.applicantId.profileImageUrl} alt="" />
              <div className="mx-5">
                <p className="text-sm">{}</p>
                <p className="text-sm font-bold">{application.applicantId.username}</p>
              </div>
            </div>
      

        <div className="space-y-6">
            <p className="leading-relaxed text-gray-500 dark:text-gray-400 text-xs">
             {application.coverLetter}
            </p>
    
          </div >
          <button
          onClick={()=>showPdf(application.resume)}
          >

        
          <div className="flex items-start bg-gray-50 dark:bg-gray-600 rounded-xl p-2">
            <div className="me-2">
               <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-2">
                  <svg fill="none" aria-hidden="true" className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 21">
                     <g clip-path="url(#clip0_3173_1381)">
                        <path fill="#E2E5E7" d="M5.024.5c-.688 0-1.25.563-1.25 1.25v17.5c0 .688.562 1.25 1.25 1.25h12.5c.687 0 1.25-.563 1.25-1.25V5.5l-5-5h-8.75z"/>
                        <path fill="#B0B7BD" d="M15.024 5.5h3.75l-5-5v3.75c0 .688.562 1.25 1.25 1.25z"/>
                        <path fill="#CAD1D8" d="M18.774 9.25l-3.75-3.75h3.75v3.75z"/>
                        <path fill="#F15642" d="M16.274 16.75a.627.627 0 01-.625.625H1.899a.627.627 0 01-.625-.625V10.5c0-.344.281-.625.625-.625h13.75c.344 0 .625.281.625.625v6.25z"/>
                        <path fill="#fff" d="M3.998 12.342c0-.165.13-.345.34-.345h1.154c.65 0 1.235.435 1.235 1.269 0 .79-.585 1.23-1.235 1.23h-.834v.66c0 .22-.14.344-.32.344a.337.337 0 01-.34-.344v-2.814zm.66.284v1.245h.834c.335 0 .6-.295.6-.605 0-.35-.265-.64-.6-.64h-.834zM7.706 15.5c-.165 0-.345-.09-.345-.31v-2.838c0-.18.18-.31.345-.31H8.85c2.284 0 2.234 3.458.045 3.458h-1.19zm.315-2.848v2.239h.83c1.349 0 1.409-2.24 0-2.24h-.83zM11.894 13.486h1.274c.18 0 .36.18.36.355 0 .165-.18.3-.36.3h-1.274v1.049c0 .175-.124.31-.3.31-.22 0-.354-.135-.354-.31v-2.839c0-.18.135-.31.355-.31h1.754c.22 0 .35.13.35.31 0 .16-.13.34-.35.34h-1.455v.795z"/>
                        <path fill="#CAD1D8" d="M15.649 17.375H3.774V18h11.875a.627.627 0 00.625-.625v-.625a.627.627 0 01-.625.625z"/>
                     </g>
                     <defs>
                        <clipPath id="clip0_3173_1381">
                           <path fill="#fff" d="M0 0h20v20H0z" transform="translate(0 .5)"/>
                        </clipPath>
                     </defs>
                  </svg>
                {application.applicantId.username} Resume
               </span>
               <span className="flex text-xs font-normal text-gray-500 dark:text-gray-400 gap-2">
                  1 Pages 
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                     <circle cx="1.5" cy="2" r="1.5" fill="#6B7280"/>
                  </svg>
                  2 MB 
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                     <circle cx="1.5" cy="2" r="1.5" fill="#6B7280"/>
                  </svg>
                  PDF
               </span>
            </div>
            </div>
            </button>

      
          
          <div className="buttons flex justify-end w-full mt-6">
                <div
                  onClick={() => cancelViewApplication()}
                  className="text-xs rounded btn border border-gray-300 px-4 py-2 cursor-pointer text-gray-500 ml-auto hover:bg-red-600 hover:text-white "
                >
                  Cancel
                </div>
                      
            <button
                    type="submit"
                    className="text-xs rounded btn border px-4 py-2 cursor-pointer text-white ml-2 bg-gray-900 hover:bg-green-600 "
                   
                >
                    View Profile
                  </button>
            

            
              </div>
        
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default ViewApplication
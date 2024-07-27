import React, { useState } from 'react';
import { Modal } from 'flowbite-react';
import { BriefcaseBusiness, User, UserRoundPlus, Users } from 'lucide-react';
import { toast } from 'sonner';
import { setPreferences } from '../services/api/user/apiMethods';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, updateUser } from '../utils/context/reducers/authSlice';

function Preferences() {
    
  const selectUser = (state: any) => state.auth.user || ''; 
  const user = useSelector(selectUser) || '';
  const userId = user._id || '';
  const dispatch = useDispatch()
  const [userType, setuserType] = useState('');
  const [isHiring, setisHiring] = useState(''); 

  const handleTypeSelection = (type:any) => {
    setuserType(type);
  };

  const handleStatusSelection = (status:any) => {
    setisHiring(status);
  };

  const handleSave = () => {
    if (userType && isHiring) {
      setPreferences({userId:userId,userType:userType,isHiring:isHiring}) .then((response: any) => {
        const data = response.data;
        if (response.status === 200) {
          dispatch(updateUser({ user: data }));
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.log(error?.message);
        toast.error('An error occurred. Please try again.');
      });
      
    } else {
     toast.error('Please select both options before saving.');
    }
  };


  return (
    <>
      <Modal show={true} className="bg-transparent">
        <Modal.Body>
          <p className="text-sm font-semibold">Basic Information</p>
        </Modal.Body>
        <Modal.Footer className="flex flex-col items-start">
          <div className="space-y-6">
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              Are you an individual person/person representing a company or an organization?
              <div className="flex gap-14 mt-4 mb-8">
                <button
                  className={`border rounded-md w-28 h-28 ${userType === 'individual' ? 'bg-green-200' : ''}`}
                  onClick={() => handleTypeSelection('individual')}
                >
                  <div className="flex flex-col gap-2 items-center ">
                    <User color="black" size={18} /> Individual
                  </div>
                </button>
                <button
                  className={`border rounded-md w-28 h-28 ${userType === 'organization' ? 'bg-green-200' : ''}`}
                  onClick={() => handleTypeSelection('organization')}
                >
                  <div className="flex flex-col gap-2 items-center ">
                    <Users color="black" size={18} /> Organization
                  </div>
                </button>
              </div>
            </p>
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              Are you looking for a job or planning to hire an individual?
              <div className="flex gap-14 mt-4 mb-8">
                <button
                  className={`border rounded-md w-28 h-28 ${isHiring === 'openToWork' ? 'bg-green-200' : ''}`}
                  onClick={() => handleStatusSelection('openToWork')}
                >
                  <div className="flex flex-col gap-2 items-center ">
                    <BriefcaseBusiness color="black" size={18} /> Open to Work
                  </div>
                </button>
                <button
                  className={`border rounded-md w-28 h-28 ${isHiring === "isHiring"? 'bg-green-200' : ''}`}
                  onClick={() => handleStatusSelection("isHiring")}
                >
                  <div className="flex flex-col gap-2 items-center ">
                    <UserRoundPlus color="black" size={18} /> Is Hiring
                  </div>
                </button>
              </div>
            </p>
          </div>
          <div className="w-full flex justify-end">
            <button
              className="text-xs rounded btn border w-24 px-4 py-2 cursor-pointer text-white ml-2 bg-gray-900  hover:bg-green-600"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Preferences;

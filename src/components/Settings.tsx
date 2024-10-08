import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Tabs } from "flowbite-react";
import { Edit, X } from "lucide-react";
import EditBio from "./EditBio";
import SetUserType from "./SetUserType";
import ExperienceSection from "./ExperienceSection";
import SkillsSection from "./SkillsSection";
import QualificationsSection from "./QualificationsSection";
import { getSettings, updateSettings, updateUserResume } from "../services/api/user/apiMethods";
import { updateUserSettings } from "../utils/context/reducers/authSlice";
import { toast } from "sonner";
import axios from "axios";
import { BASE_URL } from "../constants/baseUrls";

function SettingsComponent() {
  const dispatch = useDispatch();
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const [gender, setGender] = useState(user.profile?.gender || "");
  const [isEdit, setIsEdit] = useState(false);
  const [isSetUserType, setIsSetUserType] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [localUser, setLocalUser] = useState({
    profile: {
      qualification: [],
      skills: [],
      experience: [],
    },
  });
  console.log(user)
  const [jobCategories, setJobCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isOrganization = user.userType === "organization";
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response: any = await getSettings();
        setJobCategories(response.data.jobCategories || []);
        setLocalUser(response.data.user || {});
        setGender(response.data.user?.profile?.gender);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching settings:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleEditButtonClick = () => {
    setIsEdit(true);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
  };
  const handleUpdate = async (section: any, data: any) => {
    const updatedUser = {
      ...localUser,
      profile: {
        ...localUser.profile,
        [section]: data,
      },
    };
    setLocalUser(updatedUser);

    try {
      const response: any = await updateSettings(updatedUser);
      if (response.status === 200) {
        dispatch(updateUserSettings({ profile: { [section]: data } }));
      } else {
        toast.error("Failed to update settings");
      }
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
    handleUpdate("gender", e.target.value);
  };
  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('userId', user._id)
      try {
 
        const response: any = await axios.post(`${BASE_URL}/api/update-resume`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 200) {
          toast.success('Resume updated successfully');
          setLocalUser(response.data.user);
          dispatch(updateUserSettings({ profile: { resume: response.data.user.profile.resume } }));
        } else {
          toast.error('Failed to update resume');
        }
      } catch (error) {
        console.error('Error updating resume:', error);
        toast.error('An error occurred while updating the resume');
      }
    }
  };


  if (isLoading) {
    return <div className="dark:text-white text-black">Loading...</div>;
  }

  return (
    <div>
      <div className="user-role mt-2 bg-secondary border border-green w-full text-lg rounded-md p-4 mb-4 font-sans ">
        <div className="flex gap-2">
          <h2 className="dark:text-accent ">Choose Role  :</h2>
          <button
            onClick={() => setIsSetUserType(true)}
            className="text-xs flex  hover:bg-green-600 hover:text-black text-green-600 border px-2 py-2 rounded-md border-green-600"
          >
            Open to
          </button>
        </div>

        <div className="bio  h-full md:h-auto mt-2 text-gray-400 border border-red-600 text-base bg-primary w-full rounded-md p-4 mb-4">
          <h1 className="text-center">Basic Information</h1>
          <div className="flex justify-between  ">
            <p>Name : {user.profile?.fullname}</p>
            <button className="text-red-600" onClick={handleEditButtonClick}>
              <Edit size={25} />
            </button>
          </div>
          <p>Email  :{user.email}</p>
          <p>Ph no :{user.phone}</p>
          <p>Location :{user?.profile?.location}</p>
          <p>Is Google Authenthicated :  {user.isGoogle ? "YES" : "NO"}</p>
          <p>Is Premium : {user.isPremium ? "YES" : "NO"} </p>
        </div>

        {isOrganization ? (
          <div
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4"
            role="alert"
          >
            <p className="font-bold">Company Account</p>
            <p>
              To add personal details like qualifications, skills, and
              experience, please change to an individual account.
            </p>
          </div>
        ) : (
          <>
            <QualificationsSection
              qualifications={localUser.profile?.qualification || []}
              onUpdate={(data: any) => handleUpdate("qualification", data)}
            />
            <SkillsSection
              skills={localUser.profile?.skills || []}
              jobCategories={jobCategories}
              onUpdate={(data: any) => handleUpdate("skills", data)}
            />
            <ExperienceSection
              experiences={localUser.profile?.experience || []}
              onUpdate={(data: any) => handleUpdate("experience", data)}
            />
            
            {localUser.profile?.resume && (
              <div className="mt-2">
                <p className="mt-2 dark:text-green-600 ml-5 ">
                  Current Resume: 
                  <a
                    href={`${BASE_URL}/uploads/${localUser.profile?.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-500"
                  >
                    View
                  </a>
                </p>
              </div>
            )}
            <div className="w-full rounded-md p-4 mb-4">
              <input
                type="file"
                accept=".pdf"
                onChange={handleResumeUpload}
                className=" text-base bg-secondary text-black dark:text-white rounded w-full file-input"
              />
            </div>

          </>
        )}
        <div className="gender-section w-full rounded-md p-4 mb-4">
          <h2 className="dark:text-white">Gender</h2>
          <select
            value={gender}
            onChange={handleGenderChange}
            className="p-2 border rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {isEdit && <EditBio onCancelEdit={handleCancelEdit} />}
        {isSetUserType && <SetUserType setOpenModal={setIsSetUserType} />}

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Body>
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm font-semibold">Add Section</p>
              <button onClick={() => setOpenModal(false)}>
                <X size={18} color="gray" />
              </button>
            </div>

            <Tabs className="addsection text-xs" aria-label="Settings tabs">
              <Tabs.Item title="Experience"></Tabs.Item>
              <Tabs.Item title="Skills"></Tabs.Item>
              <Tabs.Item title="Qualifications"></Tabs.Item>
            </Tabs>
          </Modal.Body>
        </Modal>
      </div>
    </div >
  );
}

export default SettingsComponent;

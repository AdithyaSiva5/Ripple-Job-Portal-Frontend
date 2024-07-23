import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Tabs } from "flowbite-react";
import { Edit, X } from "lucide-react";
import EditBio from "./EditBio";
import SetUserType from "./SetUserType";
import ExperienceSection from "./ExperienceSection";
import SkillsSection from "./SkillsSection";
import QualificationsSection from "./QualificationsSection";
import { getSettings, updateSettings } from "../services/api/user/apiMethods";

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
  const [jobCategories, setJobCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getSettings();
        console.log("Fetched data:", response);

        setJobCategories(response.data.jobCategories || []);
        setLocalUser(response.data.user || {});

        dispatch({ type: "UPDATE_USER", payload: response.user });
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
  const handleUpdate = async (section, data) => {
    console.log(`SettingsComponent - Updating ${section} with:`, data);
    const updatedUser = {
      ...localUser,
      profile: {
        ...localUser.profile,
        [section]: data,
      },
    };
    setLocalUser(updatedUser);

    try {
      await updateSettings(updatedUser);
      console.log("Settings updated successfully");
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    handleUpdate("gender", e.target.value);
  };

  console.log("SettingsComponent - Rendering with user data:", localUser);

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <h1 className="dark:text-white">Settings</h1>
      <div className="user-role bg-white w-full rounded-md p-4 mb-4">
        <h2>User Role</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setIsSetUserType(true)}
            className="text-xs flex   text-green-600 border px-2 py-1 rounded-md border-green-600"
          >
            Open to
          </button>
        </div>
      </div>

      <div className="bio bg-white w-full rounded-md p-4 mb-4">
        <div className="flex justify-between mb-4">
          <p>{user.profile?.fullname || user.companyProfile?.companyName}</p>
          <button onClick={handleEditButtonClick}>
            <Edit size={15} />
          </button>
        </div>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>

      <QualificationsSection
        qualifications={localUser.profile?.qualification || []}
        onUpdate={(data) => handleUpdate('qualification', data)}
      />
      <SkillsSection
        skills={localUser.profile?.skills || []}
        jobCategories={jobCategories}
        onUpdate={(data) => handleUpdate('skills', data)}
      />
      <ExperienceSection
        experiences={localUser.profile?.experience || []}
        onUpdate={(data) => handleUpdate('experience', data)}
      />
      <div className="gender-section bg-white w-full rounded-md p-4 mb-4">
        <h2>Gender</h2>
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

      {/* Set user type modal */}
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
  );
}

export default SettingsComponent;

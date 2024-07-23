// SettingsComponent.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Tabs } from 'flowbite-react';
import { Edit, X } from 'lucide-react';
import EditBio from './EditBio';
import SetUserType from './SetUserType';
import ExperienceSection from './ExperienceSection';
import SkillsSection from './SkillsSection';
import QualificationsSection from './QualificationsSection';
import { getSettings , updateSettings } from '../services/api/user/apiMethods';


function SettingsComponent() {
  const dispatch = useDispatch();
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const [isEdit, setIsEdit] = useState(false);
  const [isSetUserType, setIsSetUserType] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleEditButtonClick = () => {
    setIsEdit(true);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
  };

  return (
    <div>
      <h1>Settings</h1>
      <div className="user-role bg-white w-full rounded-md p-4 mb-4">
        <h2>User Role</h2>
        <div className="flex gap-4">
          <button onClick={()=>setIsSetUserType(true)} className="text-xs flex   text-green-600 border px-2 py-1 rounded-md border-green-600" >Open to</button>
        </div>
      </div>

      <div className="bio bg-white w-full rounded-md p-4 mb-4">
        <div className="flex justify-between mb-4">
          <p>{user.profile?.fullname || user.companyProfile?.companyName}</p>
          <button onClick={handleEditButtonClick}><Edit size={15} /></button>
        </div>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>

      <ExperienceSection user={user} />
      <SkillsSection user={user} />
      <QualificationsSection user={user} />

      {isEdit && (
        <EditBio onCancelEdit={handleCancelEdit} />
      )}

      {/* Set user type modal */}
      {isSetUserType && (
        <SetUserType setOpenModal={setIsSetUserType} />
      )}

      {/* Add section modal */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <div className='flex justify-between items-center mb-3'>
            <p className='text-sm font-semibold'>Add Section</p>
            <button onClick={() => setOpenModal(false)}>
              <X size={18} color='gray' />
            </button>
          </div>

          <Tabs className="addsection text-xs" aria-label="Settings tabs">
            <Tabs.Item title="Experience">
            </Tabs.Item>
            <Tabs.Item title="Skills">
            </Tabs.Item>
            <Tabs.Item title="Qualifications">
            </Tabs.Item>
          </Tabs>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SettingsComponent;
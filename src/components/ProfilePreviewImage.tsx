import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";


interface ProfilePreviewImageProps {
  file: any; 
}

const ProfilePreviewImage: React.FC<ProfilePreviewImageProps> = ({ file }) => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null); 
  const selectUser = (state: any) => state.auth.user || ''; 
  const user = useSelector(selectUser) || '';


  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPreview(reader.result); 
        }
      };
    } else {
      setPreview(null); 
    }
  }, [file]);

  return (
    <div>
      {preview && <img className="w-28 h-28 rounded-full" src={preview.toString()} alt="" />} 
     

    </div>
  );
};

export default ProfilePreviewImage;

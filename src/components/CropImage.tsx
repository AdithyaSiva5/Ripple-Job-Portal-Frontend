import React, { useState } from "react";
import Cropper from "react-easy-crop";
import UseCropImage from '../hooks/GetCroppedImg'

interface Props {
  imgUrl: string;
  aspectInit: { value: number };
  setCroppedImg: React.Dispatch<React.SetStateAction<string[]>>; 
  handleNextImage: () => void;
  handleCancel: () => void;
}

const CropImage: React.FC<Props> = ({
  imgUrl,
  aspectInit,
  setCroppedImg,
  handleNextImage,
  handleCancel
}) => {
  const [disable, setDisable] = useState<boolean>(false);
  const zoomInit: number = 1;
  const cropInit: { x: number; y: number } = { x: 0, y: 0 };
  
  const [zoom, setZoom] = useState<number>(zoomInit);
  const [crop, setCrop] = useState<{ x: number; y: number }>(cropInit);
  const [croppedAreaPx, setCroppedAreaPx] = useState<any>(null);

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onCropComplete = (croppedArea: any, croppedAreaPxc: any) => {
    setCroppedAreaPx(croppedAreaPxc);
  };

  const onCrop = async () => {
    setDisable(true);
    try {
      const croppedUrl = await UseCropImage(imgUrl, croppedAreaPx);
      setDisable(false);
      setCroppedImg(prevImages => [...prevImages, croppedUrl]);
      handleNextImage()
      console.log(croppedUrl)
    } catch (error) {
      setDisable(false);
     
    }
  };

  return (
    <div className="">
      <div className="fixed bg-black top-0 left-0 right-0 bottom-0 z-10 bg-transparent"></div>
      <div className="fixed top-0 left-0 right-0 bottom-[120px] z-20">
        <Cropper
          image={imgUrl}
          zoom={zoom}
          crop={crop}
          aspect={aspectInit.value}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="fixed bottom-32 left-0 w-[100%] h-[80px] z-20">
        <div className="text-center">
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onInput={(e) => {
              onZoomChange(parseFloat(e.target.value));
            }}
            className="w-[50%]"
          />
        </div>
        <div className="text-center">
          <button type="button"
            className="bg-red-500 text-white px-4 p-1 mr-5 rounded-lg"
            onClick={handleCancel}
          >
            cancel
          </button>
          {disable ? (
            <button type="button" className="bg-green-500 text-white px-4 p-1 rounded-lg pointer-events-none">
              crop
            </button>
          ) : (
            <button
              className="bg-green-500 text-white px-4 p-1 rounded-lg"
              onClick={onCrop}
            >
              crop
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropImage;
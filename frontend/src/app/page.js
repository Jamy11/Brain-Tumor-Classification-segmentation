"use client";
import { setImageSrc } from "@/redux/features/prediction-slice";
import { useDispatch, useSelector } from "react-redux";
import ImageContainer from "@/components/Image/ImageContainer";
import { setImageFile } from "@/redux/features/file-slice";

export default function Home() {
  const dispatch = useDispatch();
  const { imageFile } = useSelector((state) => state.file);

  const handleImageUpload = (event, setFile) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(setImageSrc(reader.result));
      dispatch(setImageFile(event.target.files[0]));
      // setSegmentedSrc(null); // Clear previous segmented image
      // setIsClassified(false);
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    reader.readAsDataURL(file);
  };

  console.log(imageFile);
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div
          // style={{ flexDirection: "row !important" }}
          className="flex justify-center"
        >
          <div className="flex flex-row items-center space-y-4">
            <ImageContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

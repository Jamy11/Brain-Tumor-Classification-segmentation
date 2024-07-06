import { setImageSrc } from "@/redux/features/prediction-slice";
import { useDispatch } from "react-redux";
const dispatch = useDispatch();
const handleImageUpload = (event, setFile) => {
  const file = event.target.files[0];
  if (!file) {
    console.error("No file selected");
    return;
  }
  const reader = new FileReader();
  reader.onloadend = () => {
    dispatch(setImageSrc(reader.result));
    setFile(event.target.files[0]);
    // setSegmentedSrc(null); // Clear previous segmented image
    // setIsClassified(false);
  };

  reader.onerror = (error) => {
    console.error("Error reading file:", error);
  };

  reader.readAsDataURL(file);
};

export { handleImageUpload };

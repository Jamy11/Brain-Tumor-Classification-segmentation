"use client";
import ImageUpload from "@/components/Image/ImageUpload";
import { Container } from "@chakra-ui/react";
import { Center, Square, Circle } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import { handleImageUpload } from "@/utils/utils";
import { setImageSrc } from "@/redux/features/prediction-slice";
import { useDispatch } from "react-redux";
import ImageContainer from "@/components/Image/ImageContainer";
const page = () => {
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = (event, setFile) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(setImageSrc(reader.result));
      setImageFile(event.target.files[0]);
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
    <Container>
      {imageFile === null && (
        <ImageUpload
          handleImageUpload={handleImageUpload}
          setImageFile={setImageFile}
        />
      )}

      {imageFile && <ImageContainer />}
    </Container>
  );
};

export default page;

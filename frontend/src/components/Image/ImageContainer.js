import React from "react";
import MyImage from "./MyImage";
import ImageSegmentation from "../ImageSegmentation";

const ImageContainer = () => {
  return (
    <div>
      <MyImage />

      <ImageSegmentation />
    </div>
  );
};

export default ImageContainer;

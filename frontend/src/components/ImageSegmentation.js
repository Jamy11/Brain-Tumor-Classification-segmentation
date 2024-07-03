import React from "react";

const ImageSegmentation = ({ segmentedSrc }) => {
  return (
    <div className="segmentedSection">
      {segmentedSrc && (
        <div className="segmentedImageContainer">
          <h2>Segmented Image</h2>
          <img src={segmentedSrc} alt="Segmented" className="segmentedImage" />
        </div>
      )}
    </div>
  );
};

export default ImageSegmentation;

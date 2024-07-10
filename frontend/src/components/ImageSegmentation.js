import React from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";

const ImageSegmentation = () => {
  const segmentedImage = useSelector(
    (state) => state.segmentation.segmentedImage
  );
  const segmentationStatus = useSelector((state) => state.segmentation.status);
  return (
    <>
      {segmentationStatus == "idle" ? (
        <></>
      ) : (
        segmentationStatus == "loading" && <LoadingSpinner />
      )}

      {segmentationStatus == "succeeded" && (
        <div className="">
          <div className="p-8 max-w-screen-md mx-auto">
            {/* Title */}
            <h1 className="text-center text-3xl font-bold mb-4">
              Image Segmentation
            </h1>

            {/* Image with Effects */}
            <div className="relative rounded-lg overflow-hidden mb-8">
              <img
                src={`data:image/png;base64,${segmentedImage}`}
                alt="Segmented Image"
                className="w-full h-auto transition-transform duration-500 transform hover:scale-110"
              />
              <div className="absolute inset-0 bg-black opacity-0 hover:opacity-25 transition-opacity duration-500"></div>
            </div>

            {/* Description or Additional Information */}
            <div className="text-center text-gray-600">
              <p>This is the segmented image.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageSegmentation;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { segmentImage } from "@/redux/features/segmentation-slice";

const MyImage = () => {
  const dispatch = useDispatch();
  const { imageFile } = useSelector((state) => state.file);

  const imageSrc = useSelector((state) => state.prediction.imageSrc);

  const handleSegmentation = () => {
    if (imageFile) {
      dispatch(segmentImage(imageFile));
    }
  };
  //  src={"https://bit.ly/dan-abramov"}
  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg bg-white">
      {/* Image */}
      <div className="mb-4">
        <img src={imageSrc} alt="Image" className="w-full rounded-lg" />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mb-4">
        <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
          Image Classification
        </button>
        <button
          className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          onClick={handleSegmentation}
        >
          Image Segmentation
        </button>
      </div>

      {/* Delete Button */}
      <div className="flex justify-center">
        <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
          Delete Image
        </button>
      </div>
    </div>
  );
};

export default MyImage;

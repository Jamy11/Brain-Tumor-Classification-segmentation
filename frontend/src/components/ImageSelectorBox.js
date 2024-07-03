import React, { useState } from "react";
import "../app/styles//Bootstrap.css"; // Make sure to import your CSS file
import { setFile, predictTumor } from "@/redux/features/prediction-slice";
import { useDispatch, useSelector } from "react-redux";

export default function ImageSelectorBox() {
  // redux started
  // const dispatch = useDispatch();
  // const imageSrc = useSelector((state) => state.prediction.imageSrc);
  // const mainResult = useSelector((state) => state.prediction.mainResult);
  // const status = useSelector((state) => state.prediction.status);
  // const error = useSelector((state) => state.prediction.error);
  const [result, setResult] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [segmentedSrc, setSegmentedSrc] = useState(null);
  const [isClassified, setIsClassified] = useState(false);

  const handleClassify = () => {
    // Dummy data to mimic classification result
    setResult({
      label: "golden retriever",
      confidence: 80.59,
      otherLabels: [
        { label: "Labrador retriever", confidence: 2.27 },
        { label: "tennis ball", confidence: 0.3 },
        { label: "kuvasz", confidence: 0.22 },
        { label: "cocker spaniel", confidence: 0.2 },
      ],
    });
    setIsClassified(true);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
      setResult(null); // Clear previous result when a new image is uploaded
      setSegmentedSrc(null); // Clear previous segmented image
      setIsClassified(false);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleDeleteImage = () => {
    setImageSrc(null);
    setResult(null);
    setSegmentedSrc(null);
    setIsClassified(false);
  };

  const handleSegmentation = () => {
    // Dummy segmented image URL
    setSegmentedSrc(imageSrc);
  };

  return (
    <div className="container">
      <h1>Brain Tumor Classification And Segmentation</h1>
      <div className="content">
        <div className="imageSection">
          <div className="imageContainer">
            {imageSrc ? (
              <img src={imageSrc} alt="Uploaded" className="uploadedImage" />
            ) : (
              <p className="uploadPrompt">
                Please upload an image to classify.
              </p>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="uploadInput"
          />
          {imageSrc && !isClassified && (
            <button onClick={handleClassify} className="classifyButton">
              Classify
            </button>
          )}
          {imageSrc && isClassified && (
            <div className="buttonGroup">
              <button onClick={handleDeleteImage} className="deleteButton">
                Delete Image
              </button>
              <button onClick={handleSegmentation} className="segmentButton">
                Image Segmentation
              </button>
            </div>
          )}
        </div>
        <div className="resultSection">
          {result && (
            <div className="result">
              <h2>Result</h2>
              <div className="resultItem">
                <span>{result.label}</span>
                <span>{result.confidence}%</span>
              </div>
              {result.otherLabels.map((item, index) => (
                <div key={index} className="resultItem">
                  <span>{item.label}</span>
                  <span>{item.confidence}%</span>
                </div>
              ))}
            </div>
          )}
          {segmentedSrc && (
            <div className="segmentedImageContainer">
              <h2>Segmented Image</h2>
              <img
                src={segmentedSrc}
                alt="Segmented"
                className="segmentedImage"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import "../app/styles//Bootstrap.css"; // Make sure to import your CSS file
import { setImageSrc, predictTumor } from "@/redux/features/prediction-slice";
import { useDispatch, useSelector } from "react-redux";
import ImageClassifier from "./ImageClassifier";
import ImageSegmentation from "./ImageSegmentation";
import { segmentImage } from "@/redux/features/segmentation-slice";

export default function ImageHomePage() {
  // redux started
  const dispatch = useDispatch();
  const imageSrc = useSelector((state) => state.prediction.imageSrc);
  const mainResult = useSelector((state) => state.prediction.mainResult);
  const status = useSelector((state) => state.prediction.status);
  const error = useSelector((state) => state.prediction.error);
  const [result, setResult] = useState(null);
  // const [imageSrc, setImageSrc] = useState(null);
  const [segmentedSrc, setSegmentedSrc] = useState(null);
  const [isClassified, setIsClassified] = useState(false);
  const [file, setFile] = useState(null);

  const { segmentedImage } = useSelector((state) => state.segmentation);
  const segmentationStatus = useSelector((state) => state.segmentation.status);
  const segmentationError = useSelector((state) => state.segmentation.error);

  const handleClassify = () => {
    // Dummy data to mimic classification result
    // setResult({
    //   label: "golden retriever",
    //   confidence: 80.59,
    //   otherLabels: [{ label: "Labrador retriever", confidence: 2.27 }],
    // });
    // setIsClassified(true);
    // print(file);
    dispatch(predictTumor(file));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(setImageSrc(reader.result));
      setFile(event.target.files[0]);
      setSegmentedSrc(null); // Clear previous segmented image
      setIsClassified(false);
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    reader.readAsDataURL(file);
  };

  const handleDeleteImage = () => {
    dispatch(setImageSrc(null));
    // setResult(null);
    setSegmentedSrc(null);
    setIsClassified(false);
  };

  const handleSegmentation = () => {
    // Dummy segmented image URL
    // setSegmentedSrc(imageSrc);
    if (file) {
      dispatch(segmentImage(file));
    }
  };

  const renderSegmentedImage = (segmentedImage) => {
    if (segmentedImage) {
      const width = 224;
      const height = 224;
      const canvasRef = React.createRef();

      const drawImage = () => {
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          const imageData = ctx.createImageData(width, height);
          for (let i = 0; i < segmentedImage.length; i++) {
            const value = segmentedImage[i];
            imageData.data[i * 4] = value; // R
            imageData.data[i * 4 + 1] = value; // G
            imageData.data[i * 4 + 2] = value; // B
            imageData.data[i * 4 + 3] = 255; // A
          }
          ctx.putImageData(imageData, 0, 0);
        }
      };

      // React.useEffect(() => {
      //   drawImage();
      // }, [segmentedImage]);

      return <canvas ref={canvasRef} width={width} height={height}></canvas>;
    }
    return null;
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
          {imageSrc && (
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
        <div style={{ margin: "5%" }}>
          {segmentationStatus === "succeeded" && segmentedImage && (
            <img
              src={`data:image/png;base64,${segmentedImage}`}
              alt="Segmented Mask"
              style={{ width: "224px", height: "224px" }}
            />
          )}
          <ImageClassifier />
          {/* <ImageSegmentation /> */}
        </div>
      </div>
    </div>
  );
}

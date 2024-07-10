import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ImageClassifier = () => {
  const { mainResult, percentages, status } = useSelector(
    (state) => state.prediction
  );
  const progressData = [
    { label: "Glioma", value: percentages["Glioma"], color: "bg-blue-500" },
    {
      label: "Meningioma",
      value: percentages["Meningioma"],
      color: "bg-green-500",
    },
    {
      label: "No Tumor",
      value: percentages["No Tumor"],
      color: "bg-yellow-500",
    },
    {
      label: "Pituitary",
      value: percentages["Pituitary"],
      color: "bg-red-500",
    },
  ];
  const [progressValues, setProgressValues] = useState([0, 0, 0, 0]);

  useEffect(() => {
    progressData.forEach((item, index) => {
      setTimeout(() => {
        setProgressValues((prevValues) => {
          const newValues = [...prevValues];
          newValues[index] = item.value;
          return newValues;
        });
      }, 500 * (index + 1));
    });
  }, [percentages]);

  return (
    <>
      {status == "idle" ? <></> : status == "loading" && <>Loading</>}
      {status == "succeeded" && (
        <div className="p-8 max-w-screen-md mx-auto">
          {/* Title */}
          <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">
            Image Classifier
          </h1>

          {/* Progress Bars */}
          <div className="space-y-6">
            {progressData.map((item, index) => (
              <div key={index} className="w-full">
                <p className="mb-2 text-lg text-gray-700">{item.label}</p>
                <div className="relative h-2 rounded-full bg-gray-300 overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full ${item.color} rounded-full transition-all ease-out duration-1000`}
                    style={{ width: `${progressValues[index]}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Prediction */}
          <div className="mt-10 text-center">
            <p className="font-bold text-xl text-gray-800">Prediction:</p>
            <p className="text-2xl text-gray-700">{mainResult}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageClassifier;

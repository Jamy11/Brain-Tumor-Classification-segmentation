import { useEffect, useState } from "react";

const ImageClassifier = () => {
  const progressData = [
    { label: "Progress 1", value: 70, color: "bg-blue-500" },
    { label: "Progress 2", value: 85, color: "bg-green-500" },
    { label: "Progress 3", value: 50, color: "bg-yellow-500" },
    { label: "Progress 4", value: 95, color: "bg-red-500" },
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
  }, []);
  return (
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
        <p className="text-2xl text-gray-700">No tumor</p>
      </div>
    </div>
  );
};

export default ImageClassifier;

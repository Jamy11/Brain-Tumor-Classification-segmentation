import { Box, Heading, Progress, Text, VStack } from "@chakra-ui/react";

const ImageClassifier = () => {
  const progressData = [
    { label: "Class 1", value: 60, color: "blue-500" },
    { label: "Class 2", value: 40, color: "green-500" },
    { label: "Class 3", value: 80, color: "purple-500" },
    { label: "Class 4", value: 20, color: "orange-500" },
  ];
  return (
    <div className="p-8 max-w-screen-md mx-auto">
      {/* Title */}
      <h1 className="text-center text-3xl font-bold mb-4">Image Classifier</h1>

      {/* Progress Bars */}
      <div className="space-y-4">
        {progressData.map((item, index) => (
          <div key={index} className="w-full">
            <p className="mb-2">{item.label}</p>
            <div className="relative h-4 rounded-full bg-gray-300">
              <div
                className={`absolute left-0 top-0 h-full bg-${item.color} rounded-full transition-all ease-out duration-1000`}
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Prediction */}
      <div className="mt-8">
        <p className="font-bold">Prediction:</p>
        <p>No tumor</p>
      </div>
    </div>
  );
};

export default ImageClassifier;

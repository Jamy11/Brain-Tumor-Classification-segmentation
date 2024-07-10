
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-16 h-16 border-4 border-dotted rounded-full animate-spin-slow border-blue-400"></div>
    </div>
  );
};

export default LoadingSpinner;

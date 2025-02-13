import React from "react";
import loader from "../../assets/loaderAnimation.gif"; // Path to your SVG file

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-auto mb-10 ">
      <img
        className="w-16 h-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        src={loader}
        alt="Loader"
      />
    </div>
  );
};

export default LoadingSpinner;

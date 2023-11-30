import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="w-full h-full bg-primary bg-opacity-50 backdrop-blur fixed z-[1000]">
      <div className="flex items-center justify-center h-full">
        <span className="loader"></span>
      </div>
    </div>
  );
};

export default Loading;

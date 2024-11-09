import React from "react";

const CircleButton = ({ startCallInline, connected, endCall }) => {
  const handleClick = () => {
    console.log("minhdz");
    if (connected) {
      endCall();
    } else {
      startCallInline();
    }
  };
  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900 via-purple-700 to-transparent opacity-50 h-80 w-80 rounded-full blur-2xl"></div>

      {/* Outermost Gradient Circle with Shadow */}
      <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full h-64 w-64 animate-pulse shadow-[0_0_70px_25px_rgba(139,92,246,0.5)]"></div>

      {/* Additional Outer Circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full h-60 w-60 animate-pulse"></div>
      </div>

      {/* Original Outer Gradient Circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full h-56 w-56 animate-pulse"></div>
      </div>

      {/* Additional Middle Circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full h-52 w-52"></div>
      </div>

      {/* Original Middle Circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-full h-48 w-48"></div>
      </div>

      {/* Additional Inner Circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-gradient-to-r from-purple-800 to-indigo-800 rounded-full h-44 w-44 flex items-center justify-center shadow-lg"></div>
      </div>

      {/* Original Inner Circle with Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-gradient-radial from-teal-400 via-emerald-500 to-cyan-600 rounded-full h-40 w-40 flex items-center justify-center shadow-lg">
          <span className="text-white text-xl font-semibold"></span>
        </div>
      </div>
    </div>
  );
};

export default CircleButton;

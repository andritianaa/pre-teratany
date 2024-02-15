import React from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";

interface TopBarProps {
  text: string;
}

const TopBar: React.FC<TopBarProps> = ({ text }) => {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div className="fixed top-0 z-40 w-full h-14 bg-white border-b border-gray-200">
      <div className="flex items-center h-full mx-auto">
        <HiArrowNarrowLeft onClick={handleGoBack} size={26} className="mx-3" />
        <p className="text-xl flex justify-center font-medium items-center">
          {text}
        </p>
      </div>
    </div>
  );
};

export default TopBar;

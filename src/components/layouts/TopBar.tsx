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
    <div className="flex items-start w-full">
      <HiArrowNarrowLeft onClick={handleGoBack} size={26} className="mx-3" />
      <p className="text-xl flex justify-center font-medium items-center">
        {text}
      </p>
    </div>
  );
};

export default TopBar;

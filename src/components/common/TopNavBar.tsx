import React from "react";
import { IoNotificationsOutline } from "@react-icons/all-files/io5/IoNotificationsOutline";
import { BsChatDots } from "@react-icons/all-files/bs/BsChatDots";

interface TopNavBarProps {
  notifCount: number;
  messageCount: number;
}

const TopNavBar: React.FC<TopNavBarProps> = (props: any) => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-12 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-full px-2 max-w-lg mx-auto font-medium">
        <p className="text-lg font-serif flex justify-center font-medium px-2">
          <img
            className="h-10"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/150px-Instagram_logo.svg.png"
            alt="instagram"
          />
        </p>
        <div className="flex items-center">
          <div className=" relative px-2">
            <IoNotificationsOutline size={27} />
            <p className="absolute -top-2 right-1 w-5 h-5 text-white text-xs bg-red-500 rounded-full">
              {props.notifCount}
            </p>
          </div>
          <div className="relative px-2">
            <BsChatDots size={26} />
            <p className="absolute -top-2 right-0 w-5 h-5 text-white text-xs bg-red-500 rounded-full">
              {props.messageCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TopNavBar;

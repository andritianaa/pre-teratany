import React from "react";
import LogoTeratany from "../../assets/Teratany.jpg";
import SwitchLangage from "../SwitchLangage";

interface TopNavBarProps {
  notifCount: number;
  messageCount: number;
}

const TopNavBar: React.FC<TopNavBarProps> = (props: any) => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-12 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-full px-2 max-w-lg mx-auto font-medium">
        <p className="text-lg font-serif flex justify-center font-medium">
          <img className="h-10" src={LogoTeratany} alt="instagram" />
        </p>
        <SwitchLangage />
        {/* <div className="flex items-center">
          <div className=" relative px-2">
            <IoNotificationsOutline
              size={27}
              onClick={() => navigate("/notifications")}

            />
            <p className="absolute -top-2 right-1 w-5 h-5 text-white text-xs bg-red-500 rounded-full">
              {props.notifCount}
            </p>
          </div>
          <div className="relative px-2">
            <BsChatDots size={26} onClick={() => navigate("/chat/list")} />
            <p className="absolute -top-2 right-0 w-5 h-5 text-white text-xs bg-red-500 rounded-full">
              {props.messageCount}
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default TopNavBar;

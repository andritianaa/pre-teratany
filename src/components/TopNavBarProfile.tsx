import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineChevronDown } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useFetchUserByToken from "../hooks/useFetchUserByToken";

interface TopNavBarProps {
  user: string;
  path: string;
  onClick?: () => void;
}

const TopNavBarProfile: React.FC<TopNavBarProps> = ({
  user,
  path,
  onClick,
}) => {
  const navigate = useNavigate();
  const userConnected = useFetchUserByToken();

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-12 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-full px-2 max-w-lg mx-auto font-medium">
        <div className="flex items-center">
          <p className="pr-2 pl-3">{user}</p>
          {userConnected?.administratedProfiles?.length! > 0 && (
            <HiOutlineChevronDown size={22} onClick={onClick} />
          )}
        </div>
        <button
          onClick={() => {
            navigate(path);
          }}
          type="button"
          className="inline-flex flex-col items-center justify-center px-4 hover:bg-gray-50 dark:hover-bg-gray-800 group"
        >
          <IoSettingsOutline size={28} color="black" />
        </button>
      </div>
    </div>
  );
};
export default TopNavBarProfile;

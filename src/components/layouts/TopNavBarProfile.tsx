import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineChevronDown } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useFetchUserByToken from "../../hooks/useFetchUserByToken";

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
    <div className="fixed z-10 mt-8 pt-2 flex items-center justify-between w-full max-w-[600px] h-12 px-2 font-medium bg-white border-b border-gray-200">
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
  );
};
export default TopNavBarProfile;

import React from "react";
import { useNavigate } from "react-router-dom";
interface EditTypeProps {
  name: string;
  path?: string;
  type?: string;
  icon: JSX.Element;
}

const EditType: React.FC<EditTypeProps> = ({ name, path, type, icon }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center mb-5 cursor-pointer"
      onClick={() => navigate(path as string)}
    >
      {icon}
      <p className="px-3 text-lg font-normal">{name}</p>
    </div>
  );
};

export default EditType;

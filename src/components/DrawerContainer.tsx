import React from "react";
import { Drawer } from "@material-tailwind/react";
import { HiOutlineXMark } from "react-icons/hi2";
import Comments from "../views/Comments/Comments";
import { useState, useEffect } from "react";

type DrawerProps = {
  isOpen?: boolean;
  onClose: () => void;
  _id?: string;
};

export const DrawerContainer: React.FC<DrawerProps> = ({
  isOpen = false,
  onClose,
  _id,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  useEffect(() => {
    setIsDrawerOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDrawerOpen]);

  return isOpen ? (
    <React.Fragment>
      <Drawer
        placeholder=""
        open={isOpen}
        onClose={onClose}
        className="p-4 z-1000 rounded-l-2xl rounded-r-2xl !h-[90%] !max-h-[90%]"
        placement="bottom"
      >
        <div className=" flex flex-col items-end justify-between">
          <HiOutlineXMark className="h-6 w-6 z-1000" onClick={onClose} />X
        </div>
        <div className=" flex flex-col items-center justify-center">
          <Comments publicationId={_id!} />
        </div>
      </Drawer>
    </React.Fragment>
  ) : null;
};

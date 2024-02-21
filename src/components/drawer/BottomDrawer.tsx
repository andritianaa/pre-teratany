import React from "react";
import { Drawer } from "@material-tailwind/react";
import { HiOutlineXMark } from "react-icons/hi2";
import { useState, useEffect } from "react";

type DrawerProps = {
  isOpen?: boolean;
  onClose: () => void;
  content: JSX.Element;
  title: string;
  heightPercentage?: number;
};

export const BottomDrawer: React.FC<DrawerProps> = ({
  isOpen = false,
  onClose,
  content,
  title,
  heightPercentage,
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
      <div className="flex flex-col justify-center items-center w-full max-w-[600px]">
        <Drawer
          placeholder=""
          open={isOpen}
          onClose={onClose}
          className={`drawer p-4 z-20 w-[600px] bg-white rounded-l-2xl rounded-r-2xl !h-[${
            heightPercentage ? heightPercentage : 90
          }%] !max-h-[${heightPercentage ? heightPercentage : 90}%]`}
          placement="bottom"
        >
          <div className=" flex  items-center justify-between  pb-4">
            <h3 className="font-bold">{title}</h3>
            <HiOutlineXMark
              className="h-6 w-6 z-50"
              aria-hidden="true"
              onClick={onClose}
            />
          </div>
          <div className=" flex flex-col overflow-y-scroll h-[88%]">
            {content}
          </div>
        </Drawer>
      </div>
    </React.Fragment>
  ) : null;
};

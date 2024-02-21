import React from "react";

import { RxDotsHorizontal } from "react-icons/rx";
import DrawerSettings from "../../../components/drawer/DrawerSettings";

interface MenuProps {
  id: string;
}

export const MenuPublication: React.FC<MenuProps> = ({ id }) => {
  const [openBottom, setOpenBottom] = React.useState<boolean>(false);

  const openDrawerBottom = () => {
    window.history.pushState({ page: "" }, "", "?isModal=true");
    setOpenBottom(true);
  };

  const closeDrawerBottom = () => {
    setOpenBottom(false);
  };
  window.addEventListener("popstate", () => {
    closeDrawerBottom();
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace(/(\?|&)isModal=true/, "");
    window.history.replaceState({ page: "" }, "", newUrl);
  });

  return (
    <>
      <RxDotsHorizontal onClick={openDrawerBottom} size={23} />
      <DrawerSettings
        id={id}
        openBottom={openBottom}
        closeBottom={closeDrawerBottom}
      />
    </>
  );
};

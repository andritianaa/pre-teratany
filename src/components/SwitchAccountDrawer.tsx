import React from "react";
import { Drawer, Typography, IconButton } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import PageSwitchCard from "./PageSwitchCard";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useFetchUserByToken from "../hooks/useFetchUserByToken";
import useFetchProfile from "../hooks/useFetchProfile";
import { useTranslation } from "react-i18next";

interface DrawerProps {
  openBottom: any;
  closeBottom: any;
  id?: string;
}

const SwitchAccountDrawer: React.FC<DrawerProps> = ({
  openBottom,
  closeBottom,
  id,
}) => {
  const handleClickClose = () => {
    // Appel de la fonction closeBottom du composant parent
    closeBottom();
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const userConnected = useFetchUserByToken();

  let accounts: any = useSelector<RootState>(
    (state) => state.teratany_account.account
  );

  const profileConnectedUser = useFetchProfile();
  const { t } = useTranslation();

  accounts = accounts.filter(
    (account: any) => account.id !== profileConnectedUser?._id
  );

  useEffect(() => {
    setIsDrawerOpen(openBottom);
  }, [openBottom]);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDrawerOpen, openBottom]);

  return (
    <>
      {userConnected?.administratedProfiles?.length! > 0 ? (
        <React.Fragment>
          <Drawer
            placeholder=""
            placement="bottom"
            open={openBottom}
            onClose={closeBottom}
            className="p-4 rounded-3xl"
          >
            <div className="flex items-center justify-between w-full">
              <Typography
                placeholder=""
                className="text-lg font-semibold border-b border-b-1 border-gray-300"
                color="black"
              >
                {t("switchAccount.name")}
              </Typography>
              <IconButton
                placeholder=""
                variant="text"
                color="blue-gray"
                onClick={handleClickClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5 absolute -top-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            </div>
            <div className=" h-[60%] w-full overflow-y-scroll">
              {accounts.map((account: any) => (
                <PageSwitchCard
                  id={account.id}
                  name={account.name}
                  desc={
                    account.followers > 1
                      ? t("followers.number.plural", {
                          followers: account.followers,
                        })
                      : t("followers.number.singular", {
                          followers: account.followers,
                        })
                  }
                  image={account.image}
                />
              ))}
            </div>
          </Drawer>
        </React.Fragment>
      ) : null}
    </>
  );
};

export default SwitchAccountDrawer;

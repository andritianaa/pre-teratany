import React, { useState } from "react";
import EditType from "../../components/common/EditType";
import { FiChevronDown } from "@react-icons/all-files/fi/FiChevronDown";
import { FiChevronUp } from "@react-icons/all-files/fi/FiChevronUp";
import { GrAddCircle } from "react-icons/gr";
import { VscDebugDisconnect } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/layouts/TopBar";
import PageSwitchCard from "../../components/common/PageSwitchCard";
import { resetUserAuthentication } from "../../store/reducer/user.reducer";
import { FaRegUserCircle } from "@react-icons/all-files/fa/FaRegUserCircle";
import { MdSecurity, MdMyLocation } from "react-icons/md";
import { BiPhotoAlbum } from "@react-icons/all-files/bi/BiPhotoAlbum";
import { resetAccountConnected } from "../../store/reducer/account.reducer";
import { useTranslation } from "react-i18next";
import SwitchLangage from "../../components/common/SwitchLangage";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

const EditProfileMenu: React.FC = () => {
  const [accordionVisible, setVisibility] = useState(false);
  const { profile } = useAppSelector((state) => state.teratany_user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  let accounts = useAppSelector((state) => state.teratany_account.account);

  accounts = accounts.filter((account: any) => account.id !== profile?._id);

  const userIcon = <FaRegUserCircle size={23} />;
  const profilePicture = <BiPhotoAlbum size={23} />;
  const passwordIcon = <MdSecurity size={23} />;
  const locationIcon = <MdMyLocation size={23} />;

  const showAccordion = () => {
    setVisibility(!accordionVisible);
  };
  const logout = () => {
    dispatch(resetUserAuthentication());
    dispatch(resetAccountConnected());
    navigate("/signin");
  };
  return (
    <>
      <TopBar
        text={`${
          profile?.profileType === "user"
            ? t("users.setting")
            : t("pages.setting")
        }`}
      />

      <div className="mt-20 mx-4 ">
        <EditType
          name={t("settings.general")}
          type="user"
          path="/profile/edit/general"
          icon={userIcon}
        />
        <EditType
          name={t("settings.picture.name")}
          type="user"
          path="/profile/edit/picture"
          icon={profilePicture}
        />
        {profile?.profileType === "user" && (
          <EditType
            name={t("settings.password.name")}
            type="user"
            path="/profile/edit/password"
            icon={passwordIcon}
          />
        )}
        <EditType
          name={t("settings.location.name")}
          type="user"
          path="/profile/edit/location"
          icon={locationIcon}
        />
      </div>
      <div className="mx-2 my-4">
        {profile?.profileType === "user" && (
          <div
            className="flex items-center justify-between mr-4 mb-2"
            onClick={showAccordion}
          >
            <p className="flex items-start mx-1 pb-1 text-xl font-medium">
              {t("settings.myPages")}
            </p>
            {accordionVisible ? (
              <FiChevronUp
                size={30}
                className="transition-transform ease-in-out"
              />
            ) : (
              <FiChevronDown
                size={30}
                className="transition-transform ease-in-out"
              />
            )}
          </div>
        )}
        {accordionVisible && (
          <div className="max-h-52 w-[100%] overflow-y-auto">
            {accounts.map((account: any) => (
              <PageSwitchCard
                id={account.id}
                name={account.name}
                desc={
                  account.followers > 0
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
        )}
        {profile?.profileType === "user" && (
          <div
            className="flex items-center my-4 mx-1"
            onClick={() => {
              navigate("/page/add/step-1");
            }}
          >
            <GrAddCircle size={28} />
            <p className="px-3 text-lg">{t("settings.addPage.name")}</p>
          </div>
        )}
        <div className="flex flex-col items-start mb-4 mx-1">
          <p className="text-xl font-semibold mx-1 mt-2 mb-3">
            {t("langage.name")}
          </p>
          <SwitchLangage />
        </div>
        <div className="flex items-center my-4 mx-1" onClick={logout}>
          <VscDebugDisconnect size={27} color="rgb(220, 38, 38, 1)" />
          <p className="px-3 text-lg text-red-600">
            {t("settings.disconnect")}
          </p>
        </div>
      </div>
    </>
  );
};

export default EditProfileMenu;

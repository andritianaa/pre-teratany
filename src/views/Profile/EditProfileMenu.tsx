import React, { useState } from "react";
import EditType from "../../components/EditType";
import { FiChevronDown } from "@react-icons/all-files/fi/FiChevronDown";
import { FiChevronUp } from "@react-icons/all-files/fi/FiChevronUp";
import { GrAddCircle } from "react-icons/gr";
import { VscDebugDisconnect } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/common/TopBar";
import PageSwitchCard from "../../components/PageSwitchCard";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { resetUserAuthentication } from "../../store/reducer/user.reducer";
import { FaRegUserCircle } from "@react-icons/all-files/fa/FaRegUserCircle";
import { MdSecurity, MdMyLocation } from "react-icons/md";
import { BiPhotoAlbum } from "@react-icons/all-files/bi/BiPhotoAlbum";
import useFetchProfile from "../../hooks/useFetchProfile";
import { TbCategory2 } from "react-icons/tb";
import { useSelector } from "react-redux";
import { resetAccountConnected } from "../../store/reducer/account.reducer";

const EditProfileMenu: React.FC = () => {
  const [accordionVisible, setVisibility] = useState(false);
  const profile = useFetchProfile();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  let accounts: any = useSelector<RootState>(
    (state) => state.teratany_account.account
  );

  const id = useFetchProfile()?._id;

  accounts = accounts.filter((account: any) => account.id !== id);

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
          profile?.profileType === "user" ? "User settings" : "Page settings"
        }`}
      />

      <div className="mt-20 mx-4 ">
        <EditType
          name="General"
          type="user"
          path="/profile/edit/general"
          icon={userIcon}
        />
        <EditType
          name="Profile picture"
          type="user"
          path="/profile/edit/picture"
          icon={profilePicture}
        />
        {profile?.profileType === "user" && (
          <EditType
            name="Edit Password"
            type="user"
            path="/profile/edit/password"
            icon={passwordIcon}
          />
        )}
        {profile?.profileType !== "user" && (
          <EditType
            name="Edit category"
            type="page"
            path="/profile/edit/category"
            icon={<TbCategory2 size={23} />}
          />
        )}
        <EditType
          name="Location parameter"
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
              My pages
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
                    ? account.followers + " Followers"
                    : account.followers + " Follower"
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
            <p className="px-3 text-lg">Add page</p>
          </div>
        )}
        <div className="flex items-center my-4 mx-1" onClick={logout}>
          <VscDebugDisconnect size={27} />
          <p className="px-3 text-lg">Disconnect</p>
        </div>
      </div>
    </>
  );
};

export default EditProfileMenu;

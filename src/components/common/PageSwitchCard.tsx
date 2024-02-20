import React from "react";
import Button from "./Button";
import useLoadingButton from "hooks/useLoadingButton";
import { useNavigate } from "react-router-dom";
import { setAuthentication } from "store/reducer/user.reducer";
import { FileServerURL } from "api/FileApi";
import profileDefault from "assets/userPics.jpg";
// import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useGetProfileByIdQuery } from "services/api-services/profile/profile.endpoints";

interface PageCardsProps {
  name: string;
  desc: string;
  id?: string;
  image?: string;
}
const PageSwitchCard: React.FC<PageCardsProps> = ({
  name,
  desc,
  id,
  image,
}) => {
  const [isLoading, startLoading] = useLoadingButton();
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  const isEditUser = lastSegment === "edit-user";

  const { token } = useAppSelector((state) => state.teratany_user);

  const { currentData: profile, isSuccess } = useGetProfileByIdQuery(
    {
      id: id!,
      ownId: id!,
    },
    {
      skip: !id,
    }
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const switchAccount = (id: string) => {
    startLoading();
    if (isSuccess) {
      setTimeout(() => {
        dispatch(
          setAuthentication({
            id: id,
            token: token!,
            profile,
            isAuthenticated: true,
          })
        );
        navigate(`/`);
      }, 2000);
    }
  };
  return (
    <div className="mx-1 py-2 mb-2">
      <div className="flex w-full items-center">
        <div className="w-20">
          <img
            alt="page"
            className=" !w-10 !h-10 rounded-full shadow-lg"
            src={image ? FileServerURL + image : profileDefault}
          />
        </div>
        <div className="flex flex-col items-start px-3 w-full flex-5">
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-500 mb-1">{desc}</p>
        </div>
        {!isEditUser && (
          <div className="flex-3">
            <Button
              width="!w-[85%]"
              name={t("switchAccount.switch")}
              onClick={() => switchAccount(id!)}
              isLoading={isLoading}
              showLoadingText={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PageSwitchCard;

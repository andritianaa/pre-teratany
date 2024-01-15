import React from "react";
import { FileServerURL } from "../../api/FileApi";
import Button from "../../components/common/Button";
import { IProfile } from "../../types/profile.type";
import pictureDefault from "../../assets/userPics.jpg";
import { useTranslation } from "react-i18next";

interface PageProfileProps {
  profile: IProfile;
  followText: string;
  follow: () => void;
  changeDrawerStatus: () => void;
}

const PageProfile: React.FC<PageProfileProps> = ({
  profile,
  followText,
  follow,
  changeDrawerStatus,
}) => {
  const { t } = useTranslation();
  return (
    <div className="mt-16 pb-6 border-b border-gray-200">
      <div className="flex items-start justify-evenly">
        <div className="flex flex-col">
          <img
            className="w-20 h-20 object-cover rounded-full  border-2 border-pink-600"
            src={
              profile?.image ? FileServerURL + profile.image : pictureDefault
            }
            alt="profile"
          />
          <p className="text-lg mb-3">{profile?.name}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <div className="flex flex-col ">
              <p className="text-lg font-medium">
                {profile?.publications?.length!}
              </p>
              <p className="">
                {profile?.publications?.length! > 1
                  ? t("posts.plural")
                  : t("posts.singular")}
              </p>
            </div>
            <div className="flex flex-col mx-6">
              <p className="text-lg font-medium">
                {profile?.followers?.length!}
              </p>
              <p className="">
                {profile?.followers?.length! > 1
                  ? t("followers.plural")
                  : "follower.singular"}
              </p>
            </div>
            <div className="flex flex-col ">
              <p className="text-lg font-medium">
                {profile?.localisation?.country?.value}
              </p>
              <p className="">{t("profile.location")}</p>
            </div>
          </div>
          <div className="flex  items-center justify-evenly my-3">
            <div className="flex flex-wrap w-full">
              <div className="w-2 h-2 bg-gray-300 rounded-full mr-1 mb-1"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full mr-1 mb-1"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full mr-1 mb-1"></div>
              <div className="w-2 h-2 bg-black rounded-full mr-1 mb-1"></div>
              <div className="w-2 h-2 bg-black rounded-full mr-1 mb-1"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full mr-1 mb-1"></div>
              <div className="w-2 h-2 bg-black rounded-full mr-1 mb-1"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full mr-1 mb-1"></div>
              <div className="w-2 h-2 bg-black rounded-full mr-1 mb-1"></div>
              <div className="w-2 h-2 bg-black rounded-full mr-1 mb-1"></div>
              <div className="w-2 h-2 bg-black rounded-full mr-1 mb-1"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full mr-1 mb-1"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full mr-1 mb-1"></div>
              <div className="w-2 h-2 bg-black rounded-full mr-1 mb-1"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full mr-1 mb-1"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full mr-1 mb-1"></div>
              <div className="w-2 h-2 bg-black rounded-full mr-1 mb-1"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center mx-2">
        <Button width="w-1/2" height="h-7" name={followText} onClick={follow} />
        <Button width="w-1/2" height="h-7" name={t("profile.message")} />
        <Button
          width=""
          height="h-7"
          name={t("profile.details")}
          onClick={changeDrawerStatus}
        />
      </div>
    </div>
  );
};

export default PageProfile;

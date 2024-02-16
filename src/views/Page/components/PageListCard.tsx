import React, { useEffect, useState } from "react";
import { followProfile } from "api/ProfileApi";
import useToken from "hooks/useToken";
import { withAsync } from "helpers/withAsync";
import useFetchProfile from "hooks/useFetchProfile";
import { ErrorData, ThrowErrorHandler } from "helpers/HandleError";
import { FileServerURL } from "../../../api/FileApi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
interface PageListCardsProps {
  _id: string;
  name: string;
  followers: number;
  isFollowed: boolean;
  isOwner: boolean;
  image: string;
  profileType: string;
}
const PageListCard: React.FC<PageListCardsProps> = ({
  _id,
  name,
  followers,
  isFollowed,
  isOwner,
  image,
  profileType,
}) => {
  const token = useToken();
  const { t } = useTranslation();

  const [followText, setFollowText] = useState<string>("...");

  const profileConnectedUser = useFetchProfile();

  const follow = async () => {
    setFollowText(
      followText === t("followers.follow")
        ? t("followers.unfollow")
        : t("followers.follow")
    );
    const { error } = await withAsync(() =>
      followProfile(token, profileConnectedUser?._id, _id)
    );
    if (error) {
      ThrowErrorHandler(error as ErrorData);
    }
  };

  useEffect(() => {
    setFollowText(isFollowed ? t("followers.unfollow") : t("followers.follow"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFollowed]);

  return (
    <>
      {profileType !== "user" && (
        <div className="w-full p-2 mb-4 mt-4">
          <div className="flex w-full items-center">
            <div className="w-16">
              <Link to={`/profile/${_id}`}>
                <img
                  alt="page"
                  className=" !w-10 !h-10 rounded-full shadow-lg flex-2"
                  src={
                    image
                      ? FileServerURL + image
                      : "https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                  }
                />
              </Link>
            </div>
            <div className="flex flex-col items-start px-4 w-full flex-5">
              <Link to={`/profile/${_id}`}>
                <p className="font-medium">{name}</p>
              </Link>
              <p className="text-sm text-gray-500 mb-1">
                {followers > 1
                  ? t("followers.number.plural", { followers: followers })
                  : t("followers.number.singular", { followers: followers })}
              </p>
            </div>
            {!isOwner && (
              <div className="mr-8 w-[28%]">
                <p
                  className={
                    isFollowed ? "font-bold text-sm " : "font-bold text-sm mr-8"
                  }
                  onClick={follow}
                >
                  {followText}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PageListCard;

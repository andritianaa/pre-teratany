import React, { useEffect, useState } from "react";
import { followProfile } from "api/ProfileApi";
import useToken from "hooks/useToken";
import { withAsync } from "helpers/withAsync";
import useFetchProfile from "hooks/useFetchProfile";
import { ErrorData, ThrowErrorHandler } from "helpers/HandleError";
import { FileServerURL } from "../../../api/FileApi";
import { Link } from "react-router-dom";
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
  const [followText, setFollowText] = useState<string>("...");
  const profileConnectedUser = useFetchProfile();

  const follow = async () => {
    setFollowText(followText === "Follow" ? "UnFollow" : "Follow");
    const { error } = await withAsync(() =>
      followProfile(token, profileConnectedUser?._id, _id)
    );
    if (error) {
      ThrowErrorHandler(error as ErrorData);
    }
  };

  useEffect(() => {
    setFollowText(isFollowed ? "UnFollow" : "Follow");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFollowed]);

  return (
    <>
      {profileType !== "user" && (
        <div className="mx-1 w-full p-2 mb-4">
          <div className="flex items-center">
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
                {followers} Followers
              </p>
            </div>
            {!isOwner && (
              <div className="mr-4 flex-3">
                <p
                  className={
                    isFollowed
                      ? "font-normal text-sm text-gray-400"
                      : "font-bold text-sm "
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
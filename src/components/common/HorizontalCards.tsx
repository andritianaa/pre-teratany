import React, { useEffect, useState } from "react";
import Button from "./Button";
import { FileServerURL } from "../../api/FileApi";
import { withAsync } from "../../helpers/withAsync";
import { followProfile } from "../../api/ProfileApi";
import useToken from "../../hooks/useToken";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { addSearchHistory } from "../../api/SearchApi";
import { ErrorData, ThrowErrorHandler } from "../../helpers/HandleError";
import profileDefault from "../../assets/userPics.jpg";
import { useDispatch } from "react-redux";
import { addHistoryData } from "../../store/reducer/history.reducer";
import { IHistory } from "../../types/historique.type";
import { useAppSelector } from "../../store/hooks";
import { useTranslation } from "react-i18next";

interface horizontalCardsProps {
  name: string;
  desc: string;
  image?: string;
  _id?: string;
  isFollowed?: boolean;
  isButtonShowed?: boolean;
}

const HorizontalCards: React.FC<horizontalCardsProps> = ({
  name,
  desc,
  image,
  _id,
  isFollowed,
  isButtonShowed,
}) => {
  const token = useToken();
  const { t } = useTranslation();
  const { profile } = useAppSelector((state) => state.teratany_user);

  const [followText, setFollowText] = useState<string>(
    isFollowed! === true ? t("followers.unfollow") : t("followers.follow")
  );
  const dispatch = useDispatch();

  const follow = async () => {
    setFollowText(
      followText === t("followers.follow")
        ? t("followers.unfollow")
        : t("followers.follow")
    );
    const { error } = await withAsync(() =>
      followProfile(token, profile?._id, _id)
    );
    if (error instanceof AxiosError) {
      const error_message: string =
        error?.response?.data.description ||
        error?.response?.data ||
        error.message;
      toast.error(error_message);
    }
  };

  const addSearchResult = async (
    query: string,
    profileId: string,
    pictureUrl: string
  ) => {
    if (query.length > 4 && query.length < 20) {
      const { error, response } = await withAsync(() =>
        addSearchHistory(token, profile?._id!, query, profileId, pictureUrl)
      );
      if (error) {
        ThrowErrorHandler(error as ErrorData);
      } else {
        const historyData = response?.data as IHistory;
        dispatch(
          addHistoryData({
            owner: profile?._id!,
            text: query,
            profileId,
            pictureUrl,
            _id: historyData?._id,
          })
        );
      }
    }
  };

  useEffect(() => {}, [profile?._id, _id]);

  return (
    <div className="mx-1 w-full p-2 ">
      <div className="flex items-center">
        <Link
          to={`/profile/${_id}`}
          className="mr-4"
          onClick={() => addSearchResult(name, _id!, image!)}
        >
          <img
            alt="profile"
            className="rounded-full w-12 h-12 max-h-12 max-w-12 min-w-12 min-h-12 object-cover mr-4"
            src={image ? FileServerURL + image : profileDefault}
          />
        </Link>
        <div className="flex flex-col items-start pr-4 w-full">
          <Link
            to={`/profile/${_id}`}
            onClick={() => addSearchResult(name, _id!, image!)}
          >
            <p className="font-medium">{name}</p>
          </Link>
          <p className="text-sm text-gray-500 mb-1">{desc}</p>
          {isButtonShowed && (
            <Button
              width="w-full"
              height="py-2"
              name={followText}
              onClick={follow}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default HorizontalCards;

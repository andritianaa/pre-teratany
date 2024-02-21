import React, { useContext } from "react";
import { IProfile } from "../../types/profile.type";
import { FileServerURL } from "../../api/FileApi";
import Button from "../../components/common/Button";
import profileDefault from "../../assets/userPics.jpg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { syncChat } from "../../store/reducer/chat.reducer";
import { syncChat as syncChatApi } from "../../api/chatApi";
import { openDiscussion } from "../../store/reducer/chat.reducer";
import { useAppSelector } from "../../store/hooks";
import SocketContext from "services/socket/socketContext";
interface UserProfileProps {
  profile: IProfile;
  idUserViewed: string;
  profileConnectedUser: IProfile;
  onClick: () => void;
  followText: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  profile,
  profileConnectedUser,
  idUserViewed,
  onClick,
  followText,
}) => {
  const { socket } = useContext(SocketContext);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const connectedUser = useAppSelector((state) => state.teratany_user.id);

  const handdleMessage = () => {
    if (socket) {
      socket.emit(
        "new-conversation",
        [connectedUser, idUserViewed],
        async (response: number) => {
          dispatch(syncChat(await syncChatApi(connectedUser!, [], undefined)));
          navigate("/chat/one");
          dispatch(openDiscussion(response));
        }
      );
    }
  };

  const { t } = useTranslation();
  return (
    <div className="mt-16 pb-3 flex w-full max-w-[600px] justify-around items-center border-b border-gray-200">
      <img
        className="w-20 h-20 object-cover rounded-full
                 border-2 border-pink-600 mr-2"
        src={profile?.image ? FileServerURL + profile.image : profileDefault}
        alt="profile"
      />
      <div className="flex flex-col">
        <div className="flex flex-col items-start">
          <h2 className="text-xl font-normal mb-1">
            {profile?.name ?? t("users.singular")}
          </h2>

          <ul className="flex space-x-8 mb-2">
            <li>
              <span className="font-semibold">
                {profile?.publications?.length!}{" "}
              </span>
              {profile?.publications?.length! > 1
                ? t("posts.plural")
                : t("posts.singular")}
            </li>

            <li>
              <span className="font-semibold">
                {profile?.followers?.length!}{" "}
              </span>
              {profile?.followers?.length! > 1
                ? t("followers.plural")
                : t("followers.singular")}
            </li>
          </ul>
        </div>
        {profileConnectedUser?._id !== idUserViewed && (
          <div className="flex items-center w-full">
            <Button
              width="w-full"
              height="h-7"
              name={followText}
              onClick={onClick}
            />
            <Button
              width="w-1/3"
              height="h-7"
              name={t("profile.message")}
              onClick={handdleMessage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

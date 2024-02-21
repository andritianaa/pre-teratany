import React, { useContext } from "react";
import { FileServerURL } from "../../api/FileApi";
import Button from "../../components/common/Button";
import { IProfile } from "../../types/profile.type";
import pictureDefault from "../../assets/userPics.jpg";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { syncChat as syncChatApi } from "../../api/chatApi";
import { openDiscussion, syncChat } from "../../store/reducer/chat.reducer";
import { useAppSelector } from "../../store/hooks";
import SocketContext from "../../services/socket/socketContext";

interface PageProfileProps {
  profile: IProfile;
  followText: string;
  follow: () => void;
  changeDrawerStatus: () => void;
}

export const PageProfile: React.FC<PageProfileProps> = ({
  profile,
  followText,
  follow,
  changeDrawerStatus,
}) => {
  // const socket = useAppSelector((state) => state.teratany_socket.socket);

  const { socket } = useContext(SocketContext);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const connectedUser = useAppSelector((state) => state.teratany_user.id);

  const handdleMessage = () => {
    if (socket) {
      socket.emit(
        "new-conversation",
        [connectedUser, profile._id],
        async (response: number) => {
          dispatch(syncChat(await syncChatApi(connectedUser!, [], undefined)));
          navigate("/chat/one");
          dispatch(openDiscussion(response));
        }
      );
    }
  };

  const handdleChannel = () => {
    if (socket) {
      socket.emit(
        "join-channel",
        connectedUser,
        profile._id,
        async (response: number) => {
          dispatch(syncChat(await syncChatApi(connectedUser!, [], undefined)));
          navigate("/chat/one");
          dispatch(openDiscussion(response));
        }
      );
    }
  };
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
                  : t("followers.singular")}
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
        <Button
          width="w-full mb-2 "
          height="h-7"
          name={followText}
          onClick={follow}
        />
      </div>
      <div className="flex items-center mx-2">
        <Button
          width="w-1/2"
          height="h-7"
          name={t("profile.message")}
          onClick={handdleMessage}
        />
        <Button
          width="w-1/2"
          height="h-7"
          name={t("chat.joinChannel")}
          onClick={handdleChannel}
        />
        <Button width="" height="h-7" name="•••" onClick={changeDrawerStatus} />
      </div>
    </div>
  );
};

export default PageProfile;

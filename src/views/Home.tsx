import TopNavBar from "../components/layouts/TopNavBar";
import Publication from "../components/publication/Publication";
import PageTopList from "../views/Page/PageTopList";
import { useDispatch } from "react-redux";

//socket
import { syncChat } from "../store/reducer/chat.reducer";
import { syncChat as syncChatApi } from "../api/chatApi";
import { IProfile } from "../types/profile.type";

import React, { useEffect } from "react";
import { notifiate } from "../helpers/Notification";
import { useAppSelector } from "../store/hooks";

const Home: React.FC = () => {
  const { socket } = useAppSelector((state) => state.teratany_socket);

  const { profile } = useAppSelector((state) => state.teratany_user);

  const dispatch = useDispatch();
  const syncChatCaller = async (
    profileId: string,
    conversationReferences: number[],
    fromDate: Date | undefined
  ) => {
    dispatch(
      syncChat(await syncChatApi(profileId, conversationReferences, fromDate))
    );
  };

  const connection = (profileConnectedUser: IProfile) => {
    syncChatCaller(
      profileConnectedUser._id || "",
      profileConnectedUser.conversations || [],
      undefined
    );
    socket.on("connect", () => {});
    socket.emit("connect-profile", profileConnectedUser._id);
    socket.on("new-message", (message: any) => {
      if (profileConnectedUser._id !== message.sender._id) {
        console.log("Message ===> ", message);
        notifiate(message.sender.name, "New message on Teratany", message.text);
      }

      syncChatCaller(
        profileConnectedUser._id || "",
        profileConnectedUser.conversations || [],
        undefined
      );
    });
  };

  const publications = useAppSelector(
    (state) => state.teratany_publications.publications
  );

  useEffect(() => {
    if (profile) {
      connection(profile);
      socket.on("disconnect", () => {
        connection(profile);
      });
    }
  });

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center h-full w-full mt-12">
      <TopNavBar notifCount={9} messageCount={8} />
      <PageTopList />
      <div className="flex flex-col-reverse w-full">
        {publications?.map((pub) => (
          <Publication
            key={pub?._id}
            _id={pub?._id}
            profileId={pub?.profile?._id}
            profileName={pub?.profile?.name}
            profileImage={pub?.profile?.image}
            date={pub?.date}
            comments={pub?.numberOfComments}
            reactions={pub?.numberOfReactions}
            content={pub?.content}
            images={pub?.images!}
            isReacted={pub.isReacted}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

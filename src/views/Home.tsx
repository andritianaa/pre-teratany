import TopNavBar from "../components/common/TopNavBar";
import Publication from "../components/Publication/Publication";
import PageTopList from "../views/Page/PageTopList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IPublication } from "../types/publication.type";


//socket
import { syncChat } from "../store/reducer/chat.reducer";
import { syncChat as syncChatApi } from "../api/chatApi";
import { IProfile } from "../types/profile.type";
import { Socket } from "socket.io-client";

import useFetchProfile from "../hooks/useFetchProfile";
import React, { useEffect } from "react";

interface Props {
  socket: Socket;
}


const Home: React.FC<Props> = ({socket}) => {

  const profileConnectedUser = useFetchProfile();
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

  
const connection = (profileConnectedUser: IProfile) =>{
  syncChatCaller(
    profileConnectedUser._id || "",
    profileConnectedUser.conversations || [],
    undefined
  );
  socket.on("connect", () => {});
  socket.emit("connect-profile", profileConnectedUser._id);
  socket.on("new-message", () => {
    syncChatCaller(
      profileConnectedUser._id || "",
      profileConnectedUser.conversations || [],
      undefined
    );
  });
}

  const publications = useSelector<RootState>(
    (state) => state.teratany_publications.publications
  ) as IPublication[];

  useEffect(() => {
    
    if (profileConnectedUser) {
      connection(profileConnectedUser)
      socket.on("disconnect", () => {
        connection(profileConnectedUser)
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

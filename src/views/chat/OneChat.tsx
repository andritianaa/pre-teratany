import { HiArrowNarrowLeft } from "react-icons/hi";
import { Message } from "../../components/chat/Message";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { IConversation } from "../../store/reducer/chat.reducer";
import { IProfile } from "../../types/profile.type";
import profileDefault from "../../assets/userPics.jpg";
import { Socket } from "socket.io-client";
import { useState } from "react";
import { FileServerURL } from "../../api/FileApi";

interface Props {
  socket: Socket;
}
export const OneChat: React.FC<Props> = ({ socket }) => {
  const [textMessage, setTextMessage] = useState<string>("");

  const conversationReference = useSelector<RootState>(
    (state) => state.teratany_chat.activeDiscussionReference
  ) as string;

  const connectedUser = useSelector<RootState>(
    (state) => state.teratany_user.id
  );

  const conversations = useSelector<RootState>(
    (state) => state.teratany_chat.discussions
  ) as IConversation[];

  const actualDiscussion = conversations.find(
    (element: any) => element.reference === conversationReference
  );
  console.log("conversationReference ==> ", conversationReference);

  const handdleMessage = () => {
    if (textMessage) {
      const myDate = Date.now();
      socket.emit("new-message", {
        sender: connectedUser,
        text: textMessage,
        conversation: conversationReference,
        date: myDate,
      });
      setTextMessage("");
    }
  };

  return (
    <>
      <TopBar participant={actualDiscussion?.participants[0]} name={""} />
      <div id="nessages" className="flex flex-col my-16 justify-end">
        {actualDiscussion?.messages.map((message, index) => (
          <Message
            key={index}
            date={message.date?.toString() || ""}
            sender={message.sender}
            message={message.text}
          />
        ))}
      </div>
      <div className="fixed bg-white p-2 w-full bottom-0 ">
        <form
          className="w-full"
          onSubmit={(event) => {
            event.preventDefault(); // Annule le rechargement de la page
            handdleMessage(); // Appelle la fonction de gestion du message
          }}
        >
          <div className="flex">
            <div className="relative w-full flex">
              <input
                type="text"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 rounded-lg border border-1"
                placeholder="Message"
                required
                onChange={(v) => setTextMessage(v.target.value)}
                value={textMessage}
              />
              <button className="hidden" type="submit">
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

const TopBar: React.FC<IProfile> = ({ participant }) => {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div className="fixed top-0 z-40 w-full h-14 bg-white border-b border-gray-200">
      <div className="flex items-center h-full mx-auto">
        <HiArrowNarrowLeft onClick={handleGoBack} size={26} className="mx-3" />
        {participant.image && participant.image.length ? (
          <img
            className="w-16 h-16 object-cover p-0.5 rounded-full ring-2 ring-gray-300 mr-2"
            src={
              participant.image
                ? FileServerURL + participant.image
                : profileDefault
            }
            alt="Bordered avatar"
          />
        ) : (
          <img
            className="w-8  p-0.5 rounded-full ring-2 ring-gray-300 mr-2"
            src={profileDefault}
            alt="Bordered avatar"
          />
        )}

        <p className="text-xl flex justify-center font-medium items-center">
          {participant.name}
        </p>
      </div>
    </div>
  );
};

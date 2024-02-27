import { HiArrowNarrowLeft } from "react-icons/hi";
import { IProfile } from "../../types/profile.type";
import profileDefault from "../../assets/userPics.jpg";
import { useContext, useEffect, useRef, useState } from "react";
import { FileServerURL } from "../../api/FileApi";
import { Message } from "../../components/chat/Message";
import { useAppSelector } from "../../store/hooks";
import { Link } from "react-router-dom";
import SocketContext from "../../services/socket/socketContext";
import { useDispatch } from "react-redux";
import { syncChat } from "../../store/reducer/chat.reducer";
import { syncChat as syncChatApi } from "../../api/chatApi";
import { useNavigate } from "react-router-dom";

export const OneChat: React.FC = () => {
  const { socket } = useContext(SocketContext);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [textMessage, setTextMessage] = useState<string>("");

  const conversationReference: number = useAppSelector(
    (state) => state.teratany_chat.activeDiscussionReference
  );

  const connectedUser = useAppSelector((state) => state.teratany_user.id);

  const conversations = useAppSelector(
    (state) => state.teratany_chat.discussions
  );

  const actualDiscussion = conversations.find(
    (element: any) => element.reference === conversationReference
  );

  const handdleMessage = () => {
    if (socket) {
      if (textMessage) {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView();
        }
        const myDate = Date.now();
        socket.emit("new-message", {
          sender: connectedUser,
          text: textMessage,
          conversation: conversationReference,
          date: myDate,
        });
        setTextMessage("");
        const inputElement = document.querySelector(
          'input[type="text"]'
        ) as HTMLInputElement;
        if (inputElement) {
          inputElement.blur();
        }
      }
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, []);
  return (
    <>
      <TopBar
        participant={
          actualDiscussion.mode === "duo"
            ? actualDiscussion?.participants[0]
            : actualDiscussion?.channelPageOwner
        }
        isQuitable={
          actualDiscussion.mode !== "duo" &&
          !actualDiscussion?.admins?.includes(connectedUser)
        }
        name={""}
      />
      <div id="nessages" className="flex flex-col my-16 justify-end">
        {actualDiscussion?.messages.map((message: any, index: number) => (
          <Message
            key={index}
            date={message.date?.toString() || ""}
            sender={message.sender}
            message={message.text}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="fixed bg-white p-2 w-full bottom-0 ">
        <form
          className="w-full"
          onSubmit={(event) => {
            event.preventDefault(); // Annule le rechargement de la page
            handdleMessage(); // Appelle la fonction de gestion du message
          }}
        >
          {(actualDiscussion.mode === "duo" ||
            actualDiscussion?.admins?.includes(connectedUser)) && (
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
          )}
        </form>
      </div>
    </>
  );
};

const TopBar: React.FC<IProfile> = ({ participant, isQuitable }) => {
  const handleGoBack = () => {
    window.history.back();
  };
  const { socket } = useContext(SocketContext);
  const connectedUser = useAppSelector((state) => state.teratany_user.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const conversationReference: number = useAppSelector(
    (state) => state.teratany_chat.activeDiscussionReference
  );

  const handdleQuit = () => {
    if (socket) {
      socket.emit(
        "quit-channel",
        connectedUser,
        conversationReference,
        async () => {
          dispatch(syncChat(await syncChatApi(connectedUser!, [], undefined)));
          navigate("/");
        }
      );
    }
  };
  return (
    <div className="fixed top-0 z-40 w-full h-14 bg-white border-b border-gray-200 flex justify-between">
      <div className="flex items-center justify-start h-full">
        <HiArrowNarrowLeft onClick={handleGoBack} size={26} className="mx-3" />
        <Link className="flex" to={`/profile/${participant._id}`}>
          {participant.image && participant.image.length ? (
            <img
              className="w-8 h-8 object-cover p-0.5 rounded-full ring-2 ring-gray-300 mr-2"
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
        </Link>
      </div>
      <div className="mx-3 flex items-center">
        {isQuitable && (
          <button
            type="submit"
            onClick={handdleQuit}
            className={` inline-flex justify-center  text-white bg-red-600 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 items-center`}
          >
            Quit
          </button>
        )}
      </div>
    </div>
  );
};

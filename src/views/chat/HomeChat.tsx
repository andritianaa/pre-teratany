import { useSelector } from "react-redux";
import TopBar from "../../components/common/TopBar";
import ChatList from "../Page/components/ChatList";
import { RootState } from "../../store/store";
import { IConversation } from "../../store/reducer/chat.reducer";

export const HomeChat: React.FC = () => {
  const chats = useSelector<RootState>(
    (state) => state.teratany_chat.discussions
  ) as IConversation[];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="fixed z-40 pt-4 bg-white flex justify-center items-center w-full max-w-[600px]">
        <TopBar text="Discussions" />
      </div>

      <div className="w-full h-screen flex flex-col items-center mt-16 max-w-[600px]">
        {/* <div className="pl-2 pr-2 mb-2 w-full">
                    <SearchBar />
                </div> */}
        {chats.map((chat, index) => (
          <ChatList
            key={index}
            image={chat.participants[0].image}
            reference={chat.reference}
            name={chat.participants[0].name}
            message={
              chat.messages[chat.messages.length - 1].text !== "###**###"
                ? chat.messages[chat.messages.length - 1].text
                : "New discussion"
            }
            newMessage={chat.newMessageCount}
          />
        ))}
      </div>
    </div>
  );
};

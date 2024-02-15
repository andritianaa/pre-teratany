// import SearchBar from "../../components/common/SearchBar";
import TopBar from "../../components/layouts/TopBar";
import ChatList from "./components/ChatList";
import { useAppSelector } from "../../store/hooks";

export const HomeChat: React.FC = () => {
  const { discussions: chats } = useAppSelector((state) => state.teratany_chat);

  return (
    <>
      <TopBar text="Discussions" />
      <div className="w-full overflow-y-auto flex flex-col items-center mt-16">
        {/* <div className="pl-2 pr-2 mb-2 w-full">
                    <SearchBar />
                </div> */}
        {chats.map((chat: any, index: number) => (
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
    </>
  );
};

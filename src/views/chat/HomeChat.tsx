import { useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar";
import TopBar from "../../components/common/TopBar"
import ChatList from "../Page/components/ChatList";
import { RootState } from "../../store/store";
import { IConversation } from "../../store/reducer/chat.reducer";

export const HomeChat: React.FC = () => {

    const chats = useSelector<RootState>(
        (state) => state.teratany_chat.discussions
      ) as IConversation[];
    
    return (
        <>
            <TopBar text="Discussions" />
            <div className="w-full overflow-y-auto flex flex-col items-center mt-16">
                {/* <div className="pl-2 pr-2 mb-2 w-full">
                    <SearchBar />
                </div> */}
                {chats.map((chat, index) => (
                    <ChatList
                        key={index}
                        image={chat.participants[0].image}
                        reference={chat.reference}
                        name={chat.participants[0].name}
                        message={chat.messages[chat.messages.length - 1].text !== "###**###" ? chat.messages[chat.messages.length - 1].text : "New discussion"}
                        newMessage={chat.newMessageCount}
                    />
                ))}
            </div>
        </>
    )
}

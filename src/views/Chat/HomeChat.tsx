// import SearchBar from "../../components/common/SearchBar";
import TopBar from "../../components/layouts/TopBar";
import ChatList from "../../components/chat/ChatList";
import { useAppSelector } from "../../store/hooks";
import Button from "../../components/common/Button";
// import { useTranslation } from "react-i18next";
import { switchConversationType } from "../../store/reducer/chat.reducer";
import { useDispatch } from "react-redux";

export const HomeChat: React.FC = () => {
  const { discussions: chats } = useAppSelector((state) => state.teratany_chat);
  const { conversationType: convType } = useAppSelector(
    (state) => state.teratany_chat
  );
  // const { t } = useTranslation();
  const dispatch = useDispatch();
  const switchMode = (mode: string) => {
    dispatch(switchConversationType(mode));
  };
  return (
    <>
      <div className="pt-4 bg-white flex items-center w-full max-w-[500px]">
        <TopBar text='Discussions' />
      </div>
      <div className="w-full overflow-y-auto flex flex-col items-center mt-4">
        <div className="flex items-center ml-2 w-full justify-center">
          <Button
            width="w-full"
            height="h-7"
            name="Discussions"
            onClick={() => switchMode("duo")}
            className={convType === 'duo' ? 'opacity-100' : 'bg-opacity-30'}
          />
          <Button
            width="w-full"
            height="h-7"
            name="Channels"
            onClick={() => switchMode("canal")}
            className={convType === 'canal' ? 'opacity-100' : 'bg-opacity-30'}
          />
        </div>
        {/* <div className="pl-2 pr-2 mb-2 w-full">
                    <SearchBar />
                </div> */}
        {chats
          .filter((chat: any) => {
            return chat.mode === convType;
          })
          .map((chat: any, index: number) => (
            <ChatList
              key={index}
              image={
                chat.mode === "duo"
                  ? chat.participants[0].image
                  : chat.channelPageOwner.image
              }
              reference={chat.reference}
              name={
                chat.mode === "duo"
                  ? chat.participants[0].name
                  : chat.channelPageOwner.name + " channel"
              }
              message={
                chat.messages[chat.messages.length - 1].text !== "###**###"
                  ? chat.messages[chat.messages.length - 1].text
                  : chat.mode === "duo"
                  ? "New discussion"
                  : "New Channel"
              }
              newMessage={chat.newMessageCount}
            />
          ))}
      </div>
    </>
  );
};

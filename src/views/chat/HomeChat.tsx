import SearchBar from "../../components/SearchBar";
import TopBar from "../../components/common/TopBar"
import ChatList from "../Page/components/ChatList";

export const HomeChat: React.FC = () => {
    let chats = [
        {
            name: "Teratany",
            message: "Bonjour",
            newMessage: 2,
        },
        {
            name: "Ampela Mitsingy",
            message: "Milay le success",
            newMessage: 0
        },
        {
            name: "Zanaka Malagasy",
            message: "Tsy mandeha tsara le internet",
            newMessage: 0
        },
        {
            name: "Faritsy Menabe",
            message: "Just trying to dev",
            newMessage: 1,
        },
        {
            name: "Bongolava Miray",
            message: "Mba analyseo le data fa mbola sahirana za",
            newMessage: 0,
        },
        {
            name: "Sakalava ",
            message: "Vao miketrika an'ilay design aho",
            newMessage: 0
        },
        {
            name: "Faritsy Analamanga",
            message: "Vous avez un nouveau client",
            newMessage: 5,
        },
        {
            name: "Tampoketsa Fitambarana",
            message: "C'est pour le 6 novembre",
            newMessage: 0
        },
    ];
    return (
        <>
            <TopBar text="Discussions" />
            <div className="w-full overflow-y-auto flex flex-col items-center mt-16">
                <div className="pl-2 pr-2 mb-2 w-full">
                    <SearchBar />
                </div>
                {chats.map((chat, index) => (
                    <ChatList
                        key={index}
                        name={chat.name}
                        message={chat.message}
                        newMessage={chat.newMessage}
                    />
                ))}
            </div>
        </>
    )
}

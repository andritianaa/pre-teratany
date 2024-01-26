import { HiArrowNarrowLeft } from "react-icons/hi";
import { Message } from "../../components/chat/Message"

export const OneChat: React.FC = () => {
  const messages = [
    {
      date: "12:31",
      sender: "me",
      message:
        "Généralement tu peux juger à quel point le guest est kiffant en fonction de combien de temps ils mettent à expliquer le concept😂😂",
    },
    {
      date: "12:32",
      sender: "Jon Doe",
      message:
        "Eric a un don pour comprendre les délires de tout le monde et intégrer les gags c'est une dinguerie🤗",
    },
    {
      date: "12:33",
      sender: "me",
      message:
        "Cette personne extraordinaire de par sa gentillesse, son respect et son humour. Chapeau les gars MERCI ❤",
    },
    {
      date: "12:34",
      sender: "me",
      message: "La nouvelle DA est une masterclass",
    },
    {
      date: "12:35",
      sender: "Jon Doe",
      message:
        "Merci à la caméra d'avoir caché l'arrachage de la carte pendant la préparation du tour car ça devait être tellement flagrant 😂😂😂",
    },
    {
      date: "12:36",
      sender: "me",
      message:
        "C'était tellement drôle, je me demande combien de prises ont été nécessaires pour cette scène 😂",
    },
    {
      date: "12:37",
      sender: "Jon Doe",
      message: "Probablement plus que ce qu'ils admettraient en public 😄",
    },
    {
      date: "12:38",
      sender: "me",
      message: "C'est ce que je me disais aussi !",
    },
    {
      date: "12:39",
      sender: "Jon Doe",
      message: "Mais le résultat en vaut la peine, c'était hilarant !",
    },
  ];

  return (
    <>
      <TopBar name="Jon Doe" image="" />
      <div id="nessages" className="flex flex-col my-16 justify-end">
        {messages.map((message) => (
          <Message
            date={message.date}
            sender={message.sender}
            message={message.message}
          />
        ))}
      </div>
      <div className="fixed bg-white p-2 w-full bottom-0">
        <form className="w-full">
          <div className="flex">
            <div className="relative w-full">
              <input
                type="text"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 rounded-lg border border-1"
                placeholder="Message"
                required
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

interface TopBarProps {
  name: string;
  image: string;
}

const TopBar: React.FC<TopBarProps> = ({ name, image }) => {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div className="fixed top-0 z-40 w-full h-14 bg-white border-b border-gray-200">
      <div className="flex items-center h-full mx-auto">
        <HiArrowNarrowLeft onClick={handleGoBack} size={26} className="mx-3" />

        <img
          className="w-8  p-0.5 rounded-full ring-2 ring-gray-300 mr-2"
          src="https://randomuser.me/api/portraits/men/36.jpg"
          alt="Bordered avatar"
        />
        <p className="text-xl flex justify-center font-medium items-center">
          {name}
        </p>
      </div>
    </div>
  );
};

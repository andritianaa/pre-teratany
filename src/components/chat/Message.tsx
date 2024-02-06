import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { IProfile } from "../../types/profile.type";
import profileDefault from "../../assets/userPics.jpg";

interface Props {
  message: string;
  date: string;
  sender: IProfile;
  
}
export const Message: React.FC<Props> = ({ message, date, sender }) => {
  const connectedUser = useSelector<RootState>(
    (state) => state.teratany_user.id
  );
  const [showDate, setShowDate] = useState(false);
  return (
    <>
      {showDate ? (
        <p
          className={`${
            sender === connectedUser ? "text-right" : "text-left"
          } mx-2 text-xs text-gray-600 mb-1`}
        >
          {sender.name} - {date}
        </p>
      ) : (
        <p className="mb-2"></p>
      )}

      {sender !== connectedUser && (
        <div
          className="chat-message mb-2"
          onClick={() => setShowDate(!showDate)}
        >
          <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-sm max-w-xs mx-2 items-start  order-2">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-700 text-left">
                  {message}
                </span>
              </div>
            </div>
            {/* {sender.image ? (
              <img
                src={sender.image}
                alt="My profile"
                className="w-6 h-6 ml-2 rounded-full order-1"
              ></img>
            ) : (
              <img
                src={profileDefault}
                alt="My profile"
                className="w-6 h-6 ml-2 rounded-full order-1"
              ></img>
            )} */}
          </div>
        </div>
      )}
      {sender === connectedUser && (
        <div className="chat-message" onClick={() => setShowDate(!showDate)}>
          <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-2 text-sm max-w-xs mx-2 items-end">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-black text-white text-left">
                  {message}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

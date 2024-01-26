import React from "react";
import { MdClose } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { IHistory } from "../types/historique.type";
import { FileServerURL } from "../api/FileApi";
import { Link } from "react-router-dom";
import { withAsync } from "../helpers/withAsync";
import { deleteSearchHistory } from "../api/SearchApi";
import useToken from "../hooks/useToken";
import { ErrorData, ThrowErrorHandler } from "../helpers/HandleError";
import profileDefault from "../assets/userPics.jpg";

interface recentProps {
  historique: IHistory[];
  onClick: () => void;
}

const RecentCard: React.FC<recentProps> = ({ historique, onClick }) => {
  const token = useToken();
  const removeHistory = async (historiqueId: string) => {
    const { error } = await withAsync(() =>
      deleteSearchHistory(token, historiqueId)
    );
    if (error) {
      ThrowErrorHandler(error as ErrorData);
    }
    onClick();
  };

  return (
    <>
      {historique?.map((history) => (
        <div>
          <div className="mx-3 mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <RiSearchLine size={22} />
              <Link to={`/search/result/${history?.text}`}>
                <p className="text-base px-3">{history?.text}</p>
              </Link>
            </div>
            <MdClose
              size={24}
              onClick={() => {
                removeHistory(history?._id!);
              }}
            />
          </div>
          {history?.profileId && (
            <div className="mx-3 mb-6 flex items-center justify-between">
              <Link to={`/profile/${history?.profileId}`}>
                <div className="flex items-center">
                  <img
                    className="w-10 h-10 rounded-lg object-cover"
                    src={
                      history?.pictureUrl
                        ? `${FileServerURL}/${history?.pictureUrl}`
                        : profileDefault
                    }
                    alt=""
                  />
                  <p className="text-base px-3">{history?.text}</p>
                </div>
              </Link>
              <MdClose
                size={24}
                onClick={() => {
                  removeHistory(history?._id!);
                }}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
};
export default RecentCard;

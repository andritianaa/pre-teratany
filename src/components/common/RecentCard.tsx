import React from "react";
import { MdClose } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { IHistory } from "types/historique.type";
import { FileServerURL } from "api/FileApi";
import { Link } from "react-router-dom";
import { withAsync } from "helpers/withAsync";
import { deleteSearchHistory } from "api/SearchApi";
import useToken from "hooks/useToken";
import { ErrorData, ThrowErrorHandler } from "helpers/HandleError";
import profileDefault from "../../assets/userPics.jpg";
import { useDispatch } from "react-redux";
import { removeHistoryData } from "store/reducer/history.reducer";

interface recentProps {
  historique: IHistory[];
}

const RecentCard: React.FC<recentProps> = ({ historique }) => {
  const token = useToken();
  const dispatch = useDispatch();

  const removeHistory = async (historiqueId: string, query: string) => {
    if (historiqueId) {
      const { error } = await withAsync(() =>
        deleteSearchHistory(token, historiqueId)
      );
      if (error) {
        ThrowErrorHandler(error as ErrorData);
      }
    }

    dispatch(removeHistoryData({ text: query }));
  };

  return (
    <div className="flex flex-col justify-center items-start w-full max-w-[600px]">
      {historique?.map((history) => (
        <div className="w-full">
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
                removeHistory(history?._id!, history?.text);
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
                  removeHistory(history?._id!, history?.text);
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default RecentCard;

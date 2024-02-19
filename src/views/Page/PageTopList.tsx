import { FileServerURL } from "../../api/FileApi";
import { Link } from "react-router-dom";
import FeedNoPage from "../NoPage/FeedNoPage";
import profileDefault from "../../assets/userPics.jpg";
import { useAppSelector } from "../../store/hooks";

const PageTopList = () => {
  const profileFollowed = useAppSelector(
    (state) => state.teratany_profiles.followed_profiles
  );

  return (
    <>
      <>
        {profileFollowed?.length! > 0 ? (
          <div className="flex my-2 overflow-x-scroll no-scrollbar  w-full max-w-[600px] pt-2 pb-0 pl-4 ">
            {profileFollowed?.map((profile) => (
              <div className="flex flex-col items-center mr-4">
                <Link to={`/profile/${profile?._id}`}>
                  <img
                    className="w-16 h-16 max-w-16 max-h-16 min-w-[3rem] min-h-[3rem] p-0.5 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 object-cover"
                    src={
                      profile?.image
                        ? FileServerURL + profile?.image
                        : profileDefault
                    }
                    alt="profile"
                  />
                </Link>
                <p className="truncated-name text-center">{profile?.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
            <FeedNoPage />
          </div>
        )}
      </>
    </>
  );
};

export default PageTopList;

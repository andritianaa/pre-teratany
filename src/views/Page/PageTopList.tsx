import { AxiosError } from "axios";
import { getFollowedProfile } from "../../api/ProfileApi";
import { withAsync } from "../../helpers/withAsync";
import useFetchProfile from "../../hooks/useFetchProfile";
import useToken from "../../hooks/useToken";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { IProfile } from "../../types/profile.type";
import { FileServerURL } from "../../api/FileApi";
import { Link } from "react-router-dom";
import FeedNoPage from "../NoPage/FeedNoPage";
import profileDefault from "../../assets/userPics.jpg";

const PageTopList = () => {
  const profileConnectedUser = useFetchProfile();
  const token = useToken();
  const [profileFollowed, setProfileFollowed] = useState<IProfile[]>();
  const [isProfileFetched, setIsProfileFetched] = useState<Boolean>(false);

  const fetchFollowedProfile = async () => {
    if (profileConnectedUser) {
      const { error, response } = await withAsync(() =>
        getFollowedProfile(token, profileConnectedUser?._id! ?? "")
      );
      if (error instanceof AxiosError) {
        const error_message: string =
          error?.response?.data.description ||
          error?.response?.data ||
          error.message;
        toast.error(error_message);
      } else {
        setProfileFollowed(response?.data as IProfile[]);
        setIsProfileFetched(true);
      }
    }
  };

  useEffect(() => {
    fetchFollowedProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileConnectedUser?._id]);


  return (
    <>
      {isProfileFetched && (
        <>
          {profileFollowed?.length! > 0 ? (
            <div className="flex my-2 overflow-x-scroll no-scrollbar  w-full sm:w-[30%] pt-2 pb-0 pl-4 ">
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
      )}
    </>
  );
};

export default PageTopList;

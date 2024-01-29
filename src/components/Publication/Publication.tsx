import { AiOutlineHeart } from "@react-icons/all-files/ai/AiOutlineHeart";
import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";
import { FaRegComment } from "@react-icons/all-files/fa/FaRegComment";
import { FiSend } from "@react-icons/all-files/fi/FiSend";
import { useState } from "react";
import { DrawerContainer } from "../DrawerContainer";
import { FileServerURL } from "../../api/FileApi";
import { ConvertDate } from "../../helpers/DateConverter";
import { withAsync } from "../../helpers/withAsync";
import { toggleReactPublication } from "../../api/PublicationApi";
import useToken from "../../hooks/useToken";
import useFetchProfile from "../../hooks/useFetchProfile";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import { MenuPublication } from "../../views/Publication/components/MenuPublication";
import { Link } from "react-router-dom";
import profileDefault from "../../assets/userPics.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../../styles/SwiperPublication.css";
import { Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";

interface PublicationProps {
  _id?: string;
  profileId?: string;
  profileName?: string;
  date?: string;
  profileImage?: string;
  images?: string[];
  content?: string;
  reactions?: number;
  comments?: number;
  isReacted?: boolean;
}

const Publication: React.FC<PublicationProps> = ({
  _id,
  profileId,
  profileName,
  date,
  profileImage,
  images,
  content,
  reactions,
  comments,
  isReacted,
}) => {
  const [isPostLiked, setIsPostLiked] = useState<Boolean>(isReacted!);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isFullContent, setIsFullContent] = useState<boolean>(false);
  const [react, setReact] = useState<number>(reactions!);
  const token = useToken();
  const profile = useFetchProfile();
  const { t } = useTranslation();

  const handleClickLikePost = async (_id: string) => {
    setIsPostLiked(!isPostLiked);
    if (isPostLiked) {
      setReact((react) => react - 1);
    } else {
      setReact((react) => react + 1);
    }

    const { error } = await withAsync(() =>
      toggleReactPublication(token, profile?._id!, _id)
    );
    if (error instanceof AxiosError) {
      const error_message: string =
        error?.response?.data.description ||
        error?.response?.data ||
        error.message;
      toast.error(error_message);
    }
  };

  const changeDrawerStatus = () => {
    window.history.pushState({ page: "" }, "", "?isModal=true");
    setDrawerOpen(true);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  window.addEventListener("popstate", () => {
    closeDrawer();
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace(/(\?|&)isModal=true/, "");
    window.history.replaceState({ page: "" }, "", newUrl);
  });

  const togglePubContentDetails = () => {
    setIsFullContent(!isFullContent);
  };
  const formattedDate = moment(date).fromNow();

  return (
    // <!-- Wrapper-->
    <div className="wrapper my-2 w-full sm:w-[30%] flex flex-col items-center bg-white rounded-lg shadow-md">
      {/* <!-- Card--> */}
      <article className="mb-4 break-inside rounded-xl bg-white white:bg-slate-800 flex flex-col bg-clip-border w-full">
        <div
          className={
            images?.length! > 0
              ? "flex p-4 items-center justify-between"
              : "flex px-4 pt-4 pb-0 items-center justify-between"
          }
        >
          <div className="flex">
            <Link className="flex" to={`/profile/${profileId}`}>
              <img
                alt="profilePubImage"
                className="rounded-full max-w-[3rem] max-h-[3rem] min-h-[3rem] min-w-[3rem] w-12 h-12 mr-4 object-cover"
                src={
                  profileImage ? FileServerURL + profileImage : profileDefault
                }
              />
              <div className="flex flex-col">
                <div>
                  <p className="flex text-base font-bold white:text-white">
                    {profileName}
                  </p>
                </div>
                <div className="flex text-sm text-slate-500 white:text-slate-300 white:text-slate-400">
                  {ConvertDate(date!)}
                </div>
              </div>
            </Link>
          </div>
          {profileId === profile?._id && <MenuPublication id={_id!} />}
        </div>
        <div className="z-0">
          {images && (
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {images.length > 1 ? (
                images.map((image, index) => (
                  <SwiperSlide key={index}>
                    {(() => {
                      const tempImage = new Image();
                      tempImage.src = FileServerURL + image;
                      const minHeight = 600;
                      const isImageTooLarge = tempImage.height > minHeight;

                      return (
                        <>
                          {!isImageTooLarge ? (
                            <div className="swiper-slide">
                              <div
                                className="bg-image"
                                style={{
                                  backgroundImage: `url(${
                                    FileServerURL + image
                                  })`,
                                }}
                              ></div>
                              <img
                                alt=""
                                className="w-full h-full object-contain"
                                src={FileServerURL + image}
                              />
                            </div>
                          ) : (
                            <div className="swiper-slide">
                              <img
                                alt=""
                                className="w-full h-full object-center object-cover scale-[100%]"
                                src={FileServerURL + image}
                              />
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </SwiperSlide>
                ))
              ) : (
                <>
                  {images.length === 1 ? (
                    <img
                      alt=""
                      className="w-full h-full object-center scale-[100%]"
                      src={FileServerURL + images}
                    />
                  ) : (
                    <></>
                  )}
                </>
              )}
            </Swiper>
          )}
        </div>
        <div className="p-4 pb-0">
          <div
            className={
              images?.length! > 0 ? "flex flex-col" : "flex flex-col-reverse"
            }
          >
            <div className="flex flex-col justify-start">
              <div className="inline-flex items-center">
                <span className="mr-4">
                  {isPostLiked ? (
                    <AiFillHeart
                      onClick={() => handleClickLikePost(_id!)}
                      size={30}
                      color="#FF3040"
                      className="active:scale-75 transition-transform cursor-pointer"
                    />
                  ) : (
                    <AiOutlineHeart
                      onClick={() => handleClickLikePost(_id!)}
                      size={30}
                      className="active:scale-75 transition-transform cursor-pointer"
                    />
                  )}
                </span>
                <span className="mr-4">
                  <FaRegComment size={24} onClick={changeDrawerStatus} />
                </span>
                <span className="mr-4">
                  <FiSend size={24} />
                </span>
              </div>
              <p className="text-left py-2 text-gray-800 font-medium">
                {react > 1
                  ? t("publications.likes.plural", { count: react })
                  : t("publications.likes.singular", { count: react })}
              </p>
            </div>
            <div className="text-container">
              <p
                className={
                  images?.length! > 0
                    ? `white:text-slate-200 text-start break-words ${
                        !isFullContent ? "truncated-text" : ""
                      } `
                    : `white:text-slate-200 text-justify mb-2 ${
                        !isFullContent ? "truncated-text" : ""
                      } `
                }
              >
                {content}
              </p>
              {!isFullContent && content?.length! > 150 && (
                <p
                  className="text-left  text-gray-400 font-normal mb-2"
                  onClick={togglePubContentDetails}
                >
                  {t("publications.plus")}
                </p>
              )}
            </div>
          </div>

          {comments! > 0 && (
            <p
              onClick={changeDrawerStatus}
              className="text-left  text-gray-400 font-normal"
            >
              {t("publications.showComments", { comments: comments })}
            </p>
          )}
          <p className="text-left text-xs text-gray-400 font-normal">
            {t("time.ago", { time: formattedDate })}
          </p>
        </div>
        <DrawerContainer _id={_id} isOpen={drawerOpen} onClose={closeDrawer} />
      </article>
    </div>
  );
};

export default Publication;

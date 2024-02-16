import React from "react";
// import EditHeader from "../../components/common/HeaderEdit";
import Publication from "../../components/Publication/Publication";
import HorizontalCards from "../../components/HorizontalCards";
import TopBar from "../../components/common/TopBar";
import useFetchSearchByQuery from "../../hooks/useFetchSearchByQuery";
import { useParams } from "react-router-dom";
import useFetchProfile from "../../hooks/useFetchProfile";
import SearchBar from "../../components/SearchBar";
import { useTranslation } from "react-i18next";

const SearchFilterResult: React.FC = () => {
  const currentPath = window.location.pathname;
  const { query } = useParams();
  const profileConnectedUser = useFetchProfile();

  const results = useFetchSearchByQuery(query!);
  const { t } = useTranslation();

  const pathSegments = currentPath.split("/");
  const textFilter = pathSegments[pathSegments.length - 2];

  const renderQueryFilterNavigation = (): string => {
    switch (textFilter) {
      case "publication":
        return "publication";
      case "user":
        return "user";
      default:
        return "";
    }
  };
  return (
    <div className="flex flex-col items-center w-full">
      <div className="fixed z-40 pt-4 bg-white flex justify-center items-center w-full max-w-[600px]">
        <TopBar
          text={
            textFilter === "publication"
              ? t("publications.plural")
              : t("users.plural")
          }
        />
      </div>

      <div className="fixed z-30 pt-16 p-4 w-full flex items-center justify-center max-w-[600px]  bg-white border-gray-200">
        <SearchBar textFilter={renderQueryFilterNavigation()} />
      </div>

      {textFilter === "publication" ? (
        results?.publications?.length! > 0 && (
          <div
            className={`bg-gray-100 flex flex-col w-full max-w-[600px] justify-center items-start ${
              textFilter === "publication" && "mt-32"
            }`}
          >
            {results?.publications?.map((pub) => (
              <Publication
                key={pub?._id}
                _id={pub?._id}
                profileId={pub?.profile?._id}
                profileName={pub?.profile?.name}
                profileImage={pub?.profile?.image}
                date={pub?.date}
                comments={pub?.numberOfComments}
                reactions={pub?.numberOfReactions}
                content={pub?.content}
                images={pub?.images!}
                isReacted={pub.isReacted}
              />
            ))}
          </div>
        )
      ) : (
        <div
          className={`flex flex-col w-full max-w-[600px] justify-center items-start mt-32`}
        >
          {results?.profiles?.map((user) => (
            <HorizontalCards
              _id={user._id}
              name={user.name}
              image={user.image!}
              isFollowed={user.isFollowed}
              desc={`${user?.numberOfFollowers} Followers`}
              isButtonShowed={
                profileConnectedUser?._id !== user._id ? true : false
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchFilterResult;

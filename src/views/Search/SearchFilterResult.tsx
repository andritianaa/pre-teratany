import React from "react";
// import EditHeader from "../../components/common/HeaderEdit";
import Publication from "../../components/Publication/Publication";
import HorizontalCards from "../../components/common/HorizontalCards";
import TopBar from "../../components/layouts/TopBar";
import useFetchSearchByQuery from "../../hooks/useFetchSearchByQuery";
import { useParams } from "react-router-dom";
import SearchBar from "../../components/common/SearchBar";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/hooks";

const SearchFilterResult: React.FC = () => {
  const currentPath = window.location.pathname;
  const { query } = useParams();

  const { profile } = useAppSelector((state) => state.teratany_user);

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
    <>
      <TopBar
        text={
          textFilter === "publication"
            ? t("publications.plural")
            : t("users.plural")
        }
      />

      <div className="fixed top-12 p-4 z-40 w-full flex items-center justify-center h-16 bg-white border-b border-gray-200">
        <SearchBar textFilter={renderQueryFilterNavigation()} />
      </div>

      {textFilter === "publication" ? (
        results?.publications?.length! > 0 && (
          <div
            className={`bg-gray-100 flex flex-col items-start ${
              textFilter === "publication" && "mt-28"
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
        <div className={`flex flex-col items-start mt-28`}>
          {results?.profiles?.map((user) => {
            const isButtonShowed = profile?._id !== user._id;
            return (
              <HorizontalCards
                _id={user._id}
                name={user.name}
                image={user.image!}
                isFollowed={user.isFollowed}
                desc={`${user?.numberOfFollowers} Followers`}
                isButtonShowed={isButtonShowed}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
export default SearchFilterResult;

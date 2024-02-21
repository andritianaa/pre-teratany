import React from "react";
import SearchBar from "components/common/SearchBar";
import SearchFilterBar from "components/common/SearchFilterBar";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Publication from "components/publication/Publication";
import HorizontalCards from "components/common/HorizontalCards";
import { useParams } from "react-router-dom";
import useFetchSearchByQuery from "hooks/useFetchSearchByQuery";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/hooks";

const SearchResult: React.FC = () => {
  const { query } = useParams();

  const results = useFetchSearchByQuery(query!);

  const { profile } = useAppSelector((state) => state.teratany_user);

  const { t } = useTranslation();

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col items-center w-full h-screen">
      <div className="fixed z-40 bg-white mx-3 mb-4 pt-4 flex flex-col justify-center w-full max-w-[600px]">
        <div className="flex items-center">
          <HiArrowNarrowLeft
            size={30}
            className="mr-4"
            onClick={handleGoBack}
          />
          <SearchBar />
        </div>
        <SearchFilterBar query={query} />
      </div>
      {results?.profiles?.length! > 0 && (
        <div className="mt-24 flex w-full flex-col pb-3 items-start justify-center max-w-[600px] border-b border-b-1 rounded-md">
          <p className="mx-3 mt-2 font-medium ">{t("users.plural")}</p>
          <>
            {results?.profiles?.map((user) => {
              const isButtonShowed = profile?._id !== user._id;
              return (
                <HorizontalCards
                  _id={user._id}
                  name={user.name}
                  image={user.image!}
                  isFollowed={user?.isFollowed}
                  desc={
                    user.numberOfFollowers > 1
                      ? t("followers.number.plural", {
                          followers: user?.numberOfFollowers,
                        })
                      : t("followers.number.singular", {
                          followers: user?.numberOfFollowers,
                        })
                  }
                  isButtonShowed={isButtonShowed}
                />
              );
            })}
          </>
        </div>
      )}
      {results?.publications?.length! > 0 && (
        <div className="bg-gray-100 flex flex-col items-start w-full justify-center max-w-[600px]">
          <p className="mx-3 mt-2 font-medium w-full text-start">
            {t("publications.plural")}
          </p>
          <div className="bg-gray-100 w-full max-w-[600px]">
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
        </div>
      )}
    </div>
  );
};
export default SearchResult;

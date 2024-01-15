import { useCallback, useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import TopBar from "../../components/common/TopBar";
import PageListCard from "./components/PageListCard";
import { useParams } from "react-router-dom";
import useFetchSearchByQuery from "../../hooks/useFetchSearchByQuery";
import { ProfileFilter } from "../../types/profile.type";
import useFetchProfile from "../../hooks/useFetchProfile";
import { useTranslation } from "react-i18next";

const PageList = () => {
  const [activeBage, setActiveBage] = useState<boolean | null>(null);
  const { query } = useParams();
  const profileConnected = useFetchProfile();

  const results = useFetchSearchByQuery(query!, "n");
  const { t } = useTranslation();

  const [filterPage, setfilterPage] = useState<ProfileFilter[]>([]);

  const filterByFollowedPage = useCallback(() => {
    setActiveBage(false);
    const pageFiltered = results?.profiles?.filter(
      (page) => page?.isFollowed === true
    );

    setfilterPage(pageFiltered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBage, results, filterPage]);

  const filterByAll = () => {
    setActiveBage(null);
    setfilterPage(results?.profiles);
  };

  const renderPageList = () => {
    return filterPage?.map((page) => (
      <PageListCard
        _id={page?._id}
        name={page?.name}
        followers={page?.numberOfFollowers}
        isFollowed={page?.isFollowed}
        isOwner={page?._id === profileConnected?._id}
        image={page?.image}
        profileType={page?.profileType}
      />
    ));
  };

  useEffect(() => {
    setfilterPage(results?.profiles);

    console.log(results?.profiles);
  }, [results]);

  return (
    <>
      <TopBar text={t("pages.plural")} />
      <div className="fixed top-0 w-full bg-white p-2  mb-2 mt-14 flex flex-col items-start">
        <SearchBar textFilter="page" />
        <div className="flex mt-4">
          <div className="flex space-x-2">
            <div
              onClick={filterByAll}
              style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
              className={
                activeBage == null
                  ? "text-sm px-3 !bg-gray-800 !text-white rounded-full"
                  : "text-sm px-3 !bg-gray-200 !text-gray-800 rounded-full"
              }
            >
              {t("all")}
            </div>
            <div
              onClick={filterByFollowedPage}
              style={{ paddingTop: "0.1em", paddingBottom: "0.1rem" }}
              className={
                activeBage === false
                  ? "text-sm px-3 !bg-gray-800 !text-white rounded-full"
                  : "text-sm px-3 !bg-gray-200 !text-gray-800 rounded-full"
              }
            >
              {t("followers.followedPage")}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full overflow-y-auto flex flex-col items-center mt-40">
        {renderPageList()}
      </div>
    </>
  );
};

export default PageList;

import { useCallback, useEffect, useState } from "react";
import SearchBar from "../../components/common/SearchBar";
import TopBar from "../../components/layouts/TopBar";
import PageListCard from "./components/PageListCard";
import { useParams } from "react-router-dom";
import useFetchSearchByQuery from "../../hooks/useFetchSearchByQuery";
import { ProfileFilter } from "../../types/profile.type";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/hooks";

const PageList = () => {
  const [activeBage, setActiveBage] = useState<boolean | null>(null);
  const { query } = useParams();

  const { profile } = useAppSelector((state) => state.teratany_user);

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
        isOwner={page?._id === profile?._id}
        image={page?.image}
        profileType={page?.profileType}
      />
    ));
  };

  useEffect(() => {
    setfilterPage(results?.profiles);
  }, [results]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="fixed z-40 pt-4 flex justify-center items-center w-full max-w-[600px]">
        <TopBar text={t("pages.plural")} />
      </div>
      <div className="fixed z-30 w-full bg-white p-2  mb-2 mt-14 flex flex-col items-start max-w-[600px]">
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
              {t("search.all")}
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

      <div className="w-full overflow-y-auto flex flex-col items-center mt-40 max-w-[600px]">
        {renderPageList()}
      </div>
    </div>
  );
};

export default PageList;

import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import RecentCard from "../../components/RecentCard";
import { withAsync } from "../../helpers/withAsync";
import { getSearchHistory } from "../../api/SearchApi";
import useToken from "../../hooks/useToken";
import useFetchProfile from "../../hooks/useFetchProfile";
import { ErrorData, ThrowErrorHandler } from "../../helpers/HandleError";
import { IHistory } from "../../types/historique.type";
import { useTranslation } from "react-i18next";

const Search: React.FC = () => {
  const token = useToken();
  const [searchHistory, setSearchHistory] = useState<IHistory[]>();
  const profileConnected = useFetchProfile();
  const { t } = useTranslation();

  const fetchUserSearchHistory = async () => {
    if (profileConnected) {
      const { error, response } = await withAsync(() =>
        getSearchHistory(token, profileConnected?._id!)
      );
      if (error) {
        ThrowErrorHandler(error as ErrorData);
      } else {
        setSearchHistory(response?.data as IHistory[]);
      }
    }
  };

  useEffect(() => {
    fetchUserSearchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileConnected?._id]);

  return (
    <>
      <div className="mx-3 mt-4 flex flex-col items-start">
        <SearchBar />
        <p className="pt-1 pb-3 text-ms font-medium">{t("search.recent")}</p>
      </div>

      <RecentCard
        historique={searchHistory!}
        onClick={fetchUserSearchHistory}
      />
    </>
  );
};
export default Search;

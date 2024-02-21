import React from "react";
import SearchBar from "../../components/common/SearchBar";
import RecentCard from "../../components/common/RecentCard";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store/hooks";

const Search: React.FC = () => {
  const profileSearchHistory = useAppSelector(
    (state) => state.teratany_profile_history.history
  );
  const { t } = useTranslation();
  return (
    <>
      <div className="mx-3 mt-4 flex flex-col items-start">
        <SearchBar />
        <p className="pt-1 pb-3 text-ms font-medium">{t("search.recent")}</p>
      </div>

      <RecentCard historique={profileSearchHistory!} />
    </>
  );
};
export default Search;

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
    <div className="bg-gray-100 flex flex-col items-center w-full h-screen">
      <div className="mx-3 mt-4 flex flex-col justify-center items-start w-full max-w-[600px]">
        <SearchBar />
        <p className="pt-1 pb-3 px-2 text-ms font-medium">
          {t("search.recent")}
        </p>
      </div>
      <RecentCard historique={profileSearchHistory!} />
    </div>
  );
};
export default Search;

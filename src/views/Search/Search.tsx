import React from "react";
import SearchBar from "../../components/SearchBar";
import RecentCard from "../../components/RecentCard";
import { IHistory } from "../../types/historique.type";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Search: React.FC = () => {
  const profileSearchHistory = useSelector<RootState>(
    (state) => state.teratany_profile_history.history
  ) as IHistory[];

  return (
    <>
      <div className="mx-3 mt-4 flex flex-col items-start">
        <SearchBar />
        <p className="pt-1 pb-3 text-ms font-medium">Recent</p>
      </div>

      <RecentCard historique={profileSearchHistory!} />
    </>
  );
};
export default Search;

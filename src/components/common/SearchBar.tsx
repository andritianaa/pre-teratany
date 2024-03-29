import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { withAsync } from "../../helpers/withAsync";
import { addSearchHistory } from "../../api/SearchApi";
import useToken from "../../hooks/useToken";
import { ErrorData, ThrowErrorHandler } from "../../helpers/HandleError";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addHistoryData } from "../../store/reducer/history.reducer";
import { IHistory } from "../../types/historique.type";
import { useAppSelector } from "../../store/hooks";

interface SearchBarProps {
  textFilter?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ textFilter }) => {
  const queryText = useParams().query;
  const [query, setQuery] = useState<string>(queryText!);
  const navigate = useNavigate();
  const token = useToken();

  const { profile } = useAppSelector((state) => state.teratany_user);

  const dispatch = useDispatch();

  const addSearchResult = async (query: string) => {
    if (query.length > 4 && query.length < 20) {
      const { error, response } = await withAsync(() =>
        addSearchHistory(token, profile?._id!, query)
      );
      if (error) {
        ThrowErrorHandler(error as ErrorData);
      } else {
        const historyData = response?.data as IHistory;
        dispatch(
          addHistoryData({
            text: query,
            _id: historyData?._id,
          })
        );
      }
    }
  };
  const { t } = useTranslation();
  const searchByQuery = async () => {
    if (query) {
      await addSearchResult(query);

      switch (textFilter) {
        case "publication":
          navigate(`/search/result/publication/${query}`);
          break;
        case "user":
          navigate(`/search/result/user/${query}`);
          break;
        case "page":
          navigate(`/pages/${query}`);
          break;
        default:
          navigate(`/search/result/${query}`);
      }
    }
  };

  return (
    <div className="flex w-full mx-1 ">
      <div className="relative w-full searchBar">
        <input
          type="search"
          id="search-dropdown"
          className="block p-2.5 w-full z-20 text-sm text-gray-900 rounded-lg border border-1"
          placeholder={t("search.placeholder")}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button
          disabled={!query ? true : false}
          onClick={searchByQuery}
          className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-black rounded-r-lg border border-black"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

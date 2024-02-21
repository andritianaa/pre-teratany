import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface SearchFilterBarProps {
  query?: string;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({ query }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex my-2">
      <p
        className="w-1/5 border border-1 rounded-lg border-gray-200 mx-1 text-center px-2"
        onClick={() => {
          navigate(`/search/result/${query}`);
        }}
      >
        {t("search.all")}
      </p>
      <p
        className="w-1/2 border border-1 rounded-lg border-gray-200 mx-1 text-center px-2"
        onClick={() => {
          navigate(`/search/result/publication/${query}`);
        }}
      >
        {t("publications.singular")}
      </p>
      <p
        className="w-1/3 border border-1 rounded-lg border-gray-200 mx-1 text-center px-2"
        onClick={() => {
          navigate(`/search/result/user/${query}`);
        }}
      >
        {t("users.singular")}
      </p>
      <p
        className="w-1/3 border border-1 rounded-lg border-gray-200 mx-1 text-center px-2"
        onClick={() => {
          navigate(`/pages/${query}`);
        }}
      >
        {t("pages.singular")}
      </p>
    </div>
  );
};
export default SearchFilterBar;

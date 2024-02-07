import { useTranslation } from "react-i18next";

interface SearchInputFieldProps {
  onChange: (value: string) => void;
  searchQuery: string;
}

const SearchInputField: React.FC<SearchInputFieldProps> = ({
  onChange,
  searchQuery,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full">
      <div className="relative w-full">
        <input
          type="search"
          id="search-dropdown"
          className="block p-2.5 w-full z-20 text-sm text-gray-900 rounded-lg border border-1"
          placeholder={t("search.placeholder")}
          onChange={(e) => onChange(e.target.value as string)}
        />
      </div>
    </div>
  );
};

export default SearchInputField;

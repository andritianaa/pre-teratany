interface SearchInputFieldProps {
  onChange: (value: string) => void;
  searchQuery: string;
}

const SearchInputField: React.FC<SearchInputFieldProps> = ({
  onChange,
  searchQuery,
}) => {
  return (
    <div className="flex w-full">
      <div className="relative w-full">
        <input
          type="search"
          id="search-dropdown"
          className="block p-2.5 w-full z-20 text-sm text-gray-900 rounded-lg border border-1"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onChange(e.target.value as string)}
        />
      </div>
    </div>
  );
};

export default SearchInputField;

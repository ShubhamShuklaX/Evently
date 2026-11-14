import { createContext, useContext, useState } from "react";

const SearchContext = createContext({
  query: "",
  setQuery: () => {},
  isHeroSearchPast: false,
  setIsHeroSearchPast: () => {},
});

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [isHeroSearchPast, setIsHeroSearchPast] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        isHeroSearchPast,
        setIsHeroSearchPast,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () => useContext(SearchContext);

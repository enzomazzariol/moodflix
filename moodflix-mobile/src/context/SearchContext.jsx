import { createContext, useContext, useState } from "react";

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
    const [searchText, setSearchText] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    return (
        <SearchContext.Provider 
            value={{
                searchText,
                setSearchText,
                isFocused,
                setIsFocused
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => useContext(SearchContext);

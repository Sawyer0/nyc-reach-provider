import { createContext, useState } from "react";

export const ProviderContext = createContext();

export const ProviderProvider = ({ children }) => {
  const [providers, setProviders] = useState([]);
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);

  return (
    <ProviderContext.Provider
      value={{
        providers,
        setProviders,
        isSearchSubmitted,
        setIsSearchSubmitted,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};

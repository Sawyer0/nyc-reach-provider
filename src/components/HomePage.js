import React, { Suspense, useContext } from "react";
import Header from "./Header";
import { ProviderContext } from "../context/ProviderContext";

const SearchForm = React.lazy(() => import("./SearchForm"));
const ProviderDetails = React.lazy(() => import("./ProviderDetails"));
const MapView = React.lazy(() => import("./MapView"));

const HomePage = () => {
  const { providers, setProviders, isSearchSubmitted, setIsSearchSubmitted } =
    useContext(ProviderContext);

  return (
    <div>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <SearchForm
          setProviders={setProviders}
          setIsSearchSubmitted={setIsSearchSubmitted}
        />
        <ProviderDetails providers={providers} />
        <MapView
          isSearchSubmitted={isSearchSubmitted}
          providers={providers}
          setIsSearchSubmitted={setIsSearchSubmitted}
        />
      </Suspense>
    </div>
  );
};

export default HomePage;
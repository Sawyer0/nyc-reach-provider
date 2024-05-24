import { useState } from "react";
import Header from "./Header";
import SearchForm from "./SearchForm";
import MapView from "./MapView";
import ProviderDetails from "./ProviderDetails";

const HomePage = (searchAttribute, searchTerm) => {
  const [providers, setProviders] = useState([]);
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);

  return (
    <div>
      <Header />
      <SearchForm
        setProviders={setProviders}
        setIsSearchSubmitted={setIsSearchSubmitted}
      />
      <ProviderDetails providers={providers} />
      <MapView
        searchAttribute={searchAttribute}
        searchTerm={searchTerm}
        isSearchSubmitted={isSearchSubmitted}
        providers={providers}
        setIsSearchSubmitted={setIsSearchSubmitted}
      />
    </div>
  );
};

export default HomePage;

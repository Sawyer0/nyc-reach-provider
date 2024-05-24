import { useContext } from "react";
import Header from "./Header";
import MapView from "./MapView";
import SearchForm from "./SearchForm";
import ProviderDetails from "./ProviderDetails";
import { ProviderContext } from "../context/ProviderContext";

const HomePage = () => {
  const { providers, setProviders, isSearchSubmitted, setIsSearchSubmitted } =
    useContext(ProviderContext);

  return (
    <div>
      <Header />
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
    </div>
  );
};

export default HomePage;

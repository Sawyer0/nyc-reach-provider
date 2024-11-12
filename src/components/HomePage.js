import React, { Suspense, useContext } from "react";
import { ProviderContext } from "../context/ProviderContext";
import Header from "./Header";
import "./HomePage.css";

const SearchForm = React.lazy(() => import("./SearchForm"));
const MapView = React.lazy(() => import("./MapView"));

const HomePage = () => {
  const { providers, setProviders, isSearchSubmitted, setIsSearchSubmitted } =
    useContext(ProviderContext);

  return (
    <div className="home-page">
      <Header />
      <div className="home-content">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchForm
            setProviders={setProviders}
            setIsSearchSubmitted={setIsSearchSubmitted}
          />
          <div className="results-container">
            <div className="provider-cards">
              {isSearchSubmitted &&
                providers.length > 0 &&
                providers.map((provider, index) => (
                  <div key={index} className="provider-card">
                    <h3>{provider.practice_name}</h3>
                    <p>{provider.practice_address}</p>
                    <p>{provider.practice_borough}</p>
                    <p>{provider.primary_specialty}</p>
                    <p>{provider.organization_type}</p>
                  </div>
                ))}
            </div>
            <div className="map-section">
              <MapView providers={providers} />
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;

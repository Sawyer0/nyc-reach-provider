import { useState, useEffect } from "react";
import { fetchProviders } from "../services/providerService";

const HomePage = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const getProviders = async () => {
      try {
        const data = await fetchProviders();
        setProviders(data);
      } catch (error) {
        console.error("Error fetching providers: ", error);
      }
    };
    getProviders();
  }, []);

  return (
    <div>
      {providers.map (provider => (
        <div key={`${provider.provider_first_name}-${provider.provider_last_name}-${provider.practice_zip_code}`}>
          {provider.site_name}
          {provider.organization_type}
          {provider.provider_first_name}
          {provider.provider_last_name}
          {provider.primary_speciality}
          {provider.practice_name}
          {provider.practice_mailing_address}
          {provider.practice_zip_code}
        </div>
      ))}
    </div>
  );
};

export default HomePage;

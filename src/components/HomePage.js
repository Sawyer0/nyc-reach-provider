import { useState } from "react";
import SearchBar from "./SearchBar";
import { fetchProviders } from "../services/providerService";

const HomePage = () => {
  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchAttribute, setSearchAttribute] = useState("provider_first_name");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchProviders(searchAttribute, searchTerm);
      setProviders(data);
      setSearchTerm("");
    } catch (error) {
      console.error("Error fetching providers: ", error);
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleAttributeChange = (attribute) => {
    setSearchAttribute(attribute);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select value={searchAttribute} onChange={(e) => handleAttributeChange(e.target.value)}>
          <option value="provider_first_name">First Name</option>
          <option value="provider_last_name">Last Name</option>
          <option value="primary_specialty">Specialty</option>
        </select>
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange}/>
        <button>Search</button>
      </form>
      <div>
        {providers.map((provider) => (
          <div
            key={`${provider.provider_first_name}-${provider.provider_last_name}-${provider.primary_specialty}`}
          >
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
    </div>
  );
};

export default HomePage;

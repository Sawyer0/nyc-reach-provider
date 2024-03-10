import { useState } from "react";
import { fetchProviders } from "../services/providerService";

const SearchForm = ({ setProviders, setIsSearchSubmitted }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchAttribute, setSearchAttribute] = useState("provider_first_name");

  const handleAttributeChange = (newAttribute) => {
    setSearchAttribute(newAttribute);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const providersData = await fetchProviders(searchAttribute, searchTerm);
      setProviders(providersData);
      setSearchTerm("");
      setIsSearchSubmitted(true);
    } catch (error) {
      console.error("Error fetching providers:", error);
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto p-8 bg-white shadow-xl rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-3">
        <select
          className="block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={searchAttribute}
          onChange={(e) => handleAttributeChange(e.target.value)}
        >J
          <option value="provider_first_name">First Name</option>
          <option value="provider_last_name">Last Name</option>
          <option value="primary_specialty">Specialty</option>
          <option value="practice_borough">Borough</option>
        </select>
        <input
          type="text"
          placeholder="Search by name, specialty, or location..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;

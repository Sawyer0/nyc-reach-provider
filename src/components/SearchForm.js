import useSearchForm from "../hooks/useSearchForm";

const SearchForm = ({ setProviders, setIsSearchSubmitted }) => {
  const {
    searchTerm,
    searchAttribute,
    handleAttributeChange,
    handleSearchChange,
    handleSubmit,
  } = useSearchForm(setProviders, setIsSearchSubmitted);

  return (
    <div className="flex flex-col max-w-md mx-auto p-8 bg-white shadow-xl rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-3">
        <label
          htmlFor="search-attribute"
          className="block text-sm font-medium text-gray-700"
        >
          Search By
        </label>
        <select
          id="search-attribute"
          className="block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={searchAttribute}
          onChange={(e) => handleAttributeChange(e.target.value)}
          aria-label="Search Attribute"
        >
          <option value="provider_first_name">First Name</option>
          <option value="provider_last_name">Last Name</option>
          <option value="primary_specialty">Specialty</option>
          <option value="practice_borough">Borough</option>
        </select>

        <label
          htmlFor="search-term"
          className="block text-sm font-medium text-gray-700"
        >
          Search Term
        </label>
        <input
          id="search-term"
          type="text"
          placeholder="Search by name, specialty, or location..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          aria-label="Search Term"
        />

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          aria-label="Submit Search"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;

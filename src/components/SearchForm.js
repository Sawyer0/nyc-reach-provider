import React from 'react';
import useSearchForm from '../hooks/useSearchForm';
import './SearchForm.css';

const SearchForm = ({ setProviders, setIsSearchSubmitted }) => {
    const {
        searchTerm,
        searchAttribute,
        validAttributes,
        handleAttributeChange,
        handleSearchChange,
        handleSubmit,
    } = useSearchForm(setProviders, setIsSearchSubmitted);

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <select 
                value={searchAttribute}
                onChange={(e) => handleAttributeChange(e.target.value)}
                className="search-select"
            >
                {Object.entries(validAttributes).map(([key, attr]) => (
                    <option key={key} value={key}>
                        {attr.display}
                    </option>
                ))}
            </select>

            <select 
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="search-select"
            >
                <option value="">Select {validAttributes[searchAttribute].display}</option>
                {validAttributes[searchAttribute].values.map(value => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>

            <button type="submit" className="search-button">Search</button>
        </form>
    );
};

export default SearchForm;

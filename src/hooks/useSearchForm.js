import { useState } from "react";
import { fetchProviders } from "../services/providerService";

const useSearchForm = (setProviders, setIsSearchedSubmitted) => {
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
            setIsSearchedSubmitted(true);
        } catch (error) {
            console.error("Error fetching providers", error);
        }
    };

    return {
        searchTerm,
        searchAttribute,
        handleAttributeChange,
        handleSearchChange,
        handleSubmit,
    };
};

export default useSearchForm;
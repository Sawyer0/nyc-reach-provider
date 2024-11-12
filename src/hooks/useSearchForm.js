import { useState } from "react";
import { fetchProviders } from "../services/providerService";

const useSearchForm = (setProviders, setIsSearchedSubmitted) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchAttribute, setSearchAttribute] = useState("practice_borough");

    const validAttributes = {
        practice_borough: {
            display: "Borough",
            values: ["Bronx", "Manhattan", "Brooklyn", "Queens", "Staten Island"]
        },
        primary_specialty: {
            display: "Specialty",
            values: ["Internal Medicine", "Family Medicine", "Pediatrics", "OB/GYN", "Cardiology", "Primary Care"]
        },
        organization_type: {
            display: "Organization Type",
            values: ["Small Practice", "Group Practice", "Hospital", "Community Health Center"]
        }
    };

    const handleAttributeChange = (newAttribute) => {
        setSearchAttribute(newAttribute);
        setSearchTerm("");
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!searchTerm) return;

        try {
            const providersData = await fetchProviders(searchAttribute, searchTerm);
            setProviders(providersData || []);
            setIsSearchedSubmitted(true);
        } catch (error) {
            console.error("Error fetching providers:", error);
            setProviders([]);
        }
    };

    return {
        searchTerm,
        searchAttribute,
        validAttributes,
        handleAttributeChange,
        handleSearchChange,
        handleSubmit,
    };
};

export default useSearchForm;
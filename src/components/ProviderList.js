import React from "react";
import "./ProviderList.css";

const ProviderList = ({ providers }) => {
  return (
    <div className="provider-list">
      {providers.slice(0, 5).map((provider, index) => (
        <div key={index} className="provider-card">
          <h3>{provider.practice_name}</h3>
          <p>
            <strong>Specialty:</strong> {provider.primary_specialty}
          </p>
          <p>
            <strong>Borough:</strong> {provider.practice_borough}
          </p>
          <p>
            <strong>Address:</strong> {provider.practice_address}
          </p>
          <p>
            <strong>Type:</strong> {provider.organization_type}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProviderList;

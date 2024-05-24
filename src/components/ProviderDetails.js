const ProviderDetails = ({ providers }) => {
  return (
    <div>
      {providers.map((provider) => (
        <div
          key={`${provider.provider_first_name}-${provider.provider_last_name}-${provider.primary_specialty}-${provider.practice_borough}`}
        >
          <ul>
            <h3>
              {provider.provider_first_name} {provider.provider_last_name}
            </h3>
            <li>{provider.site_name}</li>
            <li>{provider.organization_type}</li>
            <li>{provider.primary_speciality}</li>
            <li>{provider.practice_name}</li>
            <li>{provider.practice_mailing_address}</li>
            {provider.practice_zip_code} {provider.practice_borough}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProviderDetails;

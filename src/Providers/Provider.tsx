import React, { useState, useEffect } from 'react';
import { ProvidersResponse, Provider } from './types';


const ProvidersList: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/providers?limit=15', {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data: ProvidersResponse = await response.json();
        setProviders(data.providers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {providers.map((provider) => (
        <div key={provider.id}>
          <h2>{provider.name}</h2>
          <p>{provider.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProvidersList;


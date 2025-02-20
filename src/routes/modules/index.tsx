import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import getModules from '../../api/getModules';
import { useQuery } from '@tanstack/react-query';

const ModulesList: React.FC = () => {
  const { status, data, error, isLoading } = useQuery({
    queryKey: ["providers"],
    queryFn: () => getModules(),
    staleTime: 30000,
  });

  if (isLoading) {
    return (
      <div className="past-orders">
        <h2>LOADING …</h2>
      </div>
    );
  }
  if (status === "pending") {
    return (
      <div className="past-orders">
        <h2>LOADING …</h2>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="past-orders">
        <span>Error: {error.message}</span>
      </div>
    );
  }
  return (
    <div>
      {data.modules.map((module) => (
        <div key={module.id}>
          <h2>{module.name}</h2>
          <p>{module.description}</p>
        </div>
      ))}
    </div>
  )
}

export const Route = createFileRoute('/modules/')({
  component: ModulesList,
})

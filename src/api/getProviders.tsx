import { ProvidersResponse } from "../Providers/types";

export default async function getProviders(): Promise<ProvidersResponse> {
  const response = await fetch('/api/v1/providers', {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error('Failed to fetch')
  }
  return await response.json();
}

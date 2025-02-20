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
  const data: ProvidersResponse = await response.json()
  console.log(data);
  return data;
}

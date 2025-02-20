import { ModulesResponse } from "../Modules/types";

export default async function getModules(): Promise<ModulesResponse> {
  const response = await fetch('/api/v1/modules', {
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

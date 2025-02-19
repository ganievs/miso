import React, { useState, useEffect } from 'react'
import { Provider } from '../../../Providers/types'
import { createFileRoute } from '@tanstack/react-router'

const ProviderInfo: React.FC = () => {
  const [provider, setProvider] = useState<Provider>()
  const { namespace, providerName } = Route.useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/v1/providers/${namespace}/${providerName}`,
          {
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        if (!response.ok) {
          throw new Error('Failed to fetch')
        }
        const data: Provider = await response.json()
        setProvider(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <div key={provider?.id}>
        <h2>{provider?.name}</h2>
        <p>{provider?.description}</p>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/providers/$namespace/$providerName')({
  component: ProviderInfo,
})

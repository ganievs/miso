import React, { useState, useEffect } from 'react'
import { ProvidersResponse, Provider } from '../../Providers/types'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Avatar, Box, Flex, Card, Text } from '@radix-ui/themes'

const ProvidersList: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/providers?limit=15', {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch')
        }
        const data: ProvidersResponse = await response.json()
        setProviders(data.providers)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      {providers.map((provider) => (
        <Flex gap="3" direction="column">
          <Box>
            <Card asChild size="1">
              <Link to={`${provider.namespace}/${provider.name}`}>
                <Flex gap="4" align="center">
                  <Avatar
                    size="2"
                    src={provider.logo_url}
                    fallback={provider.name[0]}
                  />
                  <Box>
                    <Text as="div" size="2" weight="bold">
                      {provider.name}
                    </Text>
                    <Text as="div" color="gray" size="2">
                      {provider.description}
                    </Text>
                  </Box>
                </Flex>
              </Link>
            </Card>
          </Box>
        </Flex>
      ))
      }
    </div >
  )
}

export const Route = createFileRoute('/providers/')({
  component: ProvidersList,
})

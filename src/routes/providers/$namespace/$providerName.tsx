import React, { useState, useEffect } from 'react'
import { Provider } from '../../../Providers/types'
import { createFileRoute } from '@tanstack/react-router'
import { Box, Text, Heading, Flex, Avatar, Container } from '@radix-ui/themes'

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
    <>
      <Flex p="4" gap="3" >
        <Container size="1" align="left" >
          <Avatar
            size="2"
            src={provider?.logo_url}
            fallback={provider?.name[0] ?? 'P'}
          />
          <Box key={provider?.id}>
            <Heading>{provider?.name}</Heading>
            <Text>{provider?.description}</Text>
          </Box>
        </Container>
      </Flex>
    </>
  )
}

export const Route = createFileRoute('/providers/$namespace/$providerName')({
  component: ProviderInfo,
})

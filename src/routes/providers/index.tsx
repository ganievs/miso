import React from 'react'
import { Provider } from '../../Providers/types'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Avatar, Box, Flex, Card, Text, Spinner } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import getProviders from '../../api/getProviders'

const ProvidersList: React.FC = () => {
  const { status, data, error } = useQuery({
    queryKey: ["providers"],
    queryFn: getProviders,
    staleTime: 30000,
  });

  if (status === "pending") {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  if (status === "error") {
    return (
      <div>
        <span>Error: {error.message}</span>
      </div>
    );
  }

  return (
    <div>
      {data.providers.map((provider: Provider) => (
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
    </div>
  )
}

export const Route = createFileRoute('/providers/')({
  component: ProvidersList,
})

import React from 'react'
import { Provider } from '../../Providers/types'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Avatar, Box, Flex, Card, Text } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import getProviders from '../../api/getProviders'

const ProvidersList: React.FC = () => {
  const { status, data, error, isLoading } = useQuery({
    queryKey: ["providers"],
    queryFn: () => getProviders(),
    staleTime: 30000,
  });
  console.log(data);
  return (
    <div>
      {status === 'pending' ? (
        'Loading...'
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
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
            <div>{isLoading ? 'Background Updating...' : ' '}</div>
          </div >
        </>
      )}
    </div>
  )
}

export const Route = createFileRoute('/providers/')({
  component: ProvidersList,
})

import React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import getModules from '../../api/getModules';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Box, Card, Flex, Spinner, Text } from '@radix-ui/themes';
import { Module } from '../../Modules/types';

const ModulesList: React.FC = () => {
  const { status, data, error } = useQuery({
    queryKey: ["modules"],
    queryFn: getModules,
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
      {data.modules.map((module: Module) => (
        <Flex gap="3" direction="column">
          <Box>
            <Card asChild size="1">
              <Link to={`${module.namespace}/${module.name}`}>
                <Flex gap="4" align="center">
                  <Avatar
                    size="2"
                    src={module.provider_logo_url}
                    fallback={module.name[0]}
                  />
                  <Box>
                    <Text as="div" size="2" weight="bold">
                      {module.name}
                    </Text>
                    <Text as="div" color="gray" size="2">
                      {module.description}
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

export const Route = createFileRoute('/modules/')({
  component: ModulesList,
})

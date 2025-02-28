import React, { useState, useEffect } from 'react'
import { Module, ModulesResponse } from '../../../../Modules/types'
import { createFileRoute } from '@tanstack/react-router'
import { Box, Text, Heading, Flex, Avatar, Container } from '@radix-ui/themes'

const ModuleInfo: React.FC = () => {
  const [modules, setModules] = useState<ModulesResponse>()
  const { namespace, moduleName } = Route.useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/v1/modules/${namespace}/${moduleName}`,
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
        const data: ModulesResponse = await response.json()
        setModules(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Flex p="4" gap="3">
        {
          modules?.modules.map((module: Module) => (
            <Container size="1" align="left">
              <Avatar
                size="2"
                src={module.provider_logo_url}
                fallback={module.name[0] ?? 'P'}
              />
              <Box key={module.id}>
                <Heading>{module.name}</Heading>
                <Text>{module.description}</Text>
              </Box>
            </Container>
          ))}
      </Flex>
    </>
  )
}

export const Route = createFileRoute('/modules/$namespace/$moduleName/')({
  component: ModuleInfo,
})

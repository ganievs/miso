import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Container, Flex } from '@radix-ui/themes';
import getModules from '../api/getModules';
import { useQueries } from '@tanstack/react-query';
import { Search } from '../components/Search/Search';
import getProviders from '../api/getProviders';

const Home: React.FC = () => {
  const data = useQueries({
    queries: [
      {
        queryKey: ["modules"],
        queryFn: getModules,
      },
      {
        queryKey: ["providers"],
        queryFn: getProviders,
      }
    ]
  });

  const modules = data[0].data?.modules ?? []
  const providers = data[1].data?.providers ?? []
  return (
    <div>
      <Flex justify="center" align="center" height="80vh">
        <Container size="1">
          <Search options={[...modules, ...providers]} />
        </Container>
      </Flex>
    </div >
  );
};

export const Route = createFileRoute('/')({
  component: Home,
});



import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Container, Flex } from '@radix-ui/themes';
import { Search } from '../components/Search';
import getModules from '../api/getModules';
import { useQuery } from '@tanstack/react-query';

const Home: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["modules"],
    queryFn: getModules,
    staleTime: 30000,
  });

  const modules = data?.modules ?? [];

  return (
    <div>
      <Flex justify="center" align="center" height="80vh">
        <Container size="1">
          <Search options={modules} />
        </Container>
      </Flex>
    </div >
  );
}; 

export const Route = createFileRoute('/')({
  component: Home,
});



import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Container, Flex, TextField } from '@radix-ui/themes';

const Home: React.FC = () => {
  return (
    <div>
      <Flex justify="center" align="center" height="80vh">
        <Container size="1">
          <TextField.Root size="3" placeholder="Search the providers,modules…">
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Container>
      </Flex>
    </div >
  )
}

export const Route = createFileRoute('/')({
  component: Home,
})



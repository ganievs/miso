import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Box, Flex } from '@radix-ui/themes';
import { ThemeChanger } from '../components/Theme';
import { NavMenu } from '../components/Navigation';

export const Route = createRootRoute({
  component: () => (
    <>
      <Box width="100%" px="4" py="2">
        <Flex justify="between" align="center" >
          <NavMenu />
          <ThemeChanger />
        </Flex>
      </Box>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  ),
})

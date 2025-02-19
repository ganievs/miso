import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Button, Flex } from '@radix-ui/themes';

export const Route = createRootRoute({
  component: () => (
    <>
      <Flex gap="1">
        <Link to=".">
          <Button>
            Home
          </Button>
        </Link>
        <Link to="/providers">
          <Button>
            Providers
          </Button>
        </Link>
        <Link to="/modules">
          <Button>
            Modules
          </Button>
        </Link>
      </Flex>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  ),
})

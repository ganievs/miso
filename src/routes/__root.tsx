import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Button } from '@radix-ui/themes';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          <Button>
            Home
          </Button>
        </Link>{' '}
        <Link to="/providers" className="[&.active]:font-bold">
          <Button>
            Providers
          </Button>
        </Link>{' '}
        <Link to="/modules" className="[&.active]:font-bold">
          <Button>
            Modules
          </Button>
        </Link>{' '}
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  ),
})

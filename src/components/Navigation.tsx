import { TabNav } from "@radix-ui/themes";
import { NavLink } from "./NavLink";


export function NavMenu() {

  return (
    <TabNav.Root>
      <NavLink to="." activeProps={{ 'data-state': 'active' }} >Home</NavLink>
      <NavLink to="/providers" activeProps={{ 'data-state': 'active' }}>Providers</NavLink>
      <NavLink to="/modules" activeProps={{ 'data-state': 'active' }}>Modules</NavLink>
    </TabNav.Root>
  );
}

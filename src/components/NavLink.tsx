import * as React from 'react'
import { createLink, LinkComponent } from '@tanstack/react-router'
import { TabNav } from '@radix-ui/themes'

const RadixLink = React.forwardRef<HTMLAnchorElement, TabNav.LinkProps>(
  (props, ref) => {
    return <TabNav.Link ref={ref} {...props} />
  }
)

const CustomLink = createLink(RadixLink)

export const NavLink: LinkComponent<typeof RadixLink> = (props) => {
  return <CustomLink{...props} />
}


'use client';

import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<typeof NextLink> {
  children: React.ReactNode;
}

const Link = ({ href, children, ...props }: Props) => {
  return (
    <RadixLink asChild>
      <NextLink href={href} {...props}>
        {children}
      </NextLink>
    </RadixLink>
  );
};

export default Link;

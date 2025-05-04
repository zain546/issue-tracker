'use client';
import Link from 'next/link';
import React from 'react';
import { FaBug } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
import { Skeleton } from '@/app/components';
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
const Navbar = () => {
  return (
    <nav className="py-3 px-5 border-b border-gray-300 mb-5 ">
      <Container>
        <Flex justify={'between'}>
          <Flex align="center" gap={'3'}>
            <Link href="/">
              <FaBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;

const NavLinks = () => {
  const navLinks = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];
  const currentPath = usePathname();
  return (
    <ul className="flex space-x-6">
      {/* classnames is a library that allows you to conditionally add classes in more flexible/cleaner way */}
      {navLinks.map(link => (
        <li
          key={link.href}
          className={classnames({
            'nav-link': true,
            '!text-zinc-900': link.href === currentPath,
          })}
        >
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};
const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === 'loading') return <Skeleton width={'3rem'} />;
  if (status === 'unauthenticated')
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Log in
      </Link>
    );
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            alt={session!.user!.name!}
            size="2"
            radius="full"
            className="cursor-pointer"
            // optional: This is when you avatar does not load then you can set this line.
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size={'2'}>{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

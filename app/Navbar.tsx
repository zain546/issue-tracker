'use client';
import Link from 'next/link';
import React from 'react';
import { FaBug } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
const Navbar = () => {
  const navLinks = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];
  const currentPath = usePathname();
  return (
    <nav className="flex items-center space-x-6 h-14 px-5 border-b border-gray-300 mb-5 ">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-6">
        {/* classnames is a library that allows you to conditionally add classes in more flexible/cleaner way */}
        {navLinks.map(link => (
          <li
            key={link.href}
            className={classnames({
            'text-zinc-900' : link.href===currentPath,
            'text-zinc-500': link.href!==currentPath,
            'hover:text-zinc-800 transition-colors' : true
            })
            }
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

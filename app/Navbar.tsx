import Link from 'next/link';
import React from 'react';
import { FaBug } from "react-icons/fa";


const Navbar = () => {
  const navLinks = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];
  return (
    <nav className='flex items-center space-x-6 h-14 px-5 border-b mb-5 '>
      <Link href="/"><FaBug/></Link>
      <ul className='flex space-x-6'>
        {navLinks.map((link) => (
          <li key={link.href} className='text-zinc-500 hover:text-zinc-800 transition-colors'>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

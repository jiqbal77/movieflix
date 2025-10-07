'use client';

import { JSX, memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Logo = memo(function Logo() {
  return (
    <Link href="/search" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg shadow-lg">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        MovieFlix
      </h1>
    </Link>
  );
});

interface NavLinkProps {
  href: string;
  isActive: boolean;
  icon: JSX.Element;
  label: string;
}

const NavLink = memo(function NavLink({ href, isActive, icon, label }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`px-5 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
        isActive
          ? href === '/search'
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
          : 'hover:bg-gray-700 text-gray-300 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </Link>
  );
});

const Header = memo(function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Logo />
          <div className="flex gap-2">
            <NavLink
              href="/search"
              isActive={pathname === '/search'}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              }
              label="Search"
            />
            <NavLink
              href="/favorites"
              isActive={pathname === '/favorites'}
              icon={
                <svg
                  className="w-5 h-5"
                  fill={pathname === '/favorites' ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              }
              label="Favorites"
            />
          </div>
        </nav>
      </div>
    </header>
  );
});

export default Header;

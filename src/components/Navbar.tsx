'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <nav
      className={`sticky top-0 z-50 px-6 py-6 transition-all duration-300 shadow-md font-sans ${
        scrolled
          ? 'backdrop-blur-md bg-[#a4bcc2]/90'
          : 'bg-gradient-to-r from-[#a4bcc2] via-[#e8f5e9] to-[#ffffff]'
      }`}
    >
      <div className="relative flex items-center justify-between max-w-7xl mx-auto">
        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleDrawer}
            className="text-black dark:text-white text-3xl focus:outline-none"
          >
            <HiMenu />
          </button>
        </div>

        {/* Centered Name */}
        <div className="flex-1 flex justify-center md:justify-center">
          <Link
            href="/"
            className="relative text-2xl sm:text-3xl font-extrabold tracking-tight text-black transition-transform duration-300 hover:scale-105 group"
          >
            Shivam Joshi
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Desktop Social Icons */}
        <div className="hidden md:flex gap-4 text-[1.6rem] text-black dark:text-blue-400 absolute right-0">
          <a
            href="mailto:joshishivam047@gmail.com"
            className="hover:text-blue-800 transition"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://www.linkedin.com/in/shivamjoshi89/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-800 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/ShivamJoshi89"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-800 transition"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      {/* Drawer Menu (Mobile Only) */}
      {drawerOpen && (
        <div
          className={`fixed inset-0 z-40 bg-[#a4bcc2]/90 backdrop-blur-md p-6 transition-transform duration-300 md:hidden`}
        >
          {/* Close Button */}
          <button
            onClick={toggleDrawer}
            className="text-black dark:text-white text-3xl absolute top-5 right-5"
          >
            <HiX />
          </button>

          <div className="flex flex-col items-center justify-center space-y-6 text-black dark:text-white h-full">
            <Link href="/" onClick={toggleDrawer} className="text-3xl font-bold">Shivam Joshi</Link>
            <a
              href="mailto:joshishivam047@gmail.com"
              className="text-3xl hover:text-blue-800 transition"
              onClick={toggleDrawer}
            >
              <FaEnvelope />
            </a>
            <a
              href="https://www.linkedin.com/in/shivamjoshi89/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-blue-800 transition"
              onClick={toggleDrawer}
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/ShivamJoshi89"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-blue-800 transition"
              onClick={toggleDrawer}
            >
              <FaGithub />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

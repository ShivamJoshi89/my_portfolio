'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, useReducedMotion, useScroll } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleDrawer = () => setDrawerOpen((v) => !v);

  const navLinks: [string, string][] = [
    ['About', '#about'],
    ['Skills', '#skills'],
    ['How I Build', '#pipeline'],
    ['Experience', '#experience'],
    ['Projects', '#projects'],
  ];

  return (
    <nav
      className={[
        'sticky top-0 z-50 font-sans transition-all duration-300',
        'border-b border-[var(--color-border)]',
        scrolled
          ? 'backdrop-blur-md bg-[color:rgba(37,52,79,0.75)] shadow-md'
          : 'bg-gradient-to-r from-[var(--color-background)] via-[var(--color-surface-2)] to-[var(--color-surface-3)]',
      ].join(' ')}
    >
      {/* Scroll progress bar */}
      {!reduceMotion && (
        <motion.div
          className="h-[2px] bg-[var(--color-accent-1)] origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      )}

      <div className="px-6 py-5">
        <div className="relative flex items-center justify-between max-w-7xl mx-auto">
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleDrawer}
              className="text-[var(--color-text-1)] text-3xl focus:outline-none"
              aria-label="Open menu"
            >
              <HiMenu />
            </button>
          </div>

          {/* Desktop section links (left) */}
          <div className="hidden md:flex gap-6 text-sm font-semibold text-[var(--color-text-2)] absolute left-0">
            {navLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="hover:text-[var(--color-accent-1)] transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Centered Name */}
          <div className="flex-1 flex justify-center">
            <Link
              href="/"
              className="relative text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-text-1)] transition-transform duration-300 hover:scale-105 group"
            >
              Shivam Joshi
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[var(--color-accent-1)] transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>

          {/* Desktop Social Icons */}
          <div className="hidden md:flex gap-4 text-[1.55rem] text-[var(--color-text-1)] absolute right-0">
            <a
              href="mailto:joshishivam047@gmail.com"
              className="hover:text-[var(--color-accent-1)] transition-colors"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://www.linkedin.com/in/shivamjoshi89/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-accent-1)] transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/ShivamJoshi89"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-accent-1)] transition-colors"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Drawer Menu (Mobile Only) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 bg-[color:rgba(37,52,79,0.82)] backdrop-blur-md p-6 transition-transform duration-300 md:hidden">
          <button
            onClick={toggleDrawer}
            className="text-[var(--color-text-1)] text-3xl absolute top-5 right-5"
            aria-label="Close menu"
          >
            <HiX />
          </button>

          <div className="flex flex-col items-center justify-center space-y-7 text-[var(--color-text-1)] h-full">
            <a href="#hero" onClick={toggleDrawer} className="text-3xl font-bold">
              Shivam Joshi
            </a>

            {/* Section links in mobile */}
            <div className="flex flex-col items-center gap-5 text-lg font-semibold text-[var(--color-text-2)]">
              {navLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={toggleDrawer}
                  className="hover:text-[var(--color-accent-1)] transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <a
                href="mailto:joshishivam047@gmail.com"
                className="text-3xl hover:text-[var(--color-accent-1)] transition-colors"
                onClick={toggleDrawer}
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
              <a
                href="https://www.linkedin.com/in/shivamjoshi89/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl hover:text-[var(--color-accent-1)] transition-colors"
                onClick={toggleDrawer}
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/ShivamJoshi89"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl hover:text-[var(--color-accent-1)] transition-colors"
                onClick={toggleDrawer}
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

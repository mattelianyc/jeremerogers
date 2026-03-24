"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IconButton } from "@jereme/ui";

const PRIMARY_NAVIGATION_LINKS = [
  { href: "/", label: "Home" },
  { href: "/", label: "Catalog" },
  { href: "/", label: "Contact" }
];

const DRAWER_NAVIGATION_LINKS = [
  { href: "/", label: "See now, buy now" },
  { href: "/", label: "Handbags" },
  { href: "/", label: "Women" },
  { href: "/", label: "Men" },
  { href: "/", label: "New in" },
  { href: "/", label: "Children" },
  { href: "/", label: "Travel" },
  { href: "/", label: "Jewelry and watches" },
  { href: "/", label: "Decor and lifestyle" },
  { href: "/", label: "Fragrances and make-up" },
  { href: "/", label: "Gifts" }
];

export function Navbar() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNavbarVisibleOnPage, setIsNavbarVisibleOnPage] = useState(pathname !== "/");

  useEffect(() => {
    if (!isDrawerOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setIsNavbarVisibleOnPage(true);
      return undefined;
    }

    function updateNavbarVisibility() {
      const shouldShowNavbar = window.scrollY >= window.innerHeight * 0.98;
      setIsNavbarVisibleOnPage(shouldShowNavbar);
      if (!shouldShowNavbar) {
        setIsDrawerOpen(false);
      }
    }

    updateNavbarVisibility();
    window.addEventListener("scroll", updateNavbarVisibility, { passive: true });
    window.addEventListener("resize", updateNavbarVisibility);

    return () => {
      window.removeEventListener("scroll", updateNavbarVisibility);
      window.removeEventListener("resize", updateNavbarVisibility);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isDrawerOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsDrawerOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDrawerOpen]);

  return (
    <>
      <AnimatePresence initial={false}>
        {isNavbarVisibleOnPage ? (
          <motion.header
            key="global-navbar"
            className="sticky top-0 z-40 border-b border-black/5 bg-[var(--color-surface)]/95 backdrop-blur"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="mx-auto grid h-20 w-full max-w-[1680px] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-10">
              <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
                {PRIMARY_NAVIGATION_LINKS.map((link) => (
                  <Link
                    key={`${link.label}-${link.href}`}
                    href={link.href}
                    className="text-[11px] uppercase tracking-[0.24em] text-black/65 transition-colors duration-200 hover:text-black"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <Link
                href="/"
                className="brand-wordmark justify-self-center text-sm tracking-[0.38em] transition-opacity duration-200 hover:opacity-70"
              >
                ALMO SEBASTIAN
              </Link>

              <div className="ml-auto flex items-center gap-1 justify-self-end">
                <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                  <IconButton ariaLabel="Search">
                    <SearchIcon />
                  </IconButton>
                </motion.div>
                <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                  <IconButton ariaLabel="Account">
                    <ProfileIcon />
                  </IconButton>
                </motion.div>
                <Link
                  href="/cart"
                  aria-label="Cart"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-black/80 transition-colors duration-200 hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/40"
                >
                  <BagIcon />
                </Link>
                <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                  <IconButton ariaLabel="Open menu" onClick={() => setIsDrawerOpen(true)}>
                    <MenuIcon />
                  </IconButton>
                </motion.div>
              </div>
            </div>
          </motion.header>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isDrawerOpen ? (
          <>
            <motion.button
              key="drawer-overlay"
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-50 bg-black/25 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsDrawerOpen(false)}
            />

            <motion.aside
              key="drawer-panel"
              className="fixed right-0 top-0 z-50 h-full w-[min(420px,90vw)] border-l border-black/10 bg-[var(--color-drawer)] px-7 pb-8 pt-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.2, 0.7, 0.25, 1] }}
            >
              <div className="mb-8 flex items-center justify-between border-b border-black/10 pb-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-black/70">Menu</p>
                <IconButton ariaLabel="Close menu" onClick={() => setIsDrawerOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </div>

              <nav aria-label="Expanded menu" className="space-y-1">
                {DRAWER_NAVIGATION_LINKS.map((link, index) => (
                  <motion.div
                    key={`${link.label}-${index}`}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.025, duration: 0.22 }}
                  >
                    <Link
                      href={link.href}
                      className="block py-2 text-[17px] leading-tight text-black/90 transition-colors duration-200 hover:text-black"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-10 space-y-2 border-t border-black/10 pt-6">
                <Link
                  href="/"
                  className="block py-1 text-[13px] uppercase tracking-[0.18em] text-black/70 transition-colors duration-200 hover:text-black"
                >
                  Sign in
                </Link>
                <Link
                  href="/cart"
                  className="block py-1 text-[13px] uppercase tracking-[0.18em] text-black/70 transition-colors duration-200 hover:text-black"
                >
                  My cart
                </Link>
                <Link
                  href="/"
                  className="block py-1 text-[13px] uppercase tracking-[0.18em] text-black/70 transition-colors duration-200 hover:text-black"
                >
                  Contact
                </Link>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
    >
      <circle cx="8.5" cy="8.5" r="5.4" />
      <path d="M12.5 12.5l4.2 4.2" strokeLinecap="round" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
    >
      <circle cx="10" cy="6.3" r="3.2" />
      <path d="M3.8 17.1c1.3-2.9 3.5-4.3 6.2-4.3s4.9 1.4 6.2 4.3" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
    >
      <path d="M5.3 7.2h9.4l-.9 9.6H6.2l-.9-9.6z" />
      <path d="M7.1 7.2v-.7a2.9 2.9 0 015.8 0v.7" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
    >
      <path d="M3 5.7h14M3 10h14M3 14.3h14" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
    >
      <path d="M5.2 5.2l9.6 9.6M14.8 5.2l-9.6 9.6" strokeLinecap="round" />
    </svg>
  );
}

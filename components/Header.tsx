"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/#process" },
  { label: "Services", href: "/#services" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
      <div className="w-full max-w-[920px] rounded-[40px] sm:rounded-[160px] border border-black/5 bg-white/80 backdrop-blur-[15px] px-5 sm:px-6 py-3 sm:py-4 shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-2xl sm:text-[30px] font-bold tracking-[-0.06em] leading-none"
          >
            YUYA
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative rounded-2xl px-5 text-base font-medium text-black/90 hover:text-black transition-colors leading-[48px]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/#contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-soft-gray px-5 py-2.5 text-base font-medium text-ink hover:bg-black hover:text-white transition-colors"
            >
              Get in Touch
            </a>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-soft-gray text-ink"
            >
              <span className="sr-only">Menu</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                {open ? (
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ) : (
                  <>
                    <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-4 border-t border-black/5 pt-4 pb-2 flex flex-col gap-1">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-ink hover:bg-soft-gray transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="sm:hidden mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-base font-medium text-white"
            >
              Get in Touch
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

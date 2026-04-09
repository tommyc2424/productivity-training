"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  // Add more links here
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      {/* Red header bar */}
      <header style={{ backgroundColor: "#e72031" }}>
        <div className="container mx-auto px-4 h-16 flex items-center relative">
          {/* Hamburger + dropdown wrapper — relative so dropdown anchors to it */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md hover:bg-white/20 transition-colors text-white"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Dropdown — absolutely positioned, width fits content, floats over page */}
            <div
              className="absolute top-full left-0 mt-1 w-max rounded-md border bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out z-50"
              style={{
                maxHeight: open ? `${NAV_LINKS.length * 48 + 16}px` : "0px",
                opacity: open ? 1 : 0,
              }}
            >
              <nav className="p-2 flex flex-col gap-1">
                {NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2 rounded-md text-sm text-foreground hover:bg-accent transition-colors whitespace-nowrap"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* App title — centered */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-semibold text-lg whitespace-nowrap text-white"
          >
            {process.env.NEXT_PUBLIC_APP_NAME ?? "App"}
          </Link>
        </div>
      </header>

      {/* Logo bar — white background, just below the header */}
      <div className="bg-white border-b px-4 py-3 flex justify-start container mx-auto">
        <Image
          src="/uh-logo.svg"
          alt="University Hospitals"
          width={180}
          height={49}
          priority
        />
      </div>
    </div>
  );
}

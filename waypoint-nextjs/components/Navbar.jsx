"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar({ view, onViewChange, onOpenPlanner }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navMenuRef = useRef(null);
  const mobileMenuBtnRef = useRef(null);

  // Tutup mobile menu saat klik di luar
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        navMenuRef.current &&
        !navMenuRef.current.contains(e.target) &&
        mobileMenuBtnRef.current &&
        !mobileMenuBtnRef.current.contains(e.target)
      ) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Handler klik link nav
  function handleNavClick(targetView) {
    onViewChange(targetView);
    setMobileMenuOpen(false);
  }

  return (
    <nav className="fixed top-6 left-0 right-0 z-[1000] px-6">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Part 1: Logo (Left) */}
        <a
          href="#"
          className="flex items-center gap-2.5 font-bold text-base bg-white px-2.5 py-[3px] rounded-full shadow-subtle"
        >
          <span className="text-2xl">⛰️</span>
          <span className="text-text-primary">Waypoint Travel</span>
        </a>

        {/* Part 2: Nav Links (Center) — desktop */}
        <ul
          ref={navMenuRef}
          className={`${
            mobileMenuOpen
              ? "absolute top-[70px] right-6 flex flex-col bg-white p-3 rounded-2xl shadow-large min-w-[200px] animate-slide-down z-[1001]"
              : "hidden"
          } md:relative md:flex md:flex-row md:bg-white md:p-2 md:rounded-full md:shadow-subtle md:top-auto md:right-auto md:min-w-0 md:gap-1`}
        >
          <li>
            <button
              onClick={() => handleNavClick("explore")}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition w-full md:w-auto text-left md:text-center ${
                view === "explore"
                  ? "text-black bg-bg-tertiary"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
              }`}
            >
              Destinations
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavClick("saved")}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition w-full md:w-auto text-left md:text-center ${
                view === "saved"
                  ? "text-black bg-bg-tertiary"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
              }`}
            >
              My Trips
            </button>
          </li>
        </ul>

        {/* Part 3: AI Planner Button (Right) */}
        <div className="hidden md:flex gap-3">
          <Button
            onClick={onOpenPlanner}
            className="rounded-full h-auto px-6 py-3 font-bold text-sm shadow-subtle transition hover:-translate-y-0.5 hover:shadow-brand-glow"
          >
            AI Planner
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={mobileMenuBtnRef}
          onClick={(e) => {
            e.stopPropagation();
            setMobileMenuOpen((prev) => !prev);
          }}
          className="md:hidden flex flex-col gap-[5px] p-3.5 bg-white rounded-full shadow-subtle"
          aria-label="Toggle mobile menu"
        >
          <span
            className={`block w-5 h-0.5 bg-text-primary rounded transition ${
              mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-text-primary rounded transition ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-text-primary rounded transition ${
              mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>
    </nav>
  );
}

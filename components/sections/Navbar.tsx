"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export const navHrefs: Record<string, string> = {
  "Home": "#home",
  "About": "#about",
  "Mission & Vision": "#mission-vision",
  "Members": "#members",
  "Social Media": "#social-media",
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "About", "Mission & Vision", "Members", "Social Media"];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-4 transition-all duration-500"
      style={{
        background: scrolled || menuOpen ? "rgba(11, 11, 11, 0.85)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid rgba(247, 76, 0, 0.1)" : "none",
      }}
    >
      <div className="w-full flex items-center justify-between">

        {/* Logo + Company Name */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <Image
            width={100} 
            height={100}
            src="/assets/logo.png"
            alt="NammaRust Official Logo - Rust Programming Community"
            className="h-14 w-auto transition-all duration-300 group-hover:scale-110"
          />
          <span className="font-poppins font-bold text-white-primary text-lg tracking-wide">
            Namma<span className="text-orange-primary">Rust</span>
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={navHrefs[link]}
              className="relative font-inter text-white-primary/70 text-sm hover:text-white-primary transition-colors duration-300 group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-orange-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          {/* CTA Button */}
          <a
            href="#contact"
            className="glow-orange px-5 py-2 bg-orange-primary text-white-primary font-poppins font-semibold text-sm rounded-lg transition-all duration-300 hover:scale-105"
          >
            Get In Touch
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={"block w-6 h-px bg-white-primary transition-all duration-300 " + (menuOpen ? "rotate-45 translate-y-2" : "")} />
          <span className={"block w-6 h-px bg-white-primary transition-all duration-300 " + (menuOpen ? "opacity-0" : "")} />
          <span className={"block w-6 h-px bg-white-primary transition-all duration-300 " + (menuOpen ? "-rotate-45 -translate-y-2" : "")} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-500"
        style={{ maxHeight: menuOpen ? "300px" : "0px" }}
      >
        <div className="flex flex-col gap-4 pt-4 pb-2 px-2">
          {navLinks.map((link) => (
            <a
              key={link}
              href={navHrefs[link]}
              className="font-inter text-white-primary/70 text-sm hover:text-orange-primary transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            className="w-fit px-5 py-2 bg-orange-primary text-white-primary font-poppins font-semibold text-sm rounded-lg"
            onClick={() => setMenuOpen(false)}
          >
            Get In Touch
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
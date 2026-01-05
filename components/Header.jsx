"use client";

import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import Logo from "./Logo";

const links = [
  { name: "Beranda", path: "home" },
  { name: "Tentang", path: "about" },
  { name: "Layanan", path: "services" },
  { name: "Kontak", path: "contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? "bg-primary/95 shadow-lg backdrop-blur" : "bg-primary"}
      `}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Logo />

          {/* Navigation */}
          <nav className="hidden xl:flex items-center gap-12">
            <ul className="flex">
              {links.map((link, index) => (
                <li
                  key={index}
                  className="text-white text-sm uppercase font-primary font-medium tracking-[1.2px]
                  after:content-['/'] after:mx-4 last:after:content-none after:text-accent"
                >
                  <ScrollLink
                    to={link.path}
                    smooth
                    spy
                    offset={-80}
                    duration={500}
                    className="cursor-pointer transition-colors duration-200 hover:text-accent"
                    activeClass="text-accent"
                  >
                    {link.name}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

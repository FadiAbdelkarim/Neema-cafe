'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events" },
  { href: "/#location", label: "Location" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [locationInView, setLocationInView] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setLocationInView(false);
      return;
    }
    const section = document.getElementById("location");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setLocationInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [pathname]);

  function handleLocationClick(e: React.MouseEvent) {
    if (pathname === "/") {
      e.preventDefault();
      document.getElementById("location")?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? "var(--color-green-deeper)" : "transparent",
      }}
    >
      <Link href="/" className="flex items-center">
        <img src="/logo/curves.svg" alt="Neema Cafe" className="h-10 w-auto" />
      </Link>

      <ul className="flex gap-8 text-sm">
        {links.map((link) => {
          const isActive =
            link.href === "/#location" ? locationInView : pathname === link.href;
          return (
            <li key={link.href}>
                <Link
                    href={link.href}
                    onClick={link.href === "/#location" ? handleLocationClick : undefined}
                    className={`pb-1 border-b transition-colors ${
                        isActive
                        ? "text-terracotta border-terracotta"
                        : "text-cream border-transparent hover:text-terracotta hover:border-terracotta"
                    }`}
                >
                    {link.label}
                </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

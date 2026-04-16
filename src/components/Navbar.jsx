"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiClock, FiBarChart2 } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", icon: <FiHome className="text-lg" /> },
    { name: "Timeline", href: "/timeline", icon: <FiClock className="text-lg" /> },
    { name: "Stats", href: "/stats", icon: <FiBarChart2 className="text-lg" /> },
  ];

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              KeenKeeper
            </Link>
          </div>

          {/* navlinks */}
          <div className="flex space-x-2 sm:space-x-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-primary text-white" 
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {link.icon}
                  <span className="hidden sm:inline">{link.name}</span>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </nav>
  );
}
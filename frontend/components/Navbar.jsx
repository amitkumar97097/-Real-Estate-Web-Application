"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  // ✅ Check if user is logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuth(!!localStorage.getItem("token"));
    }
  }, [router.pathname]);

  const onLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    router.push("/auth/login");
  };

  const navLinks = [
    { href: "/properties", label: "Explore" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/properties/add", label: "Add" },
    { href: "/admin", label: "Admin" },
    { href: "/chat", label: "Chat" },
  ];

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-blue-600">
          EstatePro
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-2 py-1 rounded-lg transition-colors ${
                router.pathname === link.href
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Auth buttons */}
        {!isAuth ? (
          <Link
            href="/auth/login"
            className="px-4 py-1.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Sign in
          </Link>
        ) : (
          <button
            onClick={onLogout}
            className="px-4 py-1.5 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 transition"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

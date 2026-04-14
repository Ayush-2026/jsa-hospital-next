"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Doctors", href: "/admin/doctors" },
  { label: "Departments", href: "/admin/departments" },
  { label: "Events", href: "/admin/events" },
  { label: "Updates", href: "/admin/updates" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <aside
        className="w-64 flex flex-col justify-between py-8 px-4 text-white"
        style={{ background: "linear-gradient(to bottom, #1e7a62, #2c608e)" }}
      >
        <div>
          <h2 className="text-xl font-bold mb-8 px-2">Admin Panel</h2>
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-xl font-medium transition ${
                  pathname === link.href ? "bg-white/20" : "hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <button className="px-4 py-3 rounded-xl font-medium bg-white/10 hover:bg-white/20 transition text-left">
          Logout
        </button>
      </aside>

      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
  );
}

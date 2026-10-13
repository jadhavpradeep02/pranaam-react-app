import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserRound,
  ClipboardList,
  FileDown,
  Plane,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useState } from "react";
const links = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/customers", "Customers & Trips", Users],
  ["/staff", "GRO / GRL", UserRound],
  ["/allocations", "Allocations", ClipboardList],
  ["/reports", "Reports", FileDown],
];
export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex">
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-60 bg-[#0b2446] text-white transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Plane size={23} />
            <div>
              <div className="font-bold tracking-wider">PRANAAM</div>
              <div className="text-[10px] text-blue-200">
                Airport Hospitality Services
              </div>
            </div>
          </div>
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <nav className="p-3 space-y-1">
          {links.map(([url, label, Icon]) => (
            <NavLink
              key={url}
              to={url}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${isActive ? "bg-[#1857a6] text-white" : "text-blue-100 hover:bg-white/10"}`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-5 left-3 right-3">
          <button
            className="flex items-center gap-3 px-4 py-3 text-sm text-blue-100 hover:text-white"
            onClick={() => navigate("/signin")}
          >
            <LogOut size={17} />
            Exit demo
          </button>
        </div>
      </aside>
      {open && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <div className="flex-1 min-w-0 lg:ml-60">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-8">
          <button
            className="lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>
          <div className="hidden lg:block text-xs muted">
            Pranaam Resource Allocation Console
          </div>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-xs muted hidden sm:inline">
              Mumbai Airport (BOM)
            </span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              AD
            </div>
            <span className="text-xs font-semibold">Admin (demo)</span>
          </div>
        </header>
        <main className="max-w-[1500px] mx-auto px-4 md:px-8 py-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Store, ChevronDown, Server, MapPin, Building2, Gamepad2, Bot, Monitor, Zap, ExternalLink, LogIn, User, LogOut, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  
  const handleNavigation = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    navigate(path);
  };

  const toggleMobileSection = (section: string) => {
    setMobileSection(prev => prev === section ? null : section);
  };

  return (
    <nav className="border-b border-white/[0.06] bg-[#0a0f1a] backdrop-blur-2xl fixed top-0 w-full z-[9999]">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 gap-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <img
              src="/lovable-uploads/394abece-307b-48f2-8c38-4d2123607648.png"
              alt="CreeperCastle.cloud"
              className="h-8 w-8 group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-bold text-lg tracking-tight">
              <span className="text-white">Creeper</span>
              <span className="text-creeper">Castle</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">

            {/* Plans Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-all duration-200 focus:outline-none group">
                Plans
                <ChevronDown size={13} className="text-gray-500 group-hover:text-gray-300 group-data-[state=open]:rotate-180 transition-transform duration-200" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#0d1424]/98 backdrop-blur-2xl border border-white/[0.08] z-[10000] rounded-2xl shadow-2xl min-w-[320px] p-2 mt-1">
                
                {/* Minecraft */}
                <div className="px-2 pt-2 pb-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 px-2 mb-1">Minecraft</p>
                </div>
                <DropdownMenuItem className="rounded-xl p-0 focus:bg-transparent hover:bg-transparent">
                  <Link to="/plans/minecraft" className="flex items-start gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-white/[0.05] transition-colors group">
                    <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-creeper/15 group-hover:bg-creeper/25 transition-colors flex-shrink-0">
                      <Gamepad2 size={15} className="text-creeper" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-white">Classic</span>
                      <span className="block text-xs text-gray-400 mt-0.5">Budget-friendly Minecraft hosting</span>
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl p-0 focus:bg-transparent hover:bg-transparent">
                  <Link to="/plans/performance" className="flex items-start gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-white/[0.05] transition-colors group">
                    <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 group-hover:bg-amber-500/25 transition-colors flex-shrink-0">
                      <Zap size={15} className="text-amber-400" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-white">Performance</span>
                      <span className="block text-xs text-gray-400 mt-0.5">High-performance Minecraft hosting</span>
                    </span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1.5 bg-white/[0.06]" />

                {/* VPS */}
                <div className="px-2 pt-1 pb-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 px-2 mb-1">VPS</p>
                </div>
                <DropdownMenuItem className="rounded-xl p-0 focus:bg-transparent hover:bg-transparent">
                  <Link to="/plans/vps" className="flex items-start gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-white/[0.05] transition-colors group">
                    <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/15 group-hover:bg-cyan-500/25 transition-colors flex-shrink-0">
                      <Server size={15} className="text-cyan-400" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-white">Budget VPS</span>
                      <span className="block text-xs text-gray-400 mt-0.5">Intel Platinum 8168 · Reliable & affordable</span>
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl p-0 focus:bg-transparent hover:bg-transparent">
                  <Link to="/plans/performance-vps" className="flex items-start gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-white/[0.05] transition-colors group">
                    <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 group-hover:bg-amber-500/25 transition-colors flex-shrink-0">
                      <Zap size={15} className="text-amber-400" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-white">Performance VPS</span>
                      <span className="block text-xs text-gray-400 mt-0.5">Ryzen 7 5700G · Maximum power</span>
                    </span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1.5 bg-white/[0.06]" />

                {/* Discord Bot */}
                <DropdownMenuItem className="rounded-xl p-0 focus:bg-transparent hover:bg-transparent">
                  <Link to="/plans/discord-bot" className="flex items-start gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-white/[0.05] transition-colors group">
                    <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/15 group-hover:bg-purple-500/25 transition-colors flex-shrink-0">
                      <Bot size={15} className="text-purple-400" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-white">Discord Bot</span>
                      <span className="block text-xs text-gray-400 mt-0.5">Reliable bot hosting</span>
                    </span>
                  </Link>
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>

            {/* Company Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-all duration-200 focus:outline-none group">
                Company
                <ChevronDown size={13} className="text-gray-500 group-hover:text-gray-300 group-data-[state=open]:rotate-180 transition-transform duration-200" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#0d1424]/98 backdrop-blur-2xl border border-white/[0.08] z-[10000] rounded-2xl shadow-2xl min-w-[220px] p-2 mt-1">
                <DropdownMenuItem className="rounded-xl p-0 focus:bg-transparent hover:bg-transparent">
                  <a href="/about" onClick={(e) => handleNavigation('/about', e)} className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-white/[0.05] transition-colors">
                    <Building2 size={15} className="text-blue-400 flex-shrink-0" />
                    <span className="text-sm text-gray-200">About Us</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl p-0 focus:bg-transparent hover:bg-transparent">
                  <Link to="/partners" className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-white/[0.05] transition-colors">
                    <Server size={15} className="text-creeper flex-shrink-0" />
                    <span className="text-sm text-gray-200">Partners</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl p-0 focus:bg-transparent hover:bg-transparent">
                  <Link to="/creeperpanel" className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-white/[0.05] transition-colors">
                    <Monitor size={15} className="text-orange-400 flex-shrink-0" />
                    <span className="text-sm text-gray-200">CreeperPanel</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl p-0 focus:bg-transparent hover:bg-transparent">
                  <Link to="/datacenter" className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-white/[0.05] transition-colors">
                    <Building2 size={15} className="text-cyan-400 flex-shrink-0" />
                    <span className="text-sm text-gray-200">Infrastructure</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl p-0 focus:bg-transparent hover:bg-transparent">
                  <Link to="/locations" className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-white/[0.05] transition-colors">
                    <MapPin size={15} className="text-pink-400 flex-shrink-0" />
                    <span className="text-sm text-gray-200">Locations</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/links" className="text-sm text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-all duration-200">
              Links
            </Link>

            <Link to="/contact" className="text-sm text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-all duration-200">
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 text-sm text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-all duration-200 focus:outline-none">
                  <div className="w-7 h-7 rounded-full bg-creeper/20 border border-creeper/40 flex items-center justify-center">
                    <User size={13} className="text-creeper" />
                  </div>
                  <span className="max-w-[100px] truncate">{user?.name?.split(' ')[0]}</span>
                  <ChevronDown size={13} className="text-gray-500" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#0d1424]/98 backdrop-blur-2xl border border-white/[0.08] z-[10000] rounded-2xl shadow-2xl min-w-[180px] p-2 mt-1">
                  <DropdownMenuItem className="rounded-xl p-0 focus:bg-transparent hover:bg-transparent">
                    <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-white/[0.05] transition-colors">
                      <LayoutDashboard size={15} className="text-creeper" />
                      <span className="text-sm text-gray-200">Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/[0.06] my-1" />
                  <DropdownMenuItem className="rounded-xl p-0 focus:bg-transparent hover:bg-transparent">
                    <button onClick={() => logout()} className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-white/[0.05] transition-colors text-left">
                      <LogOut size={15} className="text-red-400" />
                      <span className="text-sm text-gray-200">Logout</span>
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-all duration-200"
              >
                <LogIn size={14} />
                Sign In
              </Link>
            )}
            <a
              href="https://billing.creepercastle.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-white bg-creeper hover:bg-creeper/90 px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-creeper/25"
            >
              <Store size={14} />
              Store
            </a>
            <Link
              to="/discord"
              className="flex items-center gap-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25"
            >
              <span className="text-base leading-none">💬</span>
              Discord
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/[0.06] transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0a0f1a] border-t border-white/[0.06] absolute w-full left-0 z-[9998] shadow-2xl max-h-[80vh] overflow-y-auto">
          <div className="container mx-auto px-6 py-4 space-y-1">

            <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors" onClick={() => setIsOpen(false)}>
              Home
            </Link>

            {/* Plans accordion */}
            <div>
              <button
                onClick={() => toggleMobileSection('plans')}
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                Plans
                <ChevronDown size={14} className={`text-gray-500 transition-transform duration-200 ${mobileSection === 'plans' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'plans' && (
                <div className="mt-1 pl-4 space-y-1 border-l border-white/[0.06] ml-4">
                  <Link to="/plans/minecraft" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors" onClick={() => setIsOpen(false)}>
                    <Gamepad2 size={14} className="text-creeper" /> Minecraft Classic
                  </Link>
                  <Link to="/plans/performance" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors" onClick={() => setIsOpen(false)}>
                    <Zap size={14} className="text-amber-400" /> Minecraft Performance
                  </Link>
                  <Link to="/plans/vps" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors" onClick={() => setIsOpen(false)}>
                    <Server size={14} className="text-cyan-400" /> Budget VPS
                  </Link>
                  <Link to="/plans/performance-vps" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors" onClick={() => setIsOpen(false)}>
                    <Zap size={14} className="text-amber-400" /> Performance VPS
                  </Link>
                  <Link to="/plans/discord-bot" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors" onClick={() => setIsOpen(false)}>
                    <Bot size={14} className="text-purple-400" /> Discord Bot
                  </Link>
                </div>
              )}
            </div>

            {/* Company accordion */}
            <div>
              <button
                onClick={() => toggleMobileSection('company')}
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                Company
                <ChevronDown size={14} className={`text-gray-500 transition-transform duration-200 ${mobileSection === 'company' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'company' && (
                <div className="mt-1 pl-4 space-y-1 border-l border-white/[0.06] ml-4">
                  <a href="/about" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors" onClick={(e) => handleNavigation('/about', e)}>
                    <Building2 size={14} className="text-blue-400" /> About Us
                  </a>
                  <Link to="/partners" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors" onClick={() => setIsOpen(false)}>
                    <Server size={14} className="text-creeper" /> Partners
                  </Link>
                  <Link to="/creeperpanel" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors" onClick={() => setIsOpen(false)}>
                    <Monitor size={14} className="text-orange-400" /> CreeperPanel
                  </Link>
                  <Link to="/datacenter" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors" onClick={() => setIsOpen(false)}>
                    <Building2 size={14} className="text-cyan-400" /> Infrastructure
                  </Link>
                  <Link to="/locations" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors" onClick={() => setIsOpen(false)}>
                    <MapPin size={14} className="text-pink-400" /> Locations
                  </Link>
                </div>
              )}
            </div>

            <Link to="/links" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors" onClick={() => setIsOpen(false)}>
              Links
            </Link>
            <Link to="/contact" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors" onClick={() => setIsOpen(false)}>
              Contact
            </Link>

            <div className="pt-3 pb-2 grid grid-cols-2 gap-2 border-t border-white/[0.06] mt-2">
              <a
                href="https://billing.creepercastle.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-sm font-medium text-white bg-creeper hover:bg-creeper/90 px-4 py-2.5 rounded-xl transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Store size={14} /> Store
              </a>
              <Link
                to="/discord"
                className="flex items-center justify-center gap-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 px-4 py-2.5 rounded-xl transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span>💬</span> Discord
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center justify-center gap-2 text-sm font-medium text-white border border-white/10 px-4 py-2.5 rounded-xl hover:bg-white/[0.06] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard size={14} /> Dashboard
                  </Link>
                  <button
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="flex items-center justify-center gap-2 text-sm font-medium text-red-400 border border-red-400/20 px-4 py-2.5 rounded-xl hover:bg-red-400/5 transition-colors w-full"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 text-sm font-medium text-white border border-creeper/30 px-4 py-2.5 rounded-xl hover:bg-creeper/5 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn size={14} /> Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

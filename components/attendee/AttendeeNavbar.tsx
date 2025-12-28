"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Search,
  Bell,
  User,
  Menu,
  X,
  LogOut,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import icon from "@/public/images/tixly-icon.png";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";

const AttendeeNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const image = "https://i.pravatar.cc/150?img=59";
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen || isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, isProfileOpen]);

  return (
    <nav
      ref={navRef}
      className="p-4 flex justify-between items-center fixed w-full top-0 bg-white z-50 shadow-md"
    >
      <div className="w-full">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex gap-1 items-center cursor-pointer">
            <Image src={icon} alt="" width={40} height={40} className="" />
            <h1 className="text-[28px] font-semibold ">Tixly</h1>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/home"
              className="hover:text-black cursor-pointer transition duration-300"
            >
              Home
            </Link>
            <Link
              href="/events"
              className="hover:text-black cursor-pointer transition duration-300"
            >
              Browse Events
            </Link>

            {/* My Tickets */}
            <Link
              href="/my-tickets"
              className="hover:text-black cursor-pointer transition duration-300"
            >
              My Tickets
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Browse Events */}

            {/* Notifications */}
            <button className="relative p-2 text-gray-700 hover:text-[#FF5722] transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <div className=" flex items-center gap-2 p-1 rounded-full  transition-colors">
                <div className="relative w-9 h-9">
                  <Image
                    src={image}
                    fill
                    alt={user ? user.first_name : ""}
                    className=" rounded-full border-2 border-gray-200"
                  />
                </div>
                <p className="text-sm text-gray-900">{user?.username}</p>
                {isProfileOpen ? (
                  <ChevronUp
                    onClick={toggleProfile}
                    className="text-gray-600 w-5 h-5 cursor-pointer"
                  />
                ) : (
                  <ChevronDown
                    onClick={toggleProfile}
                    className="text-gray-600 w-5 h-5 cursor-pointer"
                  />
                )}
              </div>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">My Profile</span>
                  </Link>

                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <Settings className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Settings</span>
                  </Link>

                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors w-full text-left text-red-600">
                      <LogOut className="w-5 h-5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:text-[#FF5722]"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events..."
              className="w-full pl-12 pr-4 py-2.5 rounded-full border-2 border-gray-200 focus:border-[#FF5722] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/events"
                className="hover:text-black cursor-pointer transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Events
              </Link>

              <Link
                href="/my-tickets"
                className="hover:text-black cursor-pointer transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                My Tickets
              </Link>

              <Link
                href="/profile"
                className="hover:text-black cursor-pointer transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                My Profile
              </Link>

              <Link
                href="/settings"
                className="hover:text-black cursor-pointer transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </Link>

              <button className="text-left text-red-600 font-medium hover:text-red-700 transition-colors">
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AttendeeNavbar;

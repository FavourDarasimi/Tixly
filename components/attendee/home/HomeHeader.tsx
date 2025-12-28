"use client";

import { Bell, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const HomeHeader = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-7xl xl:max-w-[1500px]">
      <div className="flex justify-between">
        <div>
          {user && (
            <h1 className=" text-xl font-medium">
              👋 Welcome back, {user.first_name}!
            </h1>
          )}
        </div>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events, venues, artists..."
              className="w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-400 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5722] transition-colors"
            />
          </div>
          <button className="px-8 py-4 bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-xl transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Welcome Badge */}
      {/* {user && (
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 border border-orange-200 rounded-full px-5 py-2">
            <span className=" text-sm font-medium">
              👋 Welcome back, {user.first_name}!
            </span>
          </div>
        </div>
      )} */}

      {/* Hero Text*/}
      {/* <div className="text-center mb-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
          Discover Events You'll Love
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Explore concerts, sports, workshops, and experiences near you. Book
          tickets instantly and manage everything in one place.
        </p>
      </div> */}

      {/* Search Bar */}
      {/* <div className="max-w-2xl mx-auto">
       
      </div> */}
    </div>
  );
};

export default HomeHeader;

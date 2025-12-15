"use client";

import React, { useState } from "react";
import { User, CalendarDays } from "lucide-react";
import { Briefcase } from "lucide-react"; // Assuming you use lucide-react for icons
import Link from "next/link"; // Or 'react-router-dom'

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState("");

  // Define your roles here
  const roles = [
    {
      id: "organizer",
      title: "As an Organizer",
      description:
        "For event hosts, companies, and teams who want to manage events, sell tickets, and track attendees.",
      icon: (
        <CalendarDays
          className={`w-8 h-8  ${
            selectedRole == "organizer" ? "text-white" : "text-gray-900"
          }`}
        />
      ),
    },
    {
      id: "attendee",
      title: "As an Attendee",
      description:
        "For individuals looking to discover events, buy tickets, and manage their bookings.",
      icon: (
        <User
          className={`w-8 h-8  ${
            selectedRole == "attendee" ? "text-white" : "text-gray-900"
          }`}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            How do you want to use Tixly?
          </h1>
          <p className="text-sm text-gray-500">
            Choose your role to get started
          </p>
        </div>

        {/* Cards Container */}
        <div className="space-y-4 mb-8">
          {roles.map((role) => {
            const isSelected = selectedRole === role.id;

            return (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`relative rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? "border-[#FF5722] bg-[#FF5722]/5 shadow-lg"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                {/* Checkmark indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-[#FF5722] rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isSelected ? "bg-[#FF5722]" : "bg-gray-100"
                  }`}
                >
                  {role.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {role.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {role.description}{" "}
                </p>
              </div>
              //   </div>
            );
          })}
        </div>

        <Link href={selectedRole ? `/signup?role=${selectedRole}` : "#"}>
          <button
            className={`w-full py-4 rounded-full font-semibold  transition-all duration-300 ${
              selectedRole
                ? "bg-[#FF5722] hover:bg-[#E64A19] hover:shadow-lg hover:scale-105 cursor-pointer text-white"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            onClick={(e) => !selectedRole && e.preventDefault()}
          >
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RoleSelection;

"use client";

import React, { useState } from "react";
import {
  Search,
  CreditCard,
  QrCode,
  LayoutDashboard,
  BarChart3,
  ScanLine,
} from "lucide-react";

// Types
type UserType = "attendee" | "organizer";

interface StepItem {
  id: string;
  step: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  highlight: string;
}

const HowItWorks: React.FC = () => {
  const [userType, setUserType] = useState<UserType>("attendee");
  const [displayedUserType, setDisplayedUserType] =
    useState<UserType>("attendee");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = (type: UserType) => {
    if (type === userType || isAnimating) return;

    setIsAnimating(true);

    // Fade out
    setTimeout(() => {
      setDisplayedUserType(type);
      setUserType(type);

      // Fade in
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  const content: Record<UserType, StepItem[]> = {
    attendee: [
      {
        id: "a1",
        step: "01",
        title: "Discover Events",
        desc: "Explore events by category or location with powerful filters that surface what matches your vibe.",
        icon: <Search className="h-6 w-6" />,
        color: "bg-[#FF5722]/10 text-[#FF5722]",
        highlight: "Find events fast",
      },
      {
        id: "a2",
        step: "02",
        title: "Book Securely",
        desc: "Pay safely with Stripe or Paystack. Transparent pricing, instant confirmation, zero friction.",
        icon: <CreditCard className="h-6 w-6" />,
        color: "bg-[#FF5722]/10 text-[#FF5722]",
        highlight: "Trusted payments",
      },
      {
        id: "a3",
        step: "03",
        title: "Show Up & Go",
        desc: "Get your QR code ticket instantly via email. Scan at the door and walk right in.",
        icon: <QrCode className="h-6 w-6" />,
        color: "bg-[#FF5722]/10 text-[#FF5722]",
        highlight: "Instant access",
      },
    ],

    organizer: [
      {
        id: "o1",
        step: "01",
        title: "Create Your Event",
        desc: "Launch your event in minutes with flexible ticket types, pricing tiers, and schedules.",
        icon: <LayoutDashboard className="h-6 w-6" />,
        color: "bg-[#FF5722]/10 text-[#FF5722]",
        highlight: "Setup in minutes",
      },
      {
        id: "o2",
        step: "02",
        title: "Track Performance",
        desc: "Watch ticket sales, revenue, and attendee insights update live from your dashboard.",
        icon: <BarChart3 className="h-6 w-6" />,
        color: "bg-[#FF5722]/10 text-[#FF5722]",
        highlight: "Real-time analytics",
      },
      {
        id: "o3",
        step: "03",
        title: "Scan & Admit",
        desc: "Check in guests instantly using our QR scanner app. No duplicates. No delays.",
        icon: <ScanLine className="h-6 w-6" />,
        color: "bg-[#FF5722]/10 text-[#FF5722]",
        highlight: "Fast entry",
      },
    ],
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl  font-bold text-slate-900 mb-4">
            How Tixly Works
          </h2>
          <p className="text-lg text-slate-600  mb-10">
            A seamless experience built for both the people partying and the
            people planning.
          </p>

          {/* Toggle */}
          <div className="relative inline-flex bg-slate-100 p-1.5 rounded-full shadow-inner">
            <div
              className="absolute top-1.5 bottom-1.5 bg-white rounded-full shadow-sm transition-all duration-300"
              style={{
                width: "calc(50% - 12px)",
                left: userType === "attendee" ? "6px" : "calc(50% + 6px)",
              }}
            />

            <button
              onClick={() => handleToggle("attendee")}
              className={`cursor-pointer relative z-10 w-[140px] py-2.5 text-sm font-semibold transition-colors ${
                userType === "attendee" ? "text-slate-900" : "text-slate-500"
              }`}
            >
              Attendee
            </button>

            <button
              onClick={() => handleToggle("organizer")}
              className={`cursor-pointer relative z-10 w-[140px] py-2.5 text-sm font-semibold transition-colors ${
                userType === "organizer" ? "text-slate-900" : "text-slate-500"
              }`}
            >
              Organizer
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="relative min-h-80">
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-300 ease-out ${
              isAnimating
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
            }`}
          >
            {content[displayedUserType].map((item, index) => (
              <div
                key={item.id}
                style={{
                  transitionDelay: isAnimating ? "0ms" : `${index * 80}ms`,
                }}
                className="group relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/60"
              >
                {/* Hover Gradient */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#FF5722]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Step */}
                <span className="absolute top-6 right-6 text-5xl font-bold text-[#E2E8F0] group-hover:text-[#475569] transition-colors">
                  {item.step}
                </span>

                {/* Icon */}
                <div
                  className={`relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  {item.icon}
                </div>

                {/* Text */}
                <div className="relative z-10 space-y-3">
                  <span className="inline-block rounded-full bg-[#FF5722]/10 px-3 py-1 text-xs font-semibold text-[#FF5722]">
                    {item.highlight}
                  </span>

                  <h3 className="text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

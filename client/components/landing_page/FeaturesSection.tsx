"use client";

import { useState } from "react";
import {
  Search,
  CreditCard,
  QrCode,
  Smartphone,
  CalendarCheck,
  LayoutDashboard,
  BarChart3,
  ScanLine,
  ShieldCheck,
  Wallet,
} from "lucide-react";

type UserType = "attendee" | "organizer";

const FEATURES = {
  attendee: [
    {
      title: "Smart Discovery",
      desc: "Find events by category, location, or date using powerful filters.",
      icon: <Search className="w-6 h-6" />,
    },
    {
      title: "Secure Payments",
      desc: "Pay safely with Stripe or Paystack. Transparent pricing guaranteed.",
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      title: "Instant QR Tickets",
      desc: "Receive QR code tickets instantly via email after purchase.",
      icon: <QrCode className="w-6 h-6" />,
    },
    {
      title: "Mobile Friendly",
      desc: "Access tickets easily on any device — no printing required.",
      icon: <Smartphone className="w-6 h-6" />,
    },
    {
      title: "Calendar Sync",
      desc: "Save events directly to your calendar with one click.",
      icon: <CalendarCheck className="w-6 h-6" />,
    },
    {
      title: "Fast Entry",
      desc: "Skip long lines with quick QR scanning at the venue.",
      icon: <ScanLine className="w-6 h-6" />,
    },
  ],

  organizer: [
    {
      title: "Event Dashboard",
      desc: "Create and manage events from a powerful, easy-to-use dashboard.",
      icon: <LayoutDashboard className="w-6 h-6" />,
    },
    {
      title: "Ticket Tiers",
      desc: "Set up free, paid, early-bird, or VIP tickets effortlessly.",
      icon: <Wallet className="w-6 h-6" />,
    },
    {
      title: "Live Analytics",
      desc: "Track ticket sales, revenue, and performance in real time.",
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      title: "QR Code Scanning",
      desc: "Validate attendees instantly using our built-in scanner app.",
      icon: <ScanLine className="w-6 h-6" />,
    },
    {
      title: "Fraud Protection",
      desc: "Prevent duplicate entries and unauthorized ticket usage.",
      icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
      title: "Fast Payouts",
      desc: "Receive ticket revenue quickly with clear payout reports.",
      icon: <Wallet className="w-6 h-6" />,
    },
  ],
};

export default function FeaturesSection() {
  const [userType, setUserType] = useState<UserType>("attendee");

  return (
    <section className="py-24 ">
      <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Powerful Features for Everyone
          </h2>
          <p className="text-slate-600 text-lg">
            Whether you’re attending or organizing, Tixly gives you the tools to
            move fast and stay in control.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="relative inline-flex bg-slate-100 p-1.5 rounded-full shadow-inner">
            <div
              className="absolute top-1.5 bottom-1.5 bg-white rounded-full shadow-sm transition-all duration-300"
              style={{
                width: "calc(50% - 12px)",
                left: userType === "attendee" ? "6px" : "calc(50% + 6px)",
              }}
            />
            {["attendee", "organizer"].map((type) => (
              <button
                key={type}
                onClick={() => setUserType(type as UserType)}
                className={`cursor-pointer relative z-10 w-[140px] py-2.5 text-sm font-semibold transition-colors ${
                  userType === type ? "text-slate-900" : "text-slate-500"
                }`}
              >
                {type === "attendee" ? "Attendees" : "Organizers"}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Grid */}
        <div
          key={userType}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          {FEATURES[userType].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FF5722]/10 text-[#FF5722] flex items-center justify-center mb-6">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

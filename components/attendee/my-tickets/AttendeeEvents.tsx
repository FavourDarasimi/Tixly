"use client";

import React, { useState } from "react";
import { Event } from "@/types/event";
import { MapPin, QrCode, Clock } from "lucide-react";
import Link from "next/link";
import TicketView from "./TicketView";

type AttendeeEvents = {
  upcomingEvents: Event[];
  pastEvents: Event[];
};

const AttendeeEvents = ({ upcomingEvents, pastEvents }: AttendeeEvents) => {
  const [filtered, setFiltered] = useState("upcoming");
  const events = filtered === "upcoming" ? upcomingEvents : pastEvents;

  const getDateParts = (dateString: string) => {
    const date = new Date(dateString);

    const month = date
      .toLocaleDateString("en-US", { month: "short" })
      .toUpperCase();

    const day = String(date.getDate()).padStart(2, "0");

    return { month, day };
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="mt-7">
      <div className="flex gap-10">
        <h1
          className={`border-b-3 pb-2 font-semibold w-fit cursor-pointer transition-colors duration-400 ${
            filtered == "upcoming"
              ? "border-b-[#FF5722] text-[#FF5722]"
              : "border-transparent text-[#BF360C]/50"
          }`}
          onClick={() => setFiltered("upcoming")}
        >
          Upcoming({upcomingEvents.length})
        </h1>
        <h1
          className={`border-b-3 pb-2 font-semibold w-fit cursor-pointer transition-colors duration-400 ${
            filtered == "past"
              ? "border-b-[#FF5722] text-[#FF5722]"
              : "border-transparent text-[#BF360C]/50"
          }`}
          onClick={() => setFiltered("past")}
        >
          Past({pastEvents.length})
        </h1>
      </div>

      <div className="mt-10 space-y-5 mx-20">
        {events.map((event) => {
          const { month, day } = getDateParts(event.startDateTime);
          return (
            <div
              key={event.id}
              className="flex border border-gray-200 p-3 rounded-2xl justify-between items-center"
            >
              <div className="flex items-center gap-10">
                <div className="bg-[#FF5722]/20  text-center text-[#FF5722]  rounded-[20px] w-fit py-3.5 px-5">
                  <p className="text-[11px] font-semibold leading-none">
                    {month}
                  </p>
                  <p className="font-semibold text-[20px] leading-none">
                    {day}
                  </p>
                </div>
                <div>
                  {" "}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#FF5722] transition">
                    {event.title}
                  </h3>
                  <div className="space-y-1.5 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#FF5722]" />
                      <span>{formatTime(event.startDateTime)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#FF5722]" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center font-medium gap-2 rounded-lg border border-transparent bg-[#FF5722] text-white py-1.5 px-4 text-[14px]">
                  <QrCode className="w-4 h-4" />
                  View Ticket
                </button>
                <Link href={`/event/${event.id}`}>
                  <button className="flex  items-center font-medium gap-2 rounded-lg border border-gray-300 py-1.5 px-4 text-[14px]">
                    <QrCode className="w-4 h-4" />
                    View Event Details
                  </button>
                </Link>
              </div>
              {/* <TicketView id={event.id} /> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendeeEvents;

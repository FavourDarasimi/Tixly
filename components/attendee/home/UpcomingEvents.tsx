import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Clock, ChevronRight } from "lucide-react";
import eventimg from "@/public/images/wmremove-transformed.webp";
import { Event } from "@/types/event";

type EventArray = {
  upcomingEvents: Event[];
};

const UpcomingEvents = async ({ upcomingEvents }: EventArray) => {
  // If no events, return null early
  if (upcomingEvents.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Upcoming in 24h
            </h2>
            <p className="text-gray-600">Don't miss out on these events!</p>
          </div>
          <Link
            href="/events"
            className="text-[#FF5722] hover:text-[#E64A19] font-semibold flex items-center gap-2"
          >
            View more
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {upcomingEvents.slice(0, 2).map((event: Event) => {
            const eventDate = event.startDateTime || event.date || "";

            return (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="group bg-white border-2 border-orange-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="flex gap-5 p-6">
                  <div className="w-32 h-32 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={eventimg}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                      Starting Soon
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#FF5722] transition">
                      {event.title}
                    </h3>

                    <div className="space-y-1.5 text-sm text-gray-700 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#FF5722]" />
                        <span>{formatDate(eventDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#FF5722]" />
                        <span>
                          {event.startDateTime
                            ? event.startDateTime
                            : event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#FF5722]" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;

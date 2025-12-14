import React from "react";
import { MapPin, Clock } from "lucide-react";
import Image from "next/image";
import eventimg from "@/public/images/wmremove-transformed.webp";
import Button from "./Button";

type EventProps = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  currency: string;
  image?: string;
  category: string;
  organizer: {
    name: string;
    avatar: string;
  };
  isFeatured: boolean;
};

const isAuthenticated = false;

const EventCard = ({
  id,
  title,
  description,
  date,
  location,
  price,
  currency,
  image,
  category,
  organizer,
  isFeatured,
}: EventProps) => {
  const eventDate = new Date(date);

  // Format Date for the top-right badge (e.g., "28 SEP")
  const day = eventDate.getDate();
  const month = eventDate
    .toLocaleString("default", { month: "short" })
    .toUpperCase();

  // Format Time (e.g., "9:00 AM")
  const time = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image Section */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={eventimg}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

        {/* Date Badge */}
        <div className="absolute top-4 right-4 bg-white rounded-xl px-3 py-2 shadow-md text-center">
          <div className="text-gray-900 font-extrabold text-lg leading-none">
            {day}
          </div>
          <div className="text-[#FF5722] text-xs font-semibold uppercase">
            {month}
          </div>
        </div>

        {/* Category / Value Badge */}
        <div className="absolute top-4 left-4 bg-[#FF5722]/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          Conference
          {/* Example alternatives:
        Free Event
        From ₦5,000
      */}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col grow">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Clock size={16} className="text-[#FF5722]" />
            <span>{time}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <MapPin size={16} className="text-[#FF5722]" />
            <span className="truncate max-w-40">{location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2 grow">
          {description}
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-3">
          {isAuthenticated && (
            <Button size="medium" className="w-full" type="primary">
              Get Tickets
            </Button>
          )}

          <Button size="medium" className="w-full" type="secondary">
            View Event
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

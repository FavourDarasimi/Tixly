import React from "react";
import eventimg from "@/public/images/wmremove-transformed.webp";
import EventCard from "../EventsCard";

const MOCK_EVENTS = [
  {
    id: 1,
    title: "Tech Horizon Summit 2025",
    description:
      "Join the leading minds in AI and Blockchain for a 3-day innovative experience.",
    date: "2025-03-15T09:00:00",
    location: "Eko Convention Center, Lagos",
    price: 45000,
    currency: "NGN",
    image: eventimg,
    category: "Technology",
    organizer: {
      name: "TechNext",
      avatar: "https://i.pravatar.cc/150?u=TechNext",
    },
    isFeatured: true,
  },
  {
    id: 2,
    title: "Afrobeats in the Park",
    description:
      "A relaxed evening of live music, food vendors, and good vibes under the stars.",
    date: "2025-02-14T18:00:00",
    location: "Muri Okunola Park, VI",
    price: 15000,
    currency: "NGN",
    image: eventimg,
    category: "Music",
    organizer: {
      name: "Vibe Culture",
      avatar: "https://i.pravatar.cc/150?u=Vibe",
    },
    isFeatured: false,
  },
  {
    id: 3,
    title: "Startup Fundraising Masterclass",
    description:
      "Learn how to pitch your idea to investors and secure your first round of funding.",
    date: "2025-04-10T10:00:00",
    location: "Online (Zoom)",
    price: 0, // Free event test case
    currency: "NGN",
    image: eventimg,
    category: "Business",
    organizer: {
      name: "Venture Loop",
      avatar: "https://i.pravatar.cc/150?u=Venture",
    },
    isFeatured: false,
  },
  {
    id: 4,
    title: "Digital Art & NFT Exhibition",
    description:
      "Showcasing the future of digital ownership and creative expression.",
    date: "2025-03-22T12:00:00",
    location: "Art Twenty One, Lagos",
    price: 5000,
    currency: "NGN",
    image: eventimg,
    category: "Art",
    organizer: {
      name: "Creative X",
      avatar: "https://i.pravatar.cc/150?u=Art",
    },
    isFeatured: false,
  },
];

const TrendingEvents = () => {
  return (
    <section className="max-w-7xl xl:max-w-[1500px] mx-auto px-4 py-14">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold text-gray-900">Upcoming Events</h2>
          <p className="text-gray-600 mt-1 text-lg">
            Discover what’s happening near you and plan ahead.
          </p>
        </div>

        {/* View All */}
        <a
          href="/events"
          className="text-sm font-semibold text-[#FF5722] hover:underline"
        >
          View all →
        </a>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {MOCK_EVENTS.slice(0, 8).map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            description={event.description}
            date={event.date}
            location={event.location}
            price={event.price}
            currency={event.currency}
            category={event.category}
            organizer={event.organizer}
            isFeatured={event.isFeatured}
          />
        ))}
      </div>

      {/* Empty State */}
      {MOCK_EVENTS.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          No upcoming events yet. Check back soon!
        </div>
      )}
    </section>
  );
};

export default TrendingEvents;

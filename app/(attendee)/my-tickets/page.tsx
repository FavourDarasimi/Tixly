import React from "react";
import { getAttendeeEvents } from "@/lib/event-api/api";
import AttendeeEvents from "@/components/attendee/my-tickets/AttendeeEvents";
import { cookies } from "next/headers";
import { CalendarPlus } from "lucide-react";

const MyTickets = async () => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();
  const events = await getAttendeeEvents(cookieString);
  return (
    <div className="max-w-7xl xl:max-w-[1500px] mx-auto my-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[27px] font-semibold">My Tickets</h1>
          <p>Manage your upcoming and pase events</p>
        </div>
        <div className="flex text-[#FF5722] gap-1 items-center">
          <CalendarPlus className="w-[18px] h-[18px]" />
          <p className="text-[15px] font-semibold">Sync to Calender</p>
        </div>
      </div>
      <AttendeeEvents
        upcomingEvents={events.upcoming}
        pastEvents={events.past}
      />
    </div>
  );
};

export default MyTickets;

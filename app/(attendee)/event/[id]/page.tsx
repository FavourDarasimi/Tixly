import Header from "@/components/attendee/event-details/Header";
import EventContent from "@/components/attendee/event-details/EventContent";
import { getEventDetails } from "@/lib/event-api/api";
import EventBookingSideBar from "@/components/attendee/event-details/EventBookingSideBar";

const EventDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const response = await getEventDetails(id);

  return (
    <div className="pb-10 min-h-screen">
      <Header data={response} />
      <main className="flex p-10 gap-32 bg-slate-50">
        <div className="w-[75%]">
          <EventContent data={response} />
        </div>
        <div className="w-[25%] flex justify-center">
          <EventBookingSideBar data={response} />
        </div>
      </main>
    </div>
  );
};

export default EventDetails;

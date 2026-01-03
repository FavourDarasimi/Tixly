"use client";
import Button from "@/components/Button";
import EventMap from "@/components/EventMap";
import ShareEventCard from "@/components/attendee/event-details/ShareEventCard";
import { Event } from "@/types/event";
import { constants } from "fs";
import { useState } from "react";
import { MapPinHouse } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

type EventDetails = {
  data: Event;
};
const EventBookingSideBar = ({ data }: EventDetails) => {
  const { isAuthenticated } = useAuth();
  const [tierSelected, setTierSelected] = useState(0);
  const [tierSelectedPrice, setTierSelectedPrice] = useState(0);

  const tierClick = (index: number, price: number) => {
    setTierSelected(index);
    setTierSelectedPrice(price);
  };

  const openDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${data.latitude},${data.longitude}`,
      "_blank"
    );
  };

  return (
    <div className="w-full space-y-10">
      {isAuthenticated ? (
        <div className="w-full bg-white rounded-4xl h-fit p-7 text-black  shadow-md">
          <div className=" ">
            <h1 className="font-semibold text-xl mb-6">Select Tickets</h1>
            <div className="space-y-5 ">
              {data.ticket_tiers.map((tier, index) => (
                <div
                  key={index}
                  onClick={() => tierClick(index, tier.price)}
                  className={`flex justify-between items-start py-4 px-4 transition-colors duration-400ms cursor-pointer border ${
                    tierSelected == index
                      ? "border-[#FF5722] bg-[#FF5722]/7"
                      : "border-gray-300"
                  } rounded-3xl`}
                >
                  <div>
                    <h1 className="text-[17px] font-semibold">{tier.name}</h1>
                    <p className="text-gray-500 text-sm ">
                      {tier.short_description}
                    </p>
                  </div>
                  <p className="text-[#FF5722] text-[17px] font-semibold ">
                    ${tier.price}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-t-gray-200 my-8" />
            <div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500">Total :</p>
                <h1 className="font-semibold text-[26px]">
                  ${tierSelectedPrice}
                </h1>
              </div>
            </div>
            <Button
              type="primary"
              size="large"
              className="w-full rounded-full mt-3"
            >
              Checkout
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="w-full bg-white rounded-4xl h-fit p-7 text-black  shadow-md">
        <div className="mb-6 flex items-center gap-2">
          <MapPinHouse className="text-[#FF5722] w-6 h-6" />
          <h1 className="font-semibold text-xl ">Venue</h1>
        </div>
        <div>
          {data.latitude && data.longitude && (
            <EventMap
              latitude={data.latitude}
              longitude={data.longitude}
              eventName={data.title}
            />
          )}
        </div>
        <p className="mt-3 text-[18px] font-semibold">{data.location}</p>
        <p
          onClick={openDirections}
          className="text-[#FF5722] font-semibold mt-3"
        >
          Get Directions
        </p>
      </div>

      <ShareEventCard eventTitle={data.title} eventUrl={window.location.href} />
    </div>
  );
};

export default EventBookingSideBar;

"use client";

import { getUserEventTicket } from "@/lib/event-api/api";
import { useEffect, useState } from "react";
import QRCode from "./QRCode";

type EventId = {
  id: number;
};

const TicketView = ({ id }: EventId) => {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    const getTickets = async () => {
      try {
        const response = await getUserEventTicket(id);
        console.log(response);
        setTickets(response.results);
      } catch (error) {
        console.log(error);
      }
    };
    getTickets();
  }, []);

  return (
    <div>
      {" "}
      {tickets.map((ticket: any) => (
        <QRCode uuid={ticket.qr_code} />
      ))}
    </div>
  );
};

export default TicketView;

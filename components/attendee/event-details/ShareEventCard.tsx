// components/ShareEventCard.tsx
"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";
import X from "@/public/twitter.png";
import Whatsapp from "@/public/whatsapp.png";
import Facebook from "@/public/facebook.png";
import Image from "next/image";

interface ShareEventCardProps {
  eventTitle: string;
  eventUrl: string;
}

const ShareEventCard = ({ eventTitle, eventUrl }: ShareEventCardProps) => {
  const [copied, setCopied] = useState(false);

  const shareText = `Check out this event: ${eventTitle}`;

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      eventUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(eventUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      `${shareText}\n${eventUrl}`
    )}`,
  };

  const openShare = (url: string) => {
    window.open(url, "_blank", "width=600,height=400");
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(eventUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="w-full bg-white rounded-4xl h-fit p-7 text-black  shadow-md">
      {/* Title */}
      <h3 className="font-semibold text-xl mb-6">Share this event</h3>

      {/* Buttons */}
      <div className="flex items-center gap-7 justify-center">
        {/* Facebook - FB */}
        <button
          onClick={() => openShare(shareUrls.facebook)}
          className="relative w-12 h-12 cursor-pointer"
        >
          <Image src={Facebook} fill alt="X_png" />
        </button>

        {/* Twitter - TW */}
        <button
          onClick={() => openShare(shareUrls.twitter)}
          className="relative w-12 h-12 cursor-pointer"
        >
          <Image src={X} fill alt="X_png" />
        </button>

        {/* WhatsApp - WA */}
        <button
          onClick={() => openShare(shareUrls.whatsapp)}
          className="relative w-12 h-12 cursor-pointer"
        >
          <Image src={Whatsapp} fill alt="X_png" />
        </button>

        {/* Copy Link */}
        <button
          onClick={copyToClipboard}
          className="flex items-center justify-center w-12 h-12 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
        >
          {copied ? (
            <Check className="w-5 h-5 " />
          ) : (
            <Link2 className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ShareEventCard;

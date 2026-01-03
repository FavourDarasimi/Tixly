"use client";

import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";

type Props = {
  uuid: string;
};

export default function QRCode({ uuid }: Props) {
  return (
    <div style={{ textAlign: "center" }}>
      <p>{uuid}</p>
      <QRCodeCanvas
        value={uuid}
        size={200}
        bgColor="#ffffff"
        fgColor="#000000"
        level="M"
      />
    </div>
  );
}

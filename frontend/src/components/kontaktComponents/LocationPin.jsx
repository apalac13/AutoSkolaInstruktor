"use client";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";
import { useState } from "react";

export default function LocationPin({ lat, lng, text }) {
  const [isOpen, setIsOpen] = useState(false);

  const position = { lat, lng };

  return (
    <>
      <MarkerF
        position={position}
        onClick={() => setIsOpen(true)}
        icon={{
          url: "/location-pin.png",
        }}
      />

      {isOpen && (
        <InfoWindowF position={position} onCloseClick={() => setIsOpen(false)}>
          <div>{text}</div>
        </InfoWindowF>
      )}
    </>
  );
}

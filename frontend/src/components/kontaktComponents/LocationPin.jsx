"use client";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";
import { useState } from "react";

export default function LocationPin({ lat, lng, text }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <MarkerF
      position={{ lat, lng }}
      onClick={() => setIsOpen(true)}
      icon={{
        url: "/location-pin.png",
        scaledSize: { width: 50, height: 50 },
      }}
    >
      {isOpen && (
        <InfoWindowF
          position={{ lat, lng }}
          onCloseClick={() => setIsOpen(false)}
        >
          <div>
            <p>{text}</p>
          </div>
        </InfoWindowF>
      )}
    </MarkerF>
  );
}

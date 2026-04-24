"use client";
import { useState, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";
import LocationPin from "./LocationPin";

const center = {
  lat: 43.47087,
  lng: 17.32882,
};

export default function Map() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-[1000px] max-lg:w-full max-lg:px-6 h-[600px]">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={18}
        options={{
          zoomControl: true,
          mapTypeId: "satellite",
        }}
      >
        <LocationPin
          lat={center.lat}
          lng={center.lng}
          text="Stjepana Radića 40"
        />
      </GoogleMap>
    </div>
  );
}

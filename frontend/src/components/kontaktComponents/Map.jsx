"use client";

import { GoogleMap } from "@react-google-maps/api";
import LocationPin from "./LocationPin";

export const defaultMapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultMapCenter = {
  lat: 43.47087,
  lng: 17.32882,
};

const defaultMapZoom = 18;

const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "satellite",
};

export default function Map() {
  return (
    <div className="w-[1000px] h-[600px]">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        <LocationPin
          lat={defaultMapCenter.lat}
          lng={defaultMapCenter.lng}
          text={"Stjepana Radića 40, 88240 Posušje, Bosnia and Herzegovina"}
        />
      </GoogleMap>
    </div>
  );
}

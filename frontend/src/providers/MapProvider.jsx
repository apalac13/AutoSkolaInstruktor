"use client";
import { useJsApiLoader } from "@react-google-maps/api";
import { useMemo } from "react";

export function MapProvider({ children }) {
  const libraries = useMemo(() => ["places", "drawing", "geometry"], []);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
    libraries,
    id: "google-map-script",
  });

  if (loadError) return <p>Map failed to load</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  return children;
}

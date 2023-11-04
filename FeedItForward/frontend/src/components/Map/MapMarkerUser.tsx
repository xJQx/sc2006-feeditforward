import React from "react";
import { Circle } from "react-leaflet";

interface MapMarkerUserProps {
  latitude: number;
  longitude: number;
}

export const MapMarkerUser = (props: MapMarkerUserProps) => {
  const { latitude, longitude } = props;

  return (
    <>
      <Circle
        center={[latitude, longitude]}
        pathOptions={{
          fillColor: "#2C6CE9",
          fillOpacity: 0.35,
          stroke: false
        }}
        radius={56}
      />
      <Circle
        center={[latitude, longitude]}
        pathOptions={{
          fillColor: "white",
          fillOpacity: 1,
          stroke: false
        }}
        radius={16}
      />
      <Circle
        center={[latitude, longitude]}
        pathOptions={{
          fillColor: "#2C6CE9",
          fillOpacity: 1,
          stroke: false
        }}
        radius={12}
      />
    </>
  );
};

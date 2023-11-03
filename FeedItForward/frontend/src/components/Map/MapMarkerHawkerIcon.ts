import L from "leaflet";

export const MapMarkerHawkerIcon = (registered: boolean = false) => {
  return L.icon({
    iconUrl: registered
      ? "/images/marker-hawker-registered.png"
      : "/images/marker-hawker-public.png",
    iconSize: registered ? [38, 38] : [32, 38],
    iconAnchor: registered ? [38, 38] : [32, 38]
  });
};

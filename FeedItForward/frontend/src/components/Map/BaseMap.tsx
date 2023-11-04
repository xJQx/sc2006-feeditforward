import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useCurrentGeoLocation } from "../../hooks";
import { MapMarkerUser } from "./MapMarkerUser";
import useFetch from "../../hooks/useFetch";
import { Hawker } from "../../utils/schema";
import { MapHawkerModal, MapHawkerSearchModal } from "../Modal";
import { MapMarkerHawkerIcon } from "./MapMarkerHawkerIcon";
import { BiSearchAlt } from "react-icons/bi";
import { TiWeatherCloudy } from "react-icons/ti";
import toast from "react-hot-toast";

export const BaseMap = () => {
  const userLocation = useCurrentGeoLocation();
  const fetch = useFetch();
  const [hawkersList, setHawkersList] = useState<Hawker[]>([]);
  const [hawkerSelected, setHawkerSelected] = useState<Hawker>();
  const [isHawkerModalOpen, setIsHawkerModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    const getAllPublicHawkers = async () => {
      const res = await fetch.get("/hawkers/public");
      setHawkersList(res);

      // TODO: Add Registered Hawkers
    };

    getAllPublicHawkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePublicHawkerMarkerOnClick = (hawker: Hawker) => {
    setHawkerSelected(hawker);
    setIsHawkerModalOpen(true);
  };

  const handleWeatherQuery = () => {
    // TODO
    toast("TODO: handleWeatherQuery");
  };

  return (
    <>
      {/* For Leaflet Map */}
      <div id="map"></div>
      {userLocation ? (
        <MapContainer
          className="top-0 left-0 h-full z-0"
          center={[userLocation.latitude, userLocation.longitude]}
          zoom={17}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          {/* Map */}
          <TileLayer
            detectRetina={true}
            attribution='<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors
              <div style="display:flex;justify-content:flex-end;align-items:center;gap:2px;">
                <img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/>
                <a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>
              </div>'
            url="https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png"
          />

          {/* Current Location */}
          <MapMarkerUser
            latitude={userLocation.latitude}
            longitude={userLocation.longitude}
          />

          {/* Hawker Markers */}
          {hawkersList?.map(hawker => (
            <Marker
              icon={MapMarkerHawkerIcon()}
              key={`${hawker.businessName}-${hawker.geometry.latitude}-${hawker.geometry.longitude}`}
              position={[hawker.geometry.latitude, hawker.geometry.longitude]}
              eventHandlers={{
                click: () => {
                  handlePublicHawkerMarkerOnClick(hawker);
                }
              }}
            />
          ))}
        </MapContainer>
      ) : (
        <div className="flex justify-center items-center h-[80vh] w-full px-12">
          <span className="font-nunito text-[24px] animate-bounce">
            Please enable your location permissions to use this feature... 📍
          </span>
        </div>
      )}

      {/* Feature Icons */}
      {userLocation && (
        <div className="absolute z-20 bottom-[88px] my-2 mx-3 flex gap-1">
          <BiSearchAlt
            className="bg-brand-tertiary opacity-70 p-[2px] w-[24px] h-[24px] rounded-full"
            onClick={() => setIsSearchModalOpen(true)}
          />
          <TiWeatherCloudy
            className="bg-brand-tertiary opacity-70 p-[2px] w-[24px] h-[24px] rounded-full"
            onClick={handleWeatherQuery}
          />
        </div>
      )}

      {/* Hawker Search Modal */}
      <MapHawkerSearchModal
        hawkersList={hawkersList}
        isSearchModalOpen={isSearchModalOpen}
        setIsSearchModalOpen={setIsSearchModalOpen}
        setHawkerSelected={setHawkerSelected}
        setIsHawkerModalOpen={setIsHawkerModalOpen}
      />

      {/* Hawker Modal */}
      {hawkerSelected && (
        <MapHawkerModal
          isModalOpen={isHawkerModalOpen}
          setModalOpen={setIsHawkerModalOpen}
          hawker={hawkerSelected}
          isRegistered={false}
        />
      )}
    </>
  );
};

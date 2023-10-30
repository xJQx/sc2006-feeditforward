import React from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import { MapModal } from "../../components";

export const MapScreen = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCTK5wRgAZkEvnitFox25l4RerhsG_wGEw"
  });
  const center = useMemo(() => ({ lat: 1.346706,  lng: 103.681515 }), []);

  const [modalOpen, setModalOpen] = useState(false)

  function openModal(){
    setModalOpen(true);
  }

  function resetModal(data: boolean){
    if (data){
      setModalOpen(false);
    }
    
  }

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={16}
        >
          <MarkerF position={{ lat: 1.346706,  lng: 103.681515 }} icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"} onClick={openModal}/>
        </GoogleMap>
      )}
      <MapModal isOpen={modalOpen} reset={resetModal}></MapModal>
    </div>
  );
};


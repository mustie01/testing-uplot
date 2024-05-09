import { useState } from "react";
import DirectionsData from "../directionsData/directionsData";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export default function DynamicMap({
  routeIsCreated,
  markerCoordinatesArray,
  handleMapClick,
}) {
  // const position = { lat: 52.4823, lng: -1.89 };

  return (
    <div style={{ height: "50vh", width: "50%" }}>
      <APIProvider apiKey={import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
          // center={position}
          // zoom={9}
          mapId={import.meta.env.VITE_PUBLIC_MAP_ID}
          fullscreenControl={false}
          onClick={handleMapClick}
        >
          {markerCoordinatesArray[0] &&
            !routeIsCreated &&
            markerCoordinatesArray.map((marker, index) => {
              return <Marker key={index} position={marker} draggable={true} />;
            })}
        </Map>

        <DirectionsData
          markerCoordinatesArray={markerCoordinatesArray}
          routeIsCreated={routeIsCreated}
        />
      </APIProvider>
    </div>
  );
}

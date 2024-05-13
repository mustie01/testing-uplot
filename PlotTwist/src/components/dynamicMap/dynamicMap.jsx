import { useState } from "react";
import DirectionsData from "../directionsData/directionsData";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import "./dynamicMap.css";

export default function DynamicMap({
  routeIsCreated,
  markerCoordinatesArray,
  handleMapClick,
  setRouteIsCreated,
  setMarkerCoordinatesArray,
}) {
  const position = { lat: 52.4823, lng: -1.89 };

  return (
    <>
      
        <APIProvider apiKey={import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <div className="dynamicMap">
          <Map
            defaultCenter={position}
            defaultZoom={9}
            mapId={import.meta.env.VITE_PUBLIC_MAP_ID}
            fullscreenControl={false}
            onClick={handleMapClick}
          >
            {markerCoordinatesArray[0] &&
              !routeIsCreated &&
              markerCoordinatesArray.map((marker, index) => {
                return (
                  <Marker key={index} position={marker} draggable={true} />
                );
              })}
          </Map>
          </div>
          <DirectionsData
          markerCoordinatesArray={markerCoordinatesArray}
          routeIsCreated={routeIsCreated}
          setRouteIsCreated={setRouteIsCreated}
          setMarkerCoordinatesArray={setMarkerCoordinatesArray}
        />
        </APIProvider>
      
    </>
  );
}

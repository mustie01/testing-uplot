import { useState } from "react";
import DirectionsData from "../directionsData/directionsData";
import {
  APIProvider,
  Map,
  Marker,
} from "@vis.gl/react-google-maps";

export default function DynamicMap() {
  const [markerCoordinatesArray, setMarkerCoordinatesArray] = useState([]);
  const [createdRoute, setCreatedRoute] = useState(false);

  const handleRouteCreation = () => {
    setCreatedRoute(true);
  };

  const handleMapClick = (event) => {
    setMarkerCoordinatesArray((prev) => {
      return [
        ...prev,
        { lat: event.detail.latLng.lat, lng: event.detail.latLng.lng },
      ];
    });
  };

  const position = { lat: 52.4823, lng: -1.89 };

  return (
    <div style={{ height: "50vh", width: "50%" }}>
      <APIProvider apiKey={import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
          center={position}
          zoom={9}
          mapId={import.meta.env.VITE_PUBLIC_MAP_ID}
          fullscreenControl={false}
          onClick={handleMapClick}
        >
          {markerCoordinatesArray[0] &&
            !createdRoute &&
            markerCoordinatesArray.map((marker, index) => {
              return <Marker key={index} position={marker} draggable={true} />;
            })}
        </Map>

        <DirectionsData
          markerCoordinatesArray={markerCoordinatesArray}
          createdRoute={createdRoute}
        />
      </APIProvider>
      <button onClick={handleRouteCreation}>Create Route</button>
    </div>
  );
}


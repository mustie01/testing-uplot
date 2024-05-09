import DynamicMap from "../../components/dynamicMap/dynamicMap";
import "./createRoutePage.css";
import { useState } from "react";
import Header from "../../components/headerComponent.jsx";
export default function CreateRoutePage() {
  const [routeIsCreated, setRouteIsCreated] = useState(false);
  const [changeOpeningPara, setChangeOpeningPara] = useState(true);
  const [markerCoordinatesArray, setMarkerCoordinatesArray] = useState([]);

  const handleReset = () => {
    setChangeOpeningPara(false);
    setMarkerCoordinatesArray([]);
  };

  const handleRouteCreation = () => {
    setRouteIsCreated(true);
  };

  const handleMapClick = (event) => {
    setMarkerCoordinatesArray((prev) => {
      return [
        ...prev,
        { lat: event.detail.latLng.lat, lng: event.detail.latLng.lng },
      ];
    });
  };
  return (
    <>
      <div className="headerForNow">
        <Header />
      </div>
      <div className="createRoute__OpeningParas">
        {changeOpeningPara ? (
          <h2>
            Welcome to U-PLOT! <br /> You will be able to plan routes simply and
            easily
          </h2>
        ) : (
          <h2>You have reset your route </h2>
        )}
        <br />
        <h2>
          Start by clicking your start and end points, then add any other stops
          along the way
        </h2>
      </div>
      <div className="createRoute__map">
        <DynamicMap
          routeIsCreated={routeIsCreated}
          handleMapClick={handleMapClick}
          markerCoordinatesArray={markerCoordinatesArray}
          setRouteIsCreated={setRouteIsCreated}
          setMarkerCoordinatesArray={setMarkerCoordinatesArray}
        />
      </div>
      {!routeIsCreated ? (
        <div className="createRoute__Buttons">
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleRouteCreation}> Create Route </button>
        </div>
      ) : null}
    </>
  );
}

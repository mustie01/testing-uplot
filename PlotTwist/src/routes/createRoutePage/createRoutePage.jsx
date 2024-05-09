import DynamicMap from "../../components/dynamicMap/dynamicMap";
import "./createRoutePage.css";
import { useState } from "react";

export default function CreateRoutePage() {
  const [routeIsCreated, setRouteIsCreated] = useState(false);
  const [changeOpeningPara, setChangeOpeningPara] = useState(true);


  const handleReset = () => {
    setChangeOpeningPara(false);
  }

  const handleRouteCreation = () => {
    setRouteIsCreated(true);
  };

  return (
    <>
      <div className="headerForNow">
        <h1>All things header (to be put in when header component is here)</h1>
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
        <DynamicMap routeIsCreated={routeIsCreated} />
      </div>
      <div className="createRoute__Buttons">
        <button onClick={handleReset}>
          Reset
        </button>
        <button onClick={handleRouteCreation}> Create Route </button>
      </div>
    </>
  );
}

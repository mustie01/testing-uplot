import CreateMap from "../../components/CreateMap.jsx";
import "./createRoutePage.css";
import { useState } from "react";

export default function CreateRoutePage() {
  const [changeOpeningPara, setChangeOpeningPara] = useState(true);
  return (
    <>
      <div className="headerForNow">
        <h1>All things header (to be put in when header component is here)</h1>
      </div>
      <div className="createRoute__OpeningParas">
        {changeOpeningPara ? (
          <h2>
            Welcome to U-PLOT! <br /> You’ll be able to plan routes simply and
            easily
          </h2>
        ) : (
          <h2>You’ve reset your route </h2>
        )}
        <br />
        <h2>
          Start by clicking your start and end points, then add any other stops
          along the way
        </h2>
      </div>
      <div className="createRoute__map">
        <CreateMap />
      </div>
      <div className="createRoute__Buttons">
        <button
          onClick={() => {
            setChangeOpeningPara(false);
          }}
        >
          {" "}
          Reset{" "}
        </button>
        <button> Create Route </button>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import "./directionsData.css";

export default function DirectionsData({
  markerCoordinatesArray,
  setMarkerCoordinatesArray,
  routeIsCreated,
  setRouteIsCreated,
}) {
  const map = useMap();

  const routesLibrary = useMapsLibrary("routes");

  const [directionsService, setDirectionsService] = useState();

  const [directionsRenderer, setDirectionsRenderer] = useState();

  const [directionsResult, setDirectionsResult] = useState();

  const [resetMadeMapClicked, setResetMadeMapClicked] = useState(false);

  const [routeName, setRouteName] = useState("");

  const handleInputChange = (event) => {
    setRouteName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const routeData = {
      name: routeName,
      data: routeName,
    };
    await saveNewRoute(routeData);
  };

  async function saveNewRoute(routeData) {
    try {
      const response = await fetch(
        "https://final-project-backend-1p20.onrender.com/newRoute",
        {
          method: "POST",
          body: JSON.stringify(routeData),
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      const data = await response.json();
      if (data) {
        console.log(data);
      } else {
        throw new Error("Error saving route");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!routesLibrary || !map) return;

    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map, resetMadeMapClicked]);

  useEffect(() => {
    if (
      !directionsService ||
      !directionsRenderer ||
      markerCoordinatesArray.length < 2 ||
      !routeIsCreated
    )
      return;

    directionsService
      .route({
        origin: {
          lat: markerCoordinatesArray[0]?.lat,
          lng: markerCoordinatesArray[0]?.lng,
        },
        destination: {
          lat: markerCoordinatesArray[1]?.lat,
          lng: markerCoordinatesArray[1]?.lng,
        },
        waypoints: markerCoordinatesArray[2]
          ? markerCoordinatesArray.slice(2).map((marker) => ({
              location: { lat: marker.lat, lng: marker.lng },
              stopover: true,
            }))
          : [],
        travelMode: "DRIVING",
        optimizeWaypoints: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        //setDirectionsResult(response);
        setDirectionsResult(directionsRenderer.getDirections());
      });
  }, [
    directionsService,
    directionsRenderer,
    markerCoordinatesArray,
    routeIsCreated,
  ]);

  // console.log(directionsResult);

  return (
    <>
      {routeIsCreated && directionsResult ? (
        <>
          <section className="routeData">
            <form className="routeData__form" onSubmit={handleSubmit}>
              <label className="routeData__label" htmlFor="routeName"></label>
              <input
                className="routeData__nameInput"
                type="text"
                id="routeName"
                name="routeName"
                onChange={handleInputChange}
                value={routeName}
                placeholder="Enter route name..."
              />
              <button className="routeData__saveRouteButton">Save Route</button>
            </form>
            <div className="routeData__information">
              <ol className="routeData__list">
                {directionsResult.routes[0].legs.map((element, index) => {
                  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                  return (
                    <li className="routeData__listItem" key={index}>
                      {`Marker ${alphabet[index]} => Marker ${
                        alphabet[index + 1]
                      }: `}
                      {element.duration?.text}
                    </li>
                  );
                })}
              </ol>
              <button
                className="routeData__resetRouteButton"
                onClick={() => {
                  setRouteIsCreated(!routeIsCreated);
                  setMarkerCoordinatesArray([]);
                  setResetMadeMapClicked(!resetMadeMapClicked);
                  directionsRenderer.setMap(null);
                  //setDirectionsResult(null);
                }}
              >
                Reset
              </button>
            </div>
          </section>
        </>
      ) : null}
    </>
    //   <div className="directions">
    //     <h1>Directions</h1>
    //     {directionsResult && (
    //       <div>
    //         <h2>{directionsResult.routes[0].summary}</h2>
    //         <p>
    //           {directionsResult.routes[0].legs[0].start_address.split(",")[0]} to{" "}
    //           {directionsResult.routes[0].legs[0].end_address.split(",")[0]}
    //         </p>
    //         <p>Distance: {directionsResult.routes[0].legs[0].distance?.text}</p>
    //         <p>Duration: {directionsResult.routes[0].legs[0].duration?.text}</p>
    //         <h2>Detailed Steps</h2>
    //         <ol>
    //           {directionsResult.routes[0].legs[0].steps.map((step, index) => (
    //             <li key={index}>{step.instructions.replaceAll("<b>", "")}</li>
    //           ))}
    //         </ol>
    //       </div>
    //     )}
    //   </div>
  );
}

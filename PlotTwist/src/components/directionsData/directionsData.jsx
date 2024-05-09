import { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

export default function Directions({ markerCoordinatesArray, routeIsCreated }) {
  const map = useMap();

  const routesLibrary = useMapsLibrary("routes");

  const [directionsService, setDirectionsService] = useState();

  const [directionsRenderer, setDirectionsRenderer] = useState();

  const [directionsResult, setDirectionsResult] = useState();

  useEffect(() => {
    if (!routesLibrary || !map) return;

    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

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

        setDirectionsResult(directionsRenderer.getDirections());
      });
  }, [
    directionsService,
    directionsRenderer,
    markerCoordinatesArray,
    routeIsCreated,
  ]);

  console.log(directionsResult);

  return (
    <>
      {routeIsCreated && directionsResult ? (
        <>
          <section className="createRoute__panel">
            <div className="createRoute__panelETABar">
              <ol>
                <li>Start</li>
                {directionsResult.routes[0].legs.map((element, index) => {
                  return (
                    <>
                      <li key={index}>Duration: {element.duration?.text}</li>
                    </>
                  );
                })}
              </ol>
            </div>

            <div className="createRoute__panel__actionButtons">
              <button>Export Route</button>
              <button>Save Route</button>
              <button>Reset</button>
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

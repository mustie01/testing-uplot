import "./CreateMap.css";
import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";

export default function CreateMap() {
  //marker coordinates array is added based on a click on the map - takes the latitute and longitutde from the event
  const [markerCoordinatesArray, setMarkerCoordinatesArray] = useState([]);
  //look at changing this to be the users co-ords or if not their postcode if they decline our stalking
  const position = { lat: 52.4823, lng: -1.89 };

  //this function adds the co-ordinate fromt he click event into the markerCoordinates array (from the above line)
  //so guess the markerCoordinates array is an array of objects??
  const handleMapClick = (event) => {
    setMarkerCoordinatesArray((prev) => {
      return [
        ...prev,
        //adds in the latitude and longitutde as an object into the array
        { lat: event.detail.latLng.lat, lng: event.detail.latLng.lng },
      ];
    });
  };

  return (
    <div className="CreateMap__Map">
      {/* need to add an API key for this to work */}
      <APIProvider apiKey={import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY}>
        {/* center by positiion, the variable above, currently set to BHAM am to make stalker/userInput */}
        <Map
          center={position}
          zoom={9}
          // not sure what mapID is.. will have to look this up
          mapId={import.meta.env.VITE_PUBLIC_MAP_ID}
          fullscreenControl={false}
          onClick={handleMapClick}
        ></Map>
        {/* see function below for more info on directions component */}
        <Directions markerCoordinatesArray={markerCoordinatesArray} />
      </APIProvider>
    </div>
  );
}

function Directions({ markerCoordinatesArray }) {
  //useMap essentially makes the map
  const map = useMap();
  //routes library, looks up the different routes and things from routes: google.maps.RoutesLibrary;
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [directionsResult, setDirectionsResult] = useState();
  //unsure if no routes library or no maps - then setDirectionsService and Rendere to something new?
  //looks for changes in routes library and map
  useEffect(() => {
    if (!routesLibrary || !map) return;
    //this makes a new direction basically https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/reference/library-interfaces#RoutesLibrary
    setDirectionsService(new routesLibrary.DirectionsService());
    //this renders the directions made by the directions service onto map to display the directions
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  //this is checking if there is nodirections made or rendered then MAKE SOME 💃
  useEffect(() => {
    if (
      !directionsService ||
      !directionsRenderer ||
      markerCoordinatesArray.length < 2
    )
      return;
    directionsService
      .route({
        //origin of the route is the first maker clicked basically
        origin: {
          lat: markerCoordinatesArray[0]?.lat,
          lng: markerCoordinatesArray[0]?.lng,
        },
        //destination is the second marker clicked
        destination: {
          lat: markerCoordinatesArray[1]?.lat,
          lng: markerCoordinatesArray[1]?.lng,
        },
        //waypoints = any markers in between
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
        //set directions on the render with the result / route - apparently it should automatically update
        directionsRenderer.setDirections(response);
        //set directions result to be the getDirections on the directionsRenderer which is the routes library (link above)
        setDirectionsResult(directionsRenderer.getDirections());
      });
    // return () => directionsRenderer.setMap(null); (this was not me, dunno what this about apparently set map does something to the map, but not sure what)
  }, [directionsService, directionsRenderer, markerCoordinatesArray]);

  console.log(directionsResult);

  return (
    <div className="directions">
      <h1>Directions</h1>

      {/* this outlines the directions from the above function - will try neaten */}
      {directionsResult && (
        <div>
          <h2>{directionsResult.routes[0].summary}</h2>
          <p>
            {directionsResult.routes[0].legs[0].start_address.split(",")[0]} to{" "}
            {directionsResult.routes[0].legs[0].end_address.split(",")[0]}
          </p>
          <p>Distance: {directionsResult.routes[0].legs[0].distance?.text}</p>
          <p>Duration: {directionsResult.routes[0].legs[0].duration?.text}</p>
          <h2>Detailed Steps</h2>
          <ol>
            {directionsResult.routes[0].legs[0].steps.map((step, index) => (
              <li key={index}>{step.instructions.replaceAll("<b>", "")}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

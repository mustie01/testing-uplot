import Header from "../../components/headerComponent";
import { useEffect, useState } from "react";
import "./savedRoutes.css";
export default function SavedRoutesPage() {
  const [routes, setRoutes] = useState([]);

  //To avoid another API call we are using this function to call at the end to show the list.
  const deleteRoute = async (e) => {
    // the value of the delete button has been set to route.id
    // hence e.target.value will be route.id
    console.log(e.target.value);
    const id = e.target.value;
    const response = await fetch(
      `https://final-project-backend-lp20.onrender.com/delete/${id}`,
      { method: "DELETE" }
    );
    const data = await response.json();
    console.log(data);
    //This function is called after the deletion to re-render on page load, this will populate the routes
    getAllRoutes();
  };
  const getAllRoutes = async () => {
    //This function fetches all the routes form the backend.
    console.log("Fetching routes...");
    const response = await fetch(
      "https://final-project-backend-lp20.onrender.com/routes"
    );
    //changes the data into json so we can display it on the screen
    const data = await response.json();
    //the fetch routes are then store in routes state by using the setRoutes function.

    setRoutes(data.payload);
    console.log(data);
  };

  useEffect(() => {
    // this ensures that getAllRoutes is called only once when the component is first rendered.
    getAllRoutes();
  }, []);

  return (
    <div>
      <Header />
      {/* table with .map - show name and button */}
      <table className="savedRoutesTable">
        <tbody>
          <tr>
            <th>Route Name</th>
          </tr>
          {routes.map((route, index) => {
            return (
              <tr key={index}>
                <td>{route.route_name}</td>
                <td>
                  <button className="savedRoutesTable__retrieveRouteButton">
                    Retrieve Route
                  </button>
                </td>
                <td>
                  <button
                    className="savedRoutesTable__deleteRouteButton"
                    value={route.id}
                    onClick={deleteRoute}
                  >
                    Delete Button
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// opening para graph

import Header from "../../components/headerComponent";
import { useEffect, useState } from "react";

export default function SavedRoutesPage() {
  const [routes, setRoutes] = useState([]);

  //Avoiding second API call
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
    getAllRoutes();
  };
  const getAllRoutes = async () => {
    console.log("Fetching routes...");
    const response = await fetch(
      "https://final-project-backend-lp20.onrender.com/routes"
    );
    const data = await response.json();
    setRoutes(data.payload);
    console.log(data);
  };
  // on page load, this will populate the routes
  // dependency array is empty which is why it's on page load
  useEffect(() => {
    getAllRoutes();
  }, []);

  return (
    <div>
      <Header />
      {/* table with .map - show name and button */}
      <table>
        <tbody>
          <tr>
            <th>Route Name</th>
            <th>Button</th>
          </tr>
          {routes.map((route, index) => {
            return (
              <tr key={index}>
                <td>{route.route_name}</td>
                <td>
                  <button>Retrieve Route</button>
                </td>
                <td>
                  <button value={route.id} onClick={deleteRoute}>
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

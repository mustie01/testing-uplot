import Header from "../../components/headerComponent";

export default function SavedRoutesPage() {
  // dummy data
  const data = [
    {
      name: "Test Route 1",
      data: "Test Data 1",
    },
    {
      name: "Test Route 2",
      data: "Test Data 2",
    },
    {
      name: "Test Route 3",
      data: "Test Data 3",
    },
  ];

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
          {data.map((route, index) => {
            return (
              <tr key={index}>
                <td>{route.name}</td>
                <td>
                  <button>Retrieve Route</button>
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

import { Link } from "react-router-dom";

export default function Root() {
    return (
      <>
          <nav>
            <ul>
              <li>
                <Link to={`/hello`}>Your Name</Link>
              </li>
              <li>
                {/* <Link to={`/contacts/2`}>Your Friend</Link> */}
              </li>
            </ul>
          </nav>
      </>
    );
  }
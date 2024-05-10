import { Link, createRoutesFromChildren } from "react-router-dom";
import HomePageBG from "../../assets/HomePageBG.png";
import FullLogo from "../../assets/FullLogo.png";
import "./homePage.css";
export default function HomePage() {
  return (
    <>
      <div
        className="container-full-length"
        style={{
          backgroundImage: `url(${HomePageBG})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container-full-length__container">
          <div className=" logo">
            <img id="logo-img" src={FullLogo}></img>
          </div>
          <div className="buttons">
            <Link to={"saved-routes"}>
              <button>My Saved Routes</button>
            </Link>
            <Link to={"create-route"}>
              <button>Create A Route</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

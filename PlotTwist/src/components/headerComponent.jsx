import { useState } from "react";
import "./headerComponent.css";
import logo from "../assets/logo.png";
import menuicon from "../assets/icons8-menu (1).svg";
import homeicon from "../assets/home-icon.svg";
import help from "../assets/help.png";
import createroute from "../assets/create-route.png";
import savedroutes from "../assets/saved-routes.png";
import { Link } from "react-router-dom";

export default function Header() {
  //state for the burger bar - so when true, it is showing
  const [showMenuBar, setShowMenuBar] = useState(false);

  const menuBarOptions = [
    { name: "HOME", image: { homeicon }, link: "/" },
    { name: "CREATE ROUTE", image: { createroute }, link: "/create-route" },
    { name: "SAVED ROUTES", image: { savedroutes }, link: "/saved-routes" },
    { name: "HELP", image: { help }, link: "" },
  ];
  return (
    <>
      <div className="top-bar">
        <div className="logo-container">
          <Link to={"/"}>
            <img id="logo" src={logo} alt="logo"></img>
          </Link>
        </div>

        <div className="menu-icon-container">
          <button
            className="menu-button"
            onClick={() => {
              setShowMenuBar(!showMenuBar);
              //when click on this, we want the burger menu to show...
              console.log("hello");
            }}
          >
            <img id="menu-icon" src={menuicon} alt="menu-icon"></img>
          </button>
          {showMenuBar && (
            <div className="menu-options">
              <button
                className="X"
                onClick={() => {
                  setShowMenuBar(false);
                }}
              >
                X
              </button>
              {menuBarOptions.map((element, index) => (
                <div className="menu-options-buttons" key={index}>
                  {element.image.length > 2 && (
                    <img src={element.image} alt={element.name} />
                  )}
                  <Link to={element.link}>
                    <button
                      key={index}
                      className={element.name}
                      onClick={element.whenClick}
                    >
                      {element.name}
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

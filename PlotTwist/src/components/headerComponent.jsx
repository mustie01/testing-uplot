import { useState } from "react";
import "./headerComponent.css";
import logo from "../assets/logo.png";

export default function Header() {
  //state for the burger bar - so when true, it is showing
  const [showMenuBar, setShowMenuBar] = useState(false);

  const menuBarOptions = [
    { name: "HOME", image: "/home-icon.svg", link: "" },
    { name: "CREATE ROUTE", image: {}, link: "" },
    { name: "SAVED ROUTES", image: "/saved-routes.png", link: "" },
    { name: "HELP", image: "/help.png", link: "" },
  ];
  return (
    <>
      <div className="top-bar">
        <div className="logo-container">
          <img id="logo" src={logo} alt="logo"></img>
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
            <img
              id="menu-icon"
              src="/icons8-menu (1).svg"
              alt="menu-icon"
            ></img>
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
                  <button
                    key={index}
                    className={element.name}
                    onClick={element.whenClick}
                  >
                    {element.name}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

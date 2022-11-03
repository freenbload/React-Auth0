import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../assets/logo.svg";
import welcome from "../assets/welcome.webp";

const Hero = () => {
  const { isAuthenticated, user } = useAuth0();

  if (isAuthenticated)
    return (
      <>
        <div
          className="text-center hero my-5"
          style={{
            height: "30vh",
            backgroundImage: `url(${welcome})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="text-center hero my-5">
          <h1 className="mb-4">{user.name}</h1>
        </div>
      </>
    );

  return (
    <div className="text-center hero my-5">
      <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
      <h1 className="mb-4">
        React.js Authenticatoin and Authorization Project
      </h1>

      <p className="lead">
        This small application demonstrates authentication and RBAC for an SPA,
        using Auth0, JWT, Node.js, Express.js and React.js
      </p>
    </div>
  );
};
export default Hero;

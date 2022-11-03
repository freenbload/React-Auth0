import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LogoutButton = () => {
  const { logout } = useAuth0();

  console.log("LogoutButton entered:");

  return (
    <Button
      onClick={() => logout()}
      id="qsLogoutBtn"
      variant="danger"
      className="btn-margin"
    >
      Log out
    </Button>
  );
};

export default LogoutButton;

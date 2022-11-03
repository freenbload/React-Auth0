import React, { useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { Highlight, Loading } from "../components";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";

export const ExternalApi = () => {
  const [message, setMessage] = useState("");
  const { getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/public-message");
      const responseData = await response.json();

      setMessage(responseData);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const callSecureUserApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log("token", token);
      const response = await fetch(`http://localhost:5000/api/user-message`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json();

      setMessage(responseData);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const callSecureAdminApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log("token", token);
      const response = await fetch(`http://localhost:5000/api/admin-message`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        const responseData = await response.json();

        setMessage(responseData);
      } else if (response.status === 403) {
        const msg = "Error: you are not authorized to access this data";
        setMessage(msg);
      } else {
        const msg = "Error: " + response.status + " " + response.statusText;
        setMessage(msg);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Container className="mb-5">
      <h1>External API</h1>
      <p>
        You use will use a button to call an external API using an access token,
        and the API will validate it using the API's audience value.{" "}
        <strong>This route should be private</strong>.
      </p>
      <ButtonGroup>
        <Button
          onClick={() => callApi()}
          color="primary"
          className="mt-5 button"
        >
          Get Public Message
        </Button>
        <Button
          onClick={() => callSecureUserApi()}
          color="primary"
          className="mt-5 button"
        >
          Get User Message
        </Button>
        <Button
          onClick={() => callSecureAdminApi()}
          color="primary"
          className="mt-5 button"
        >
          Get Admin Message
        </Button>
      </ButtonGroup>

      {message && (
        <div className="mt-5">
          <h6 className="muted">Result</h6>
          <Highlight language="json">
            {JSON.stringify(message, null, 2)}
          </Highlight>
        </div>
      )}
    </Container>
  );
};

export default withAuthenticationRequired(ExternalApi, {
  onRedirecting: () => <Loading />,
});

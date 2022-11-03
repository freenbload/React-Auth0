import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Highlight } from "../components";

export const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) return <h2>Please login first</h2>;

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounder-circle img-fluid profile-picutre mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
        </Col>
      </Row>
      <Row>
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
      </Row>
    </Container>
  );
};

export default Profile;

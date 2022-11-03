import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { NavBar, Footer, Loading, PrivateRoute } from "./components";
import { Home, Profile, ExternalApi } from "./views";
import toast from "react-hot-toast";
import "./app.css";

const App = () => {
  const { isLoading } = useAuth0();
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    console.log("useEffect entered", isAuthenticated);
    if (isAuthenticated) toast.success("You are logged in");
    else toast.success("You are logged out");
  }, [isAuthenticated]);

  if (isLoading) return <Loading />;

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <Container className="flex-grow-1 mt-5">
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/external-api" component={ExternalApi} />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
};

export default App;

import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import Auth0PrpviderWithHistory from "./auth0PrpviderWithHistory";

ReactDOM.render(
  <Router>
    <Auth0PrpviderWithHistory>
      <App />
    </Auth0PrpviderWithHistory>
  </Router>,
  document.getElementById("root")
);

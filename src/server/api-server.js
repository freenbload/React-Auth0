const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const { resolve } = require("path");
const jwtAuthz = require("express-jwt-authz");

require("dotenv").config({
  path: resolve(".env"),
});

const app = express();

const port = process.env.API_PORT;
const appOrigin = process.env.APP_ORIGIN;
const audience = process.env.AUTH0_AUDIENCE;
const issuer = process.env.AUTH0_ISSUER;

if (!issuer || !audience) {
  throw new Error("Please make sure that .env is in place and populated");
}

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${issuer}.well-known/jwks.json`,
  }),
  requestProperty: "user",
  audience: audience,
  issuer: issuer,
  algorithms: ["RS256"],
});

const checkPermissionAdmin = jwtAuthz(
  ["read:messages", "read:report", "read:users"],
  {
    customScopeKey: "permissions",
    // customUserKey: "auth",
    checkAllScopes: true,
  }
);

const checkPermissionUser = jwtAuthz(["read:messages"], {
  customScopeKey: "permissions",
  // customUserKey: "auth",
  checkAllScopes: false,
});

app.get("/api/public-message", (req, res) => {
  res.send({
    msg: "The API doesn't require an access token to share this message.",
  });
});

app.get("/api/user-message", checkJwt, checkPermissionUser, (req, res) => {
  console.log(req.user);

  res.send({
    msg:
      "The user API successfully validated your access token and roles: " +
      req.user.permissions,
  });
});

app.get("/api/admin-message", checkJwt, checkPermissionAdmin, (req, res) => {
  res.send({
    msg:
      "The admin API successfully validated your access token.and role: " +
      req.user.permissions,
  });
});

app.listen(port, () => console.log(`API Server listening on port ${port}`));

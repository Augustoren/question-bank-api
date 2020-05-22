const express = require("express");
const app = express();
const config = require("config");

const AuthRoutes = require("./routes/AuthRoutes");
const UserRoutes = require("./routes/UserRoutes");

if (!config.get("JWTPK")) {
  console.error("FATAL ERROR: No JWT secret key is not defined!");
  process.exit(1);
}

app.use(express.json());
app.use(AuthRoutes);
app.use(UserRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

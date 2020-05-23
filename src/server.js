const express = require("express");
const app = express();
const config = require("config");

const AuthRoutes = require("./routes/AuthRoutes");
const UserRoutes = require("./routes/UserRoutes");
const QuestionRoutes = require("./routes/QuestionRoutes");

if (!config.get("JWTPK")) {
  console.error("FATAL ERROR: JWT secret key is not defined!");
  process.exit(1);
}

app.use(express.json());
app.use(AuthRoutes);
app.use(UserRoutes);
app.use(QuestionRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

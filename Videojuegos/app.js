const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const gamesRoutes = require("./routes/games-routes");
const HttpError = require("./models/http-error");

app.use("/api/videogames", gamesRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Ruta no exite", 404);
  throw error;
});
// manejo de errores

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next();
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || "Error desconocido",
  });
});

app.listen(3000);

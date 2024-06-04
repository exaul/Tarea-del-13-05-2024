const express = require("express");
const ruta = express.Router();

const gamesController = require("../controllers/videogame-controllers");

ruta.get("/", gamesController.getAllGames);
ruta.get("/:pid", gamesController.getidGames);
ruta.get("/plataforma/:uid", gamesController.getNameGames);
ruta.post("/", gamesController.saveGames)
ruta.patch("/:pid", gamesController.updateGames);
ruta.delete("/:pid", gamesController.deletedGames);

module.exports = ruta;
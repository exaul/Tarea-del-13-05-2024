const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");

let Videogame = [
  {
    id: "1",
    nombre: "Super Mario Bros.",
    plataforma: "NES",
  },
  {
    id: "2",
    nombre: "Pac-Man",
    plataforma: "Arcade",
  },
];

const getAllGames = (req, res, next) => {
  res.json({ games: Videogame });
};

const getidGames = (req, res, next) => {
  const games = Videogame.find((p) => {
    return p.id === req.params.pid;
  });
  if (!games) {
    const error = new HttpError("Juego no existe para el id especificado");
    error.code = 404;
    next(error);
  } else {
    res.json({ games });
  }
};

const getNameGames = (req, res, next) => {
  const games = Videogame.find((p) => {
    return p.plataforma === req.params.uid;
  });
  if (!games) {
    const error = new HttpError(
      "Juego no existe para la plataforma especificada.",
      404
    );
    throw error;
  }
  res.json({ games });
};

const saveGames = (req, res, next) => {
  const { nombre, plataforma } = req.body;
  const id = uuidv4();
  const createdgame = { id, nombre, plataforma };
  Videogame.push(createdgame);
  res.status(201).json({ games: createdgame });
};

const updateGames = (req, res, next) => {
  const { nombre, plataforma } = req.body;
  const gameid = req.params.pid;

  const updategames = { ...Videogame.find((p) => p.id === gameid) };
  const GamesIndex = Videogame.findIndex((p) => p.id === gameid);
  updategames.nombre = nombre;
  updategames.plataforma = plataforma;
  Videogame[GamesIndex] = Videogame;

  res.status(200).json({ games: updategames });
};

const deletedGames = (req, res, next) => {
  const gameid = req.params.pid;
  Videogame = Videogame.filter((p) => p.id !== gameid);
  res.status(200).json({ message: "Juego borrada" });
};

exports.getAllGames = getAllGames;
exports.getidGames = getidGames;
exports.getNameGames = getNameGames;
exports.saveGames = saveGames;
exports.updateGames = updateGames;
exports.deletedGames = deletedGames;

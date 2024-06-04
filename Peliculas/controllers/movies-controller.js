const HttpError = require("../models/http-error.js");
const { v4: uuidv4 } = require("uuid");

let MovieCollection = [
  {
    id: "1",
    titulo: "Sueños de Libertad",
    director: "Frank Darabont",
    año: 1994,
    genero: "Drama",
  },
  {
    id: "2",
    titulo: "El Padrino",
    director: "Francis Ford Coppola",
    año: 1972,
    genero: "Crimen",
  },
  {
    id: "3",
    titulo: "El Caballero Oscuro",
    director: "Christopher Nolan",
    año: 2008,
    genero: "Acción",
  },
  {
    id: "4",
    titulo: "Tiempos Violentos",
    director: "Quentin Tarantino",
    año: 1994,
    genero: "Crimen",
  },
  {
    id: "5",
    titulo: "Forrest Gump",
    director: "Robert Zemeckis",
    año: 1994,
    genero: "Drama",
  },
];

const getAllMovies = (req, res, next) => {
  res.json({ movies: MovieCollection });
};

const getIdMovies = (req, res, next) => {
  const movie = MovieCollection.find((i) => i.id === req.params.id);
  if (!movie) {
    const error = new HttpError("El id no existe");
    error.code = 404;
  } else {
    res.json({ movie });
  }
};

const getTitleMovie = (req, res, next) => {
  const movies = MovieCollection.find((p) => {
    return p.titulo === req.params.tid;
  });
  if (!movies) {
    const error = new HttpError("Titulo no existe ", 404);
    throw error;
  }
  res.json({ movies });
};

const saveMovie = (req, res, next) => {
  const { titulo, director, año, genero } = req.body;
  const id = uuidv4();
  const createdMovie = { id, titulo, director, año, genero };
  MovieCollection.push(createdMovie);
  res.status(201).json({ movie: createdMovie });
};
const updateMovie = (req, res, next) => {
  const { titulo, director, año, genero } = req.body;
  const movieId = req.params.uid;

  const updateMovie = { ...MovieCollection.find((u) => u.id === movieId) };
  const movieIndex = MovieCollection.findIndex((u) => u.id === movieId);
  updateMovie.titulo = titulo;
  updateMovie.director = director;
  updateMovie.año = año;
  updateMovie.genero = genero;
  MovieCollection[movieIndex] = updateMovie;

  res.status(200).json({ movie: updateMovie });
};
const deleteMovie = (req, res, next) => {
  const movieid = req.params.did;
  MovieCollection = MovieCollection.filter((d) => d.id !== movieid);
  res.status(200).json({ message: "Pelicula Borrada" });
};

exports.getAllMovies = getAllMovies;
exports.getIdMovies = getIdMovies;
exports.getTitleMovie = getTitleMovie;
exports.saveMovie = saveMovie;
exports.updateMovie = updateMovie;
exports.deleteMovie = deleteMovie;

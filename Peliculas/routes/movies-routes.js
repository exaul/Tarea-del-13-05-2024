const express = require("express");
const router = express.Router();

const moviesController = require("../controllers/movies-controller");

router.get("/", moviesController.getAllMovies);

router.get("/:id", moviesController.getIdMovies);

router.get("/titulo/:tid", moviesController.getTitleMovie);

router.post("/", moviesController.saveMovie);

router.patch("/:uid", moviesController.updateMovie);

router.delete("/:did", moviesController.deleteMovie);

module.exports = router;

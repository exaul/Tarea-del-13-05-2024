const express = require("express");
const router = express.Router();

const drinksController = require("../controllers/hotDrinks-controllers");

router.get("/", drinksController.getAllDrinks);

router.get("/:pid", drinksController.getidDrinks);

router.get("/ingredientes/:uid", drinksController.getNameDrinks);

router.post("/", drinksController.saveDrinks);

router.patch("/:pid", drinksController.updateDrinks);

router.delete("/:pid", drinksController.deletedrinks);

module.exports = router;

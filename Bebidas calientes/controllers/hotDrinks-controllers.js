const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");
let HotDrinks = [
  {
    id: "1",
    nombre: "Café",
    ingredientes: "Granos de café",
  },
  {
    id: "2",
    nombre: "Té",
    ingredientes: "Hojas de té",
  },
];

const getAllDrinks = (req, res, next) => {
  res.json({ drinks: HotDrinks });
};

const getidDrinks = (req, res, next) => {
  const drinks = HotDrinks.find((p) => {
    return p.id === req.params.pid;
  });
  if (!drinks) {
    const error = new HttpError("Bebida no existe para el id especificado");
    error.code = 404;
    next(error);
  } else {
    res.json({ drinks });
  }
};
const getNameDrinks = (req, res, next) => {
  const drinks = HotDrinks.find((p) => {
    return p.ingredientes === req.params.uid;
  });
  if (!drinks) {
    const error = new HttpError(
      "bebida no existe para el ingrediente especificado.",
      404
    );
    throw error;
  }
  res.json({ drinks });
};
const saveDrinks = (req, res, next) => {
  const { nombre, ingredientes } = req.body;
  const id = uuidv4();
  const createddrink = { id, nombre, ingredientes };
  HotDrinks.push(createddrink);
  res.status(201).json({ drinks: createddrink });
};

const updateDrinks = (req, res, next) => {
  const { nombre , ingredientes } = req.body;
  const drinksid = req.params.pid;

  const updatedrinks = { ...HotDrinks.find((p) => p.id === drinksid) };
  const drinksIndex = HotDrinks.findIndex((p) => p.id === drinksid);
  updatedrinks.nombre = nombre;
  updatedrinks.ingredientes = ingredientes;
  HotDrinks[drinksIndex] = HotDrinks;

  res.status(200).json({ drinks: updatedrinks });
};
const deletedrinks = (req, res, next) => {
  const drinksid = req.params.pid;
   HotDrinks= HotDrinks.filter((p) => p.id !== drinksid);
  res.status(200).json({ message: "bebida borrada" });
};
exports.getAllDrinks = getAllDrinks;
exports.getidDrinks = getidDrinks;
exports.getNameDrinks = getNameDrinks;
exports.saveDrinks = saveDrinks;
exports.updateDrinks = updateDrinks;
exports.deletedrinks = deletedrinks;

const express = require("express");

const router = express.Router();

const CoffeeModel = require("../models/Coffee.model");

router.post("/create-coffee", async (req, res) => {
  try {
    const createCoffee = await CoffeeModel.create(req.body);

    return res.status(201).json(createCoffee);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

router.get("/all-coffees", async (req, res) => {
  try {
    const allCoffees = await CoffeeModel.find({});

    return res.status(201).json(allCoffees);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

router.get("/coffee/:id", async (req, res) => {
  try {
    // Pensar neste espaço como algo livre para criar a nossa lógica de acordo com a nossa necessidade
    const { id } = req.params;
    const coffee = await CoffeeModel.findOne({ _id: id });

    return res.status(200).json(coffee);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

router.patch("/edit-coffee/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCoffee = await CoffeeModel.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      // colocamos esse para retornar o valor atualizado pois sem ele só atualiza no banco de dados
      // colocar o runValidators para validar o conteudo
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedCoffee);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

router.delete("/delete-coffee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCoffee = await CoffeeModel.deleteOne({ _id: id });

    return res.status(200).json(deleteCoffee);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

module.exports = router;

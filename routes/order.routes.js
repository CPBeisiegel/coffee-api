const express = require("express");
const router = express.Router();

const OrderModel = require("../models/Order.model");
const CoffeeModel = require("../models/Coffee.model");

router.post("/create-order", async (req, res) => {
  try {
    const coffee = await CoffeeModel.findOne({ _id: req.body.coffee });
    // processo de criar a nossa order atualizando a orderList dentro do coffee

    if (coffee.stock - req.body.quantityPurchase < 0) {
      return res
        .status(400)
        .json({ msg: `Só temos ${coffee.stock} unidades.` });
    }

    const createdOrder = await OrderModel.create({
      ...req.body,
      totalAmount: coffee.price * req.body.quantityPurchase,
    });

    await CoffeeModel.updateOne(
      { _id: req.body.coffee },
      {
        /* Método para dar um push no array  */
        $push: { orderList: createdOrder._id },
        stock: coffee.stock - createdOrder.quantityPurchase,
      },
      { new: true, runValidators: true }
    );

    return res.status(201).json({ createdOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

// aqui vamos pegar o id da order
router.get("/order-details/:orderId", async (req, res) => {
  try {
    if (!req.params.orderId) {
      return res
        .status(400)
        .json({ msg: "Requisição sem ID da ordem na rota" });
    }

    const foundedOrder = await OrderModel.findOne({
      _id: req.params.orderId,
    }).populate("coffee");
    // o populate serve para pergarmos as informações do cafe que foi pedido pelo usuário nesta order

    return res.status(200).json(foundedOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

router.delete("/delete-order/:orderId", async (req, res) => {
  try {
    const order = await OrderModel.findOne({ _id: req.params.orderId });

    console.log(order);
    if (!order) {
      return res.status(400).json({ msg: "Ordem não encontrada!" });
    }

    const deletedOrder = await OrderModel.findOneAndUpdate(
      { _id: req.params.orderId },
      { isDeleted: true, deletedDate: Date.now() },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ msg: "Ok" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

module.exports = router;

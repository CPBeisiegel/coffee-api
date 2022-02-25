const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  coffee: { type: mongoose.Schema.Types.ObjectId, ref: "Coffee" },
  quantityPurchase: { type: Number, required: true, default: 1 },
  totalAmount: { type: Number },
  date: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  deletedDate: { type: Date },
});

module.exports = mongoose.model("Order", orderSchema);

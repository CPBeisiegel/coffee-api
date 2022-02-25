const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// funtion para limitar o item com array
function arrayLimit(array) {
  return array.length <= 10;
}

const coffeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 1,
    trim: true,
  },
  roast: {
    type: String,
    enum: ["Blond Roast", "Medium Roast", "Dark Roast"],
    required: true,
  },
  storageType: {
    type: String,
    enum: ["Beans", "Grinded"],
    required: true,
    default: "Beans",
  },
  // Como limitar a quantidade de elementos no array atravás do validate e a função que criamos
  sensoryNotes: {
    type: [{ type: String, minLength: 1, maxLength: 64 }],
    validate: [arrayLimit, "Array maior que o esperado."],
  },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  // usamos o match junto com um regex(expressão regular) para verificar se o producer passou o instagram
  producerInstagram: { type: String, maxLength: 64, match: /^[@]/gm },
  acidity: { type: Number, min: 1, max: 5, default: 3 },
  sweetness: { type: Number, min: 1, max: 5, default: 3 },
  bitterness: { type: Number, min: 1, max: 5, default: 3 },

  orderList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

module.exports = mongoose.model("Coffee", coffeeSchema);

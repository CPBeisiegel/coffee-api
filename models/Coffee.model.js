const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coffeeSchema = new Schema({
    name: {type: String, 
           required: true,
           unique: true, 
           minLength: 1, 
           trim: true
        },
    roast: {type: String,
            enum: ["Blond Roast","Medium Roast","Dark Roast"], 
            required: true
        },
    storageType: {
        type: String, 
        enum: ["Beans", "Grinded"],
        required: true, 
        default: "Beans"
        },
    // Como limitar a quantidade de elementos no array
    sensoryNotes: [{type: String, minLength: 1, maxLength: 64}],
    acidity: {type: Number, min: 1, max: 5, default: 3},
    sweetness: {type: Number, min: 1, max: 5, default: 3},
    bitterness: {type: Number, min: 1, max: 5, default: 3},


});







module.exports = mongoose.model("Coffee", coffeeSchema )
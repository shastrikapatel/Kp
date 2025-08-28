const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
});

module.exports = mongoose.model("Item", itemSchema);

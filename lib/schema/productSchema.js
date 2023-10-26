const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  Product: {
    type: String,
    required: true,
  },
  Des: {
    type: String,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  Rate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.ProductSchema || mongoose.model("ProductSchema", productSchema);

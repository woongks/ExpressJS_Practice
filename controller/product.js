import productModel from "../models/Product.js";

const createProduct = (req, res) => {
  productModel.create();
};

export { createProduct };

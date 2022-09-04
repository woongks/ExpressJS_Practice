import productModel from "../models/Product.js";

const createProduct = (req, res, next) => {
  const createdProduct = productModel.create(req.body);
  res.status(201).json(createdProduct);
};

export default createProduct;

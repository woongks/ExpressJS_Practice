import productModel from "../models/Product.js";

const createProduct = async (req, res, next) => {
  try {
    const createdProduct = await productModel.create(req.body);
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error); //express에서 비동기로 에러 처리를 하려면 next()를 쓴다.
  }
};

const getProducts = async (req, res, next) => {
  try {
    const allProducts = await productModel.find({});
    res.status(200).json(allProducts);
  } catch (error) {
    next(error);
  }
};
export default { createProduct, getProducts };

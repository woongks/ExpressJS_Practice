// product controller 존재하는지 확인
import * as productController from "../../controller/product.js";
import productModel from "../../models/Product.js";
import { jest } from "@jest/globals";

productModel.create = jest.fn();

describe("Product Controller Create", () => {
  it("should have a createProduct Function", () => {
    expect(typeof productController.createProduct).toBe("function");
  });

  it("should call ProductModel.create", () => {
    productController.createProduct();
    expect(productModel.create).toBeCalled();
  });
});

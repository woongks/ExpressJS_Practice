// product controller 존재하는지 확인
import * as productController from "../../controller/product.js";
import productModel from "../../models/Product.js";
import { jest } from "@jest/globals";
import { createRequest, createResponse } from "node-mocks-http";
import newProduct from "./../data/new-product.json";
import Product from "../../models/Product.js";

productModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
  // 공통적으로 수행하는 코드
  req = createRequest();
  res = createResponse();
  next = null;
});
describe("Product Controller Create", () => {
  beforeEach(() => {
    req.body = newProduct;
  });
  it("should have a createProduct Function", () => {
    expect(typeof productController.createProduct).toBe("function");
  });

  it("should call ProductModel.create", () => {
    productController.createProduct(req, res, next);
    expect(productModel.create).toBeCalledWith(newProduct);
  });

  it("should return 201 response code", () => {
    productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy(); // 함수값이 리턴되었는지의 참 여부
  });

  it("should return json body in response", () => {
    Product.create.mockReturnValue(newProduct);
    productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });
});

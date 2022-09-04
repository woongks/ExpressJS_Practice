// product controller 존재하는지 확인
import productController from "../../controller/product.js";
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
  next = jest.fn(); // 어떤 함수가 들어오는지 watch 하기 위해서
});
describe("Product Controller Create", () => {
  beforeEach(() => {
    req.body = newProduct;
  });
  it("should have a createProduct Function", () => {
    // 함수가 맞는지 확인
    expect(typeof productController.createProduct).toBe("function");
  });

  it("should call ProductModel.create", async () => {
    // create 메서드를 호출하는지 확인
    await productController.createProduct(req, res, next);
    expect(productModel.create).toBeCalledWith(newProduct);
  });

  it("should return 201 response code", async () => {
    // 201 상태 코드 반환하는지 확인
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy(); // 함수값이 리턴되었는지의 참 여부
  });

  it("should return json body in response", async () => {
    // 응답으로 json 타입이 반환되는지
    Product.create.mockReturnValue(newProduct);
    await productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "description property missing" };
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.create.mockReturnValue(rejectedPromise); // 원래 mongoDB에서 처리하는 에러 메시지를 mock 함수로 대체
    await productController.createProduct(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

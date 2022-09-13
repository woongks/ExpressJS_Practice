// product controller 존재하는지 확인
import productController from "../../controller/product.js";
import productModel from "../../models/Product.js";
import { jest } from "@jest/globals";
import { createRequest, createResponse } from "node-mocks-http";
import newProduct from "./../data/new-product.json";
import allProducts from "./../data/all-products.json";
import Product from "../../models/Product.js";

productModel.create = jest.fn();
productModel.find = jest.fn();

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

// 단위 테스트를 먼저 수행해서 모듈들이 잘 작동되는 것을 확인한 후에 모듈들을 연동해서 테스트를 수행하는 것을 통합 테스트라고 한다.
// 모듈들의 상호 작용이 잘 이루어지는지 검증하기 위해 실시한다.

describe("Product Controller Get", () => {
  it("should have a getProducts function", () => {
    expect(typeof productController.getProducts).toBe("function");
  });

  it("should call ProductModel.find({})", async () => {
    await productController.getProducts(req, res, next);
    expect(productModel.find).toBeCalledWith({});
  });

  it("should return 200 response", async () => {
    await productController.getProducts(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled).toBeTruthy();
  });

  it("should return json body in response", async () => {
    productModel.find.mockReturnValue(allProducts);
    await productController.getProducts(req, res, next);
    expect(res._getJSONData()).toStrictEqual(allProducts);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "no data" };
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.find.mockReturnValue(rejectedPromise); // 원래 mongoDB에서 처리하는 에러 메시지를 mock 함수로 대체
    await productController.getProducts(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

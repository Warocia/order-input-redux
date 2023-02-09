import React from 'react'
import { useDispatch } from "react-redux";
import fetch, {FetchMock, enableFetchMocks} from 'jest-fetch-mock';
import { productsInitialize, updateProducts, createProduct, removeProduct } from "../Features/ProductSlice";
import ProductAPI from '../API/ProductAPI';
import {Product } from '../Model/Product';

enableFetchMocks();

const product1: Product = { id: 1, productName: "Product 1", description: "Description 1", costPrice: 10, salesPrice: 15 };
const product2: Product = { id: 2, productName: "Product 2", description: "Description 2", costPrice: 20, salesPrice: 25 };
const product3: Product = { id: 3, productName: "Product 3", description: "Description 3", costPrice: 30, salesPrice: 35 };

describe("Product CRUD operations", () => {

  const fetchMock = fetch as FetchMock;

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it("can initialize products", async () => {
    fetch.mockResponseOnce(JSON.stringify([product1, product2, product3]))

    const restProducts = await ProductAPI.getProductData();
    expect(fetch.mock.calls.length).toEqual(1);

    expect(restProducts).toEqual([product1, product2, product3]);
  });

 
  it("can update a product", async () => {
    const updatedProduct = { ...product1, productName: "Updated Product" };

    fetch.mockResponseOnce(JSON.stringify(updatedProduct))

    const rest = await ProductAPI.updateProduct(updatedProduct);
    
    expect(fetch.mock.calls.length).toEqual(1);
    expect(rest).toEqual(updatedProduct);
  });


  it("can add a new product", async () => {
    const newProduct: Product = { id: 4, productName: "New Product", description: "New Description", costPrice: 40, salesPrice: 45 };
    
    fetch.mockResponseOnce(JSON.stringify(newProduct))

    const rest = await ProductAPI.createProduct(newProduct);
    
    expect(fetch.mock.calls.length).toEqual(1);
    expect(rest).toEqual(newProduct);
  });

  it("can delete a product", async () => {
    fetch.mockResponseOnce(JSON.stringify(true))

    const success = await ProductAPI.deleteProduct(product1.id);
    expect(success).toEqual(true);
  });
});
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Product } from '../interfaces/Product';

const initialState : Product[]  = []

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
       productsInitialize: (state, action) => {
            state.splice(0, state.length, ...action.payload);
        }
    }
})

export const selectAllProducts = (state: { products: Product[] }) => state.products;

export const { productsInitialize } = productsSlice.actions

export default productsSlice.reducer
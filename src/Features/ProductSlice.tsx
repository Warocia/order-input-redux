import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Product } from '../Interfaces/Product';

const initialState : Product[]  = []

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productsInitialize: (state, action) => {
            state.splice(0, state.length, ...action.payload);
        },
        updateProducts(state, action) {
            const { id, product } = action.payload;

            const index = state.findIndex(p => p.id === id);
            if (index !== -1) {
               
                return [
                    ...state.slice(0, index),
                    {...product},
                    ...state.slice(index + 1),
                ];
            }
            
            return state;
        },
        createProduct(state, action) {
            const {product} = action.payload;

            return [
                {...product},
                ...state,
            ];

        },
        removeProduct(state, action) {
            const {id} = action.payload;

            const index = state.findIndex(order => order.id === id);
            if (index !== -1) {
               
                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1),
                ];
            }
        }
    }
})

export const selectAllProducts = (state: { products: Product[] }) => state.products;

export const { productsInitialize, updateProducts, createProduct, removeProduct } = productsSlice.actions

export default productsSlice.reducer
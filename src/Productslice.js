// productsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [],
};

export const fetchProducts = () => async (dispatch) => {
    axios.get('https://fakestoreapi.com/products')
        .then(function (response) {
            console.log(response.data);
            // setData(response.data)
            dispatch(fetchProductsSuccess(response.data));
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
        })
};

const productsSlice = createSlice({
    name: 'productsReducer',
    initialState,
    reducers: {
        fetchProductsSuccess(state, action) {
            state.products = action.payload;
        },
        addProductSuccess(state, action) {
            state.products.push(action.payload);
        },
        updateProductSuccess(state, action) {
            const updatedProduct = action.payload;
            const existingProduct = state.products.find(product => product.id === updatedProduct.id);
            if (existingProduct) {
                Object.assign(existingProduct, updatedProduct);
            }
        },
        deleteProductSuccess(state, action) {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
    },
});

export const { fetchProductsSuccess, addProductSuccess, updateProductSuccess, deleteProductSuccess } = productsSlice.actions;
export default productsSlice.reducer;

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Action types
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCT_DETAILS_SUCCESS = 'FETCH_PRODUCT_DETAILS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

// Action creators
export const fetchProductsSuccess = (products: any) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductDetailsSuccess = (details: any) => ({
  type: FETCH_PRODUCT_DETAILS_SUCCESS,
  payload: details,
});

export const fetchProductsFailure = (error: any) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

// Action asynchroneous to fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('http://localhost:5000/api/products');
    return response.data;
  }
);

// Async action to fetch product details by SKU
export const fetchProductDetails = (sku: any) => {
  return async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/stock-price/${sku}`);
      dispatch(fetchProductDetailsSuccess(response.data));
    } catch (error: any) {
      dispatch(fetchProductsFailure(error.message));
    }
  };
};

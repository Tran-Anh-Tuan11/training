// shopSlice.js
import { createSlice } from '@reduxjs/toolkit';

const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        shopifyDomain: '',
        shopOwner: '',
        token: '',
        shopResponse: null,
        error: null
    },
    reducers: {
        fetchShopifyTokenRequest: (state, action) => {
            state.error = null;
        },
        fetchShopifyTokenSuccess: (state, action) => {
            state.shopifyDomain = action.payload.shopifyDomain;
            state.shopOwner = action.payload.shopOwner;
            state.token = action.payload.token;
        },
        fetchShopifyTokenFailure: (state, action) => {
            state.error = action.payload.error;
        },
        createShopRequest: (state, action) => {
            state.error = null;
        },
        createShopSuccess: (state, action) => {
            state.shopResponse = action.payload.response;
        },
        createShopFailure: (state, action) => {
            state.error = action.payload.error;
        },
        setShopInfo: (state, action) => {
            state.shopifyDomain = action.payload.shopifyDomain;
            state.shopOwner = action.payload.shopOwner;
        }
    },
});

export const {
    fetchShopifyTokenRequest,
    fetchShopifyTokenSuccess,
    fetchShopifyTokenFailure,
    createShopRequest,
    createShopSuccess,
    createShopFailure,
    setShopInfo
} = shopSlice.actions;

export default shopSlice.reducer;
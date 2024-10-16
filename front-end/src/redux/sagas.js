// sagas.js
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchShopifyToken, createShop } from '../api/shopApi';
import {
    fetchShopifyTokenRequest,
    fetchShopifyTokenSuccess,
    fetchShopifyTokenFailure,
    createShopRequest,
    createShopSuccess,
    createShopFailure
} from './shopSlice';


function* fetchShopifyTokenSaga(action) {
    try {
        const { shopifyDomain, shopOwner } = action.payload;
        const token = yield call(fetchShopifyToken, shopifyDomain);
        yield put(fetchShopifyTokenSuccess({ shopifyDomain, shopOwner, token }));
    } catch (error) {
        yield put(fetchShopifyTokenFailure({ error: error.message }));
    }
}

function* createShopSaga(action) {
    try {
        const { shopifyDomain, shopOwner, token } = action.payload;
        const response = yield call(createShop, shopifyDomain, shopOwner, token);
        yield put(createShopSuccess({ response }));
    } catch (error) {
        yield put(createShopFailure({ error: error.message }));
    }
}

function* rootSaga() {
    yield takeEvery(fetchShopifyTokenRequest.type, fetchShopifyTokenSaga);
    yield takeEvery(createShopRequest.type, createShopSaga);
}

export default rootSaga;
// store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import shopReducer from './shopSlice';
import rootSaga from './sagas';

//tạo saga middleware
const sagaMiddleware = createSagaMiddleware();

//cấu hình store với redux 
const store = configureStore({
    reducer: {
        shop: shopReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export default store;
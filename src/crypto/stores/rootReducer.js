import {combineReducers } from 'redux';
import tabReducer from './tab/tabReducers';
import marketReducer from './market/marketReducer';

export default combineReducers({
    tabReducer,
    marketReducer
})

import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import authReducer from './authReducer';
import subcategoryReducer from './subcategoryReducer';

const allReducers = combineReducers({
    categoryReducer,
    subcategoryReducer,
    authReducer
});

export default allReducers
import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import authReducer from './authReducer';
import subcategoryReducer from './subcategoryReducer';
import postReducer from './postReducer';

const allReducers = combineReducers({
    categoryReducer,
    subcategoryReducer,
    authReducer,
    postReducer
});

export default allReducers
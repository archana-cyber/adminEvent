import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import authReducer from './authReducer';
import subcategoryReducer from './subcategoryReducer';
import postReducer from './postReducer';
import countryReducer from './countryReducer';
import stateReducer from './stateReducer';
import cityReducer from './cityReducer';

const allReducers = combineReducers({
    categoryReducer,
    subcategoryReducer,
    authReducer,
    postReducer,
    countryReducer,
    stateReducer,
    cityReducer
});

export default allReducers
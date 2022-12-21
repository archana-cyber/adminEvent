import { ADD_COUNTRY_REQUEST,ADD_COUNTRY_FAIL,ADD_COUNTRY_SUCCESS,
    GET_COUNTRY_FAIL,GET_COUNTRY_SUCCESS,GET_COUNTRY_REQUEST,
    UPDATE_COUNTRY_FAIL,UPDATE_COUNTRY_SUCCESS,UPDATE_COUNTRY_REQUEST,
    DELETE_COUNTRY_SUCCESS,DELETE_COUNTRY_FAIL,DELETE_COUNTRY_REQUEST
} from "../types";

const INITIAL_STATE = {
    countryLoader:false,
    countryList:[]
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ADD_COUNTRY_REQUEST:
            return {  ...state , loader:true };
        case ADD_COUNTRY_SUCCESS:
            return {  ...state , loader:false,countryList:[...action.payload,...state.countryList] };
        case ADD_COUNTRY_FAIL:
            return {  ...state , loader:false};
        case GET_COUNTRY_REQUEST:
            return {  ...state , loader:true };
        case GET_COUNTRY_SUCCESS:
            return {  ...state , loader:false,countryList:action.payload };
        case GET_COUNTRY_FAIL:
            return {  ...state , loader:false};
        case UPDATE_COUNTRY_REQUEST:
            return {  ...state , loader:true };
        case UPDATE_COUNTRY_SUCCESS:
            return {  ...state , loader:false,countryList:action.payload };
        case UPDATE_COUNTRY_FAIL:
            return {  ...state , loader:false};    
        case DELETE_COUNTRY_REQUEST:
            return {  ...state , loader:true };
        case DELETE_COUNTRY_SUCCESS:
            return {  ...state , loader:false,countryList:action.payload  };
        case DELETE_COUNTRY_FAIL:
            return {  ...state , loader:false};    
        default:
            return state;
    }
}
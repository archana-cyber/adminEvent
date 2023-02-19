import { ADD_CITY_REQUEST,ADD_CITY_FAIL,ADD_CITY_SUCCESS,
    GET_CITY_FAIL,GET_CITY_SUCCESS,GET_CITY_REQUEST,
    UPDATE_CITY_FAIL,UPDATE_CITY_SUCCESS,UPDATE_CITY_REQUEST,
    DELETE_CITY_SUCCESS,DELETE_CITY_FAIL,DELETE_CITY_REQUEST
} from "../types";

const INITIAL_STATE = {
    cityLoader:false,
    cityList:[]
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ADD_CITY_REQUEST:
            return {  ...state , cityLoader:true };
        case ADD_CITY_SUCCESS:
            return {  ...state , cityLoader:false,cityList:[...action.payload,...state.cityList] };
        case ADD_CITY_FAIL:
            return {  ...state , cityLoader:false};
        case GET_CITY_REQUEST:
            return {  ...state , cityLoader:true };
        case GET_CITY_SUCCESS:
            return {  ...state , cityLoader:false,cityList:action.payload };
        case GET_CITY_FAIL:
            return {  ...state , cityLoader:false};
        case UPDATE_CITY_REQUEST:
            return {  ...state , cityLoader:true };
        case UPDATE_CITY_SUCCESS:
            return {  ...state , cityLoader:false,cityList:action.payload };
        case UPDATE_CITY_FAIL:
            return {  ...state , cityLoader:false};    
        case DELETE_CITY_REQUEST:
            return {  ...state , cityLoader:true };
        case DELETE_CITY_SUCCESS:
            return {  ...state , cityLoader:false,cityList:action.payload  };
        case DELETE_CITY_FAIL:
            return {  ...state , cityLoader:false};    
        default:
            return state;
    }
}
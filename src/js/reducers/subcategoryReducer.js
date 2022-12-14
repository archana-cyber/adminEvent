import { ADD_SUB_CATEGORY_FAIL,ADD_SUB_CATEGORY_SUCCESS,ADD_SUB_CATEGORY_REQUEST,
    GET_SUB_CATEGORY_FAIL,GET_SUB_CATEGORY_SUCCESS,GET_SUB_CATEGORY_REQUEST,
    UPDATE_SUB_CATEGORY_FAIL,UPDATE_SUB_CATEGORY_SUCCESS,UPDATE_SUB_CATEGORY_REQUEST
} from "../types";

const INITIAL_STATE = {
    loader:false,
    subcategoryList:{}
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ADD_SUB_CATEGORY_REQUEST:
            return {  ...state , loader:true };
        case ADD_SUB_CATEGORY_SUCCESS:
            return {  ...state , loader:false };
        case ADD_SUB_CATEGORY_FAIL:
            return {  ...state , loader:false};
        case GET_SUB_CATEGORY_REQUEST:
            return {  ...state , loader:true };
        case GET_SUB_CATEGORY_SUCCESS:
            return {  ...state , loader:false,subcategoryList:action.payload };
        case GET_SUB_CATEGORY_FAIL:
            return {  ...state , loader:false};
        case UPDATE_SUB_CATEGORY_REQUEST:
            return {  ...state , loader:true };
        case UPDATE_SUB_CATEGORY_SUCCESS:
            return {  ...state , loader:false };
        case UPDATE_SUB_CATEGORY_FAIL:
            return {  ...state , loader:false};    
        // case DELETE_SUB_CATEGORY_REQUEST:
        //     return {  ...state , loader:true };
        // case DELETE_SUB_CATEGORY_SUCCESS:
        //     return {  ...state , loader:false };
        // case DELETE_SUB_CATEGORY_FAIL:
        //     return {  ...state , loader:false};    
        default:
            return state;
    }
}
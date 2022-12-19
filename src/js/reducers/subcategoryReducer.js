import { ADD_SUB_CATEGORY_FAIL,ADD_SUB_CATEGORY_SUCCESS,ADD_SUB_CATEGORY_REQUEST,
    GET_SUB_CATEGORY_FAIL,GET_SUB_CATEGORY_SUCCESS,GET_SUB_CATEGORY_REQUEST,
    UPDATE_SUB_CATEGORY_FAIL,UPDATE_SUB_CATEGORY_SUCCESS,UPDATE_SUB_CATEGORY_REQUEST
} from "../types";

const INITIAL_STATE = {
    subLoader:false,
    subcategoryList:{}
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ADD_SUB_CATEGORY_REQUEST:
            return {  ...state , subLoader:true };
        case ADD_SUB_CATEGORY_SUCCESS:
            return {  ...state , subLoader:false };
        case ADD_SUB_CATEGORY_FAIL:
            return {  ...state , subLoader:false};
        case GET_SUB_CATEGORY_REQUEST:
            return {  ...state , subLoader:true };
        case GET_SUB_CATEGORY_SUCCESS:
            return {  ...state , subLoader:false,subcategoryList:action.payload };
        case GET_SUB_CATEGORY_FAIL:
            return {  ...state , subLoader:false};
        case UPDATE_SUB_CATEGORY_REQUEST:
            return {  ...state , subLoader:true };
        case UPDATE_SUB_CATEGORY_SUCCESS:
            return {  ...state , subLoader:false };
        case UPDATE_SUB_CATEGORY_FAIL:
            return {  ...state , subLoader:false};    
        // case DELETE_SUB_CATEGORY_REQUEST:
        //     return {  ...state , subLoader:true };
        // case DELETE_SUB_CATEGORY_SUCCESS:
        //     return {  ...state , subLoader:false };
        // case DELETE_SUB_CATEGORY_FAIL:
        //     return {  ...state , subLoader:false};    
        default:
            return state;
    }
}
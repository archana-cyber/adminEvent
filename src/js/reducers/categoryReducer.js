import { ADD_CATEGORY_FAIL,ADD_CATEGORY_SUCCESS,ADD_CATEGORY_REQUEST,
    GET_CATEGORY_FAIL,GET_CATEGORY_SUCCESS,GET_CATEGORY_REQUEST,
    DELETE_CATEGORY_FAIL,DELETE_CATEGORY_SUCCESS,DELETE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_FAIL,UPDATE_CATEGORY_SUCCESS,UPDATE_CATEGORY_REQUEST
} from "../types";

const INITIAL_STATE = {
    loader:false,
    categoryList:[]
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ADD_CATEGORY_REQUEST:
            return {  ...state , loader:true };
        case ADD_CATEGORY_SUCCESS:
            return {  ...state , loader:false,categoryList:[...state.categoryList,...action.payload] };
        case ADD_CATEGORY_FAIL:
            return {  ...state , loader:false};
        case GET_CATEGORY_REQUEST:
            return {  ...state , loader:true };
        case GET_CATEGORY_SUCCESS:
            return {  ...state , loader:false,categoryList:action.payload };
        case GET_CATEGORY_FAIL:
            return {  ...state , loader:false};
        case UPDATE_CATEGORY_REQUEST:
            return {  ...state , loader:true };
        case UPDATE_CATEGORY_SUCCESS:
            return {  ...state , loader:false,categoryList:action.payload };
        case UPDATE_CATEGORY_FAIL:
            return {  ...state , loader:false};    
        case DELETE_CATEGORY_REQUEST:
            return {  ...state , loader:true };
        case DELETE_CATEGORY_SUCCESS:
            return {  ...state , loader:false,categoryList:action.payload  };
        case DELETE_CATEGORY_FAIL:
            return {  ...state , loader:false};    
        default:
            return state;
    }
}
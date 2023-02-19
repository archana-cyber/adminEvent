
import { ADD_POST_REQUEST,ADD_POST_FAIL,ADD_POST_SUCCESS,GET_POST_REQUEST,GET_POST_FAIL,GET_POST_SUCCESS,DELETE_POST_FAIL,DELETE_POST_SUCCESS,DELETE_POST_REQUEST,UPDATE_POST_FAIL,UPDATE_POST_SUCCESS,UPDATE_POST_REQUEST} from "../types";

const INITIAL_STATE = {
    loader:false,
    postList:[]
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ADD_POST_REQUEST:
            return {  ...state , loader:true };
        case ADD_POST_SUCCESS:
            return {  ...state , loader:false,postList:[...state.postList,...action.payload] };
        case ADD_POST_FAIL:
            return {  ...state , loader:false};
        case GET_POST_REQUEST:
            return {  ...state , loader:true };
        case GET_POST_SUCCESS:
            return {  ...state , loader:false,postList:action.payload };
        case GET_POST_FAIL:
            return {  ...state , loader:false};
        case DELETE_POST_REQUEST:
            return {  ...state , loader:true };
        case DELETE_POST_SUCCESS:
            return {  ...state , loader:false,postList:action.payload  };
        case DELETE_POST_FAIL:
            return {  ...state , loader:false};      
        case UPDATE_POST_REQUEST:
            return {  ...state , loader:true };
        case UPDATE_POST_SUCCESS:
            return {  ...state , loader:false,categoryList:action.payload };
        case UPDATE_POST_FAIL:
            return {  ...state , loader:false};  
        default:
            return state;
    }
}
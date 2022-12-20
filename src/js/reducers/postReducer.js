
import { ADD_POST_REQUEST,ADD_POST_FAIL,ADD_POST_SUCCESS,GET_POST_REQUEST,GET_POST_FAIL,GET_POST_SUCCESS} from "../types";

const INITIAL_STATE = {
    postLoader:false,
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
         
        default:
            return state;
    }
}
import { ADD_STATE_REQUEST,ADD_STATE_FAIL,ADD_STATE_SUCCESS,
    GET_STATE_FAIL,GET_STATE_SUCCESS,GET_STATE_REQUEST,
    UPDATE_STATE_FAIL,UPDATE_STATE_SUCCESS,UPDATE_STATE_REQUEST,
    DELETE_STATE_SUCCESS,DELETE_STATE_FAIL,DELETE_STATE_REQUEST
} from "../types";

const INITIAL_STATE = {
    stateLoader:false,
    stateList:[]
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ADD_STATE_REQUEST:
            return {  ...state , stateLoader:true };
        case ADD_STATE_SUCCESS:
            return {  ...state , stateLoader:false,stateList:[...action.payload,...state.stateList] };
        case ADD_STATE_FAIL:
            return {  ...state , stateLoader:false};
        case GET_STATE_REQUEST:
            return {  ...state , stateLoader:true };
        case GET_STATE_SUCCESS:
            return {  ...state , stateLoader:false,stateList:action.payload };
        case GET_STATE_FAIL:
            return {  ...state , stateLoader:false};
        case UPDATE_STATE_REQUEST:
            return {  ...state , stateLoader:true };
        case UPDATE_STATE_SUCCESS:
            return {  ...state , stateLoader:false,stateList:action.payload };
        case UPDATE_STATE_FAIL:
            return {  ...state , stateLoader:false};    
        case DELETE_STATE_REQUEST:
            return {  ...state , stateLoader:true };
        case DELETE_STATE_SUCCESS:
            return {  ...state , stateLoader:false,stateList:action.payload  };
        case DELETE_STATE_FAIL:
            return {  ...state , stateLoader:false};    
        default:
            return state;
    }
}
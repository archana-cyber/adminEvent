import { AUTH_LOGIN_FAIL,AUTH_LOGIN_SUCCESS,AUTH_LOGIN_REQUEST, 
    AUTH_FORGOT_PASSWORD_FAIL,AUTH_FORGOT_PASSWORD_SUCCESS,AUTH_FORGOT_PASSWORD_REQUEST,
    AUTH_PROFILE_REQUEST,AUTH_PROFILE_SUCCESS,AUTH_PROFILE_FAIL
} from "../types";

const INITIAL_STATE = {
    loader:false,
    userInfo:{},
    forgotpswd:{},
    profileData:{}
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case AUTH_LOGIN_REQUEST:
            return {  ...state , loader:true };
        case AUTH_LOGIN_SUCCESS:
            return {  ...state , loader:false,userInfo:action.payload };
        case AUTH_LOGIN_FAIL:
            return {  ...state , loader:false};
        case AUTH_FORGOT_PASSWORD_REQUEST:
            return {  ...state , loader:true };
        case AUTH_FORGOT_PASSWORD_SUCCESS:
            return {  ...state , loader:false,forgotpswd:action.payload };
        case AUTH_FORGOT_PASSWORD_FAIL:
            return {  ...state , loader:false};
        case AUTH_PROFILE_REQUEST:
            return {  ...state , loader:true };
        case AUTH_PROFILE_SUCCESS:
            return {  ...state , loader:false,profileData:action.payload };
        case AUTH_PROFILE_FAIL:
            return {  ...state , loader:false};      
        default:
            return state;
    }
}
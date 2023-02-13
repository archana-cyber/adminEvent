
import { AUTH_LOGIN_FAIL,AUTH_LOGIN_SUCCESS,AUTH_LOGIN_REQUEST,
    AUTH_FORGOT_PASSWORD_FAIL,AUTH_FORGOT_PASSWORD_SUCCESS,AUTH_FORGOT_PASSWORD_REQUEST,
    AUTH_PROFILE_REQUEST,AUTH_PROFILE_SUCCESS,AUTH_PROFILE_FAIL
} from "../types";
import axios from "axios";
import {BASE_URL} from "../../config"


const uninterceptedAxiosInstance = axios.create();
export const  AuthLogin = (payload,callBack=()=>{})=>{
    return async(dispatch)=>{
        dispatch({ type: AUTH_LOGIN_REQUEST });
        uninterceptedAxiosInstance.post(`${BASE_URL}/admin/login`,payload)
        .then(res=>{
            console.log("AUTH_LOGIN_REQUEST Res ===>",res.data) 
            if(res.data){
                dispatch({ type: AUTH_LOGIN_SUCCESS,payload :res.data });
                callBack(res.data.data || {})
            }
        })
        .catch(err=>{
            console.log("AUTH_LOGIN_REQUEST Error ===>",err)
            dispatch({ type: AUTH_LOGIN_FAIL });
            //CustomException(err)
        })
    }
}

export const  ForgetPasswordAction = (payload,callBack=()=>{})=>{
    return async(dispatch)=>{
        dispatch({ type: AUTH_FORGOT_PASSWORD_REQUEST });
        axios.post(`${BASE_URL}/auth/forgot-password`,payload)
        .then(res=>{
            console.log("AUTH_FORGOT_PASSWORD_REQUEST Res ===>",res.data) 
            if(res.data)
            
            dispatch({ type: AUTH_FORGOT_PASSWORD_SUCCESS,payload :res.data });
            callBack(res.data.data || {})
        })
        .catch(err=>{
            console.log("AUTH_FORGOT_PASSWORD_REQUEST Error ===>",err)
            dispatch({ type: AUTH_FORGOT_PASSWORD_FAIL });
            //CustomException(err)
        })
    }
}

export const  UpdatePasswordAction = (payload,callBack=()=>{})=>{
    return async(dispatch)=>{
        // dispatch({ type: AUTH_UPDATE_PASSWORD_REQUEST });
        axios.post(`${BASE_URL}/admin/change-password`,payload)
        .then(res=>{
            console.log("UpdatePassword Res ===>",res.data) 
            if(res.data)
              callBack(res.data)
            
            // dispatch({ type: AUTH_UPDATE_PASSWORD_SUCCESS,payload :res.data });
        })
        .catch(err=>{
            console.log("UpdatePassword Error ===>",err)
            // dispatch({ type: AUTH_UPDATE_PASSWORD_FAIL });
            //CustomException(err)
            callBack()
        })
    }
}

export const  GetProfileDataAction = (payload,callBack=()=>{})=>{
    return async(dispatch)=>{
        dispatch({ type: AUTH_PROFILE_REQUEST });
        axios.get(`${BASE_URL}/admin/my-profile`)
        .then(res=>{
            console.log("GetProfileDataAction Res ===>",res.data) 
            if(res.data)
            
            dispatch({ type: AUTH_PROFILE_SUCCESS,payload :res.data.data });
            callBack(res.data)
        })
        .catch(err=>{
            console.log("GetProfileDataAction Error ===>",err)
            dispatch({ type: AUTH_PROFILE_FAIL });
            //CustomException(err)
        })
    }
}

export const  UpdateProfileDataAction = (payload,callBack=()=>{})=>{
    return async(dispatch)=>{
        // dispatch({ type: AUTH_PROFILE_REQUEST });
        axios.post(`${BASE_URL}/admin/update-profile`,payload)
        .then(res=>{
            console.log("UpdateProfileDataAction Res ===>",res.data) 
            if(res.data)
            
            // dispatch({ type: AUTH_PROFILE_SUCCESS,payload :res.data.data });
            callBack(res.data)
        })
        .catch(err=>{
            console.log("UpdateProfileDataAction Error ===>",err)
            // dispatch({ type: AUTH_PROFILE_FAIL });
            //CustomException(err)
        })
    }
}
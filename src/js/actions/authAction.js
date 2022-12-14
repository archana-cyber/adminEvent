
import { AUTH_LOGIN_FAIL,AUTH_LOGIN_SUCCESS,AUTH_LOGIN_REQUEST,
    AUTH_FORGOT_PASSWORD_FAIL,AUTH_FORGOT_PASSWORD_SUCCESS,AUTH_FORGOT_PASSWORD_REQUEST
} from "../types";
import axios from "axios";
import {BASE_URL} from "../../config"


const uninterceptedAxiosInstance = axios.create();
export const  AuthLogin = (payload,callBack=()=>{})=>{
    return async(dispatch)=>{
        dispatch({ type: AUTH_LOGIN_REQUEST });
        uninterceptedAxiosInstance.post(`${BASE_URL}/auth/login`,payload)
        .then(res=>{
            console.log("AUTH_LOGIN_REQUEST Res ===>",res.data) 
            if(res.data)
            
            dispatch({ type: AUTH_LOGIN_SUCCESS,payload :res.data });
            callBack(res.data.data || {})
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
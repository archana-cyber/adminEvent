
import { AUTH_LOGIN_FAIL,AUTH_LOGIN_SUCCESS,AUTH_LOGIN_REQUEST
} from "../types";

export const  AuthLogin = (payload)=>{
    return async(dispatch)=>{
        dispatch({ type: AUTH_LOGIN_REQUEST });
        axios.post(`${BASE_URL}/auth/login`,payload)
        .then(res=>{
            console.log("SaveTransactionPayload Res ===>",res.data) 
            if(res.data)
            
            dispatch({ type: AUTH_LOGIN_SUCCESS,payload : res.data.data });
        })
        .catch(err=>{
            console.log("SaveTransactionPayload Error ===>",err)
            dispatch({ type: AUTH_LOGIN_FAIL });
            //CustomException(err)
        })
    }
}

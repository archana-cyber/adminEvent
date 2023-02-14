import axios from "axios";
import { ADD_POST_REQUEST,ADD_POST_FAIL,ADD_POST_SUCCESS,GET_POST_REQUEST,GET_POST_FAIL,GET_POST_SUCCESS} from "../types";
import {BASE_URL} from "../../config"


export const AddPostAction = (payload,callback=()=>{})=>{
   
    return async(dispatch)=>{
        dispatch({ type: ADD_POST_REQUEST });
        axios.post(`${BASE_URL}/post/create`, payload)
        .then(res=>{
            console.log("/post/create Res ===>",res.data) 
            if(res.data)
             dispatch({ type: ADD_POST_SUCCESS,payload :[ res.data.data]  });

             callback(res.data)  
        })
        .catch(err=>{
            console.log("/post/create Error ===>",err)
            dispatch({ type: ADD_POST_FAIL });
            
            callback()  
            //CustomException(err)
        })
    }
}


export const RecentPostAction = ()=>{
   
    return async(dispatch)=>{
        dispatch({ type: GET_POST_REQUEST });
        axios.get(`${BASE_URL}/post/recent`)
        .then(res=>{
            console.log("/post/recent Res ===>",res.data) 
            if(res.data)
            
            dispatch({ type: GET_POST_SUCCESS,payload : res.data.data });
        })
        .catch(err=>{
            console.log("/post/recent Error ===>",err)
            dispatch({ type: GET_POST_FAIL });
            //CustomException(err)
        })
    }
}
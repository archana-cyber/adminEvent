import axios from "axios";
import { POST_REQUEST,POST_FAIL,POST_SUCCESS} from "../types";


export const PostCategory = (payload)=>{
   
    return async(dispatch)=>{
        dispatch({ type: POST_REQUEST });
        axios.post(`${BASE_URL}/post/create`, payload)
        .then(res=>{
            console.log("/post/create Res ===>",res.data) 
            if(res.data)
            
            dispatch({ type: POST_SUCCESS });
        })
        .catch(err=>{
            console.log("/post/create Error ===>",err)
            dispatch({ type: POST_FAIL });
            //CustomException(err)
        })
    }
}


export const RecentPostCategory = (payload)=>{
   
    return async(dispatch)=>{
        dispatch({ type: POST_REQUEST });
        axios.post(`${BASE_URL}/post/recent`, payload)
        .then(res=>{
            console.log("/post/recent Res ===>",res.data) 
            if(res.data)
            
            dispatch({ type: POST_SUCCESS });
        })
        .catch(err=>{
            console.log("/post/recent Error ===>",err)
            dispatch({ type: POST_FAIL });
            //CustomException(err)
        })
    }
}
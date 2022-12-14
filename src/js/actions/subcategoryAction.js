import axios from "axios";
import { ADD_SUB_CATEGORY_REQUEST,ADD_SUB_CATEGORY_FAIL,ADD_SUB_CATEGORY_SUCCESS,
    GET_SUB_CATEGORY_FAIL,GET_SUB_CATEGORY_SUCCESS,GET_SUB_CATEGORY_REQUEST,
    UPDATE_SUB_CATEGORY_FAIL,UPDATE_SUB_CATEGORY_SUCCESS,UPDATE_SUB_CATEGORY_REQUEST,
} from "../types";
import {BASE_URL} from "../../config"


// export const DeleteSubCategory = (profileid)=>{
//     return async(dispatch)=>{
//         dispatch({ type:DELETE_SUB_CATEGORY_REQUEST });
//         axios.delete(`${BASE_URL}/category/delete/${profileid}`)
//         .then(res=>{
//             console.log("SaveTransactionPayload Res ===>",profileid,res.data) 
//             if(res.data)
//             dispatch({ type: DELETE_SUB_CATEGORY_SUCCESS});
//         })
//         .catch(err=>{
//             console.log("SaveTransactionPayload Error ===>",err)
//             dispatch({ type: DELETE_SUB_CATEGORY_FAIL });
//             //CustomException(err)
//         })
//     }
// }

export const UpdateSubCategory = (profileid, payload={})=>{
    return async(dispatch)=>{
        dispatch({ type: UPDATE_SUB_CATEGORY_REQUEST });
        axios.put(`${BASE_URL}/sub-category/update/${profileid}`, payload)
        .then(res=>{
            console.log("SaveTransactionPayload Res ===>",profileid,payload,res.data) 
            if(res.data)
            dispatch({ type: UPDATE_SUB_CATEGORY_SUCCESS});
        })
        .catch(err=>{
            console.log("SaveTransactionPayload Error ===>",err)
            dispatch({ type: UPDATE_SUB_CATEGORY_FAIL });
            //CustomException(err)
        })
    }
}

export const AddSubCategory = (payload)=>{
    
    return async(dispatch)=>{
        dispatch({ type: ADD_SUB_CATEGORY_REQUEST });
        axios.post(`${BASE_URL}/sub-category/create`, payload)
        .then(res=>{
            console.log("/subcategory/create Res ===>",res.data) 
            if(res.data)
            
            dispatch({ type: ADD_SUB_CATEGORY_SUCCESS });
        })
        .catch(err=>{
            console.log("/subcategory/create Error ===>",err)
            dispatch({ type: ADD_SUB_CATEGORY_FAIL });
            //CustomException(err)
        })
    }
}

export const  GetSubCategory   = ()=>{
    return async(dispatch)=>{
        dispatch({ type: GET_SUB_CATEGORY_REQUEST });
        axios.get(`${BASE_URL}/sub-category/all`)
        .then(res=>{
            console.log("SaveTransactionPayload Res ===>",res.data) 
            if(res.data)
            
            dispatch({ type: GET_SUB_CATEGORY_SUCCESS,payload : res.data.data });
        })
        .catch(err=>{
            console.log("SaveTransactionPayload Error ===>",err)
            dispatch({ type: GET_SUB_CATEGORY_FAIL });
            //CustomException(err)
        })
    }
}


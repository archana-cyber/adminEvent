import axios from "axios";
import { ADD_CATEGORY_REQUEST,ADD_CATEGORY_FAIL,ADD_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,GET_CATEGORY_SUCCESS,GET_CATEGORY_REQUEST,
    UPDATE_CATEGORY_FAIL,UPDATE_CATEGORY_SUCCESS,UPDATE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,DELETE_CATEGORY_FAIL,DELETE_CATEGORY_REQUEST
} from "../types";
import {BASE_URL} from "../../config"
import _ from "lodash";
import store from "../store/store";

export const DeleteCategory = (profileid,callback=()=>{})=>{
    return async(dispatch)=>{
        dispatch({ type:DELETE_CATEGORY_REQUEST });
        axios.delete(`${BASE_URL}/category/delete/${profileid}`)
        .then(res=>{
            console.log("SaveTransactionPayload Res ===>",profileid,res.data) 
            if(res.data){
                let categoryInfo = store.getState().categoryReducer.categoryList.length>0 ? store.getState().categoryReducer.categoryList : [];
                let updatedList = _.filter(categoryInfo, function(item) { return item.id !== profileid; });
                
                dispatch({ type: DELETE_CATEGORY_SUCCESS,payload:updatedList});
                callback(res.data)
            }
           
        })
        .catch(err=>{
            console.log("SaveTransactionPayload Error ===>",err)
            dispatch({ type: DELETE_CATEGORY_FAIL });
            callback()
            //CustomException(err)
        })
    }
}

export const UpdateCategory = (profileid, payload={},callback=()=>{})=>{
    return async(dispatch)=>{
        dispatch({ type: UPDATE_CATEGORY_REQUEST });
        axios.put(`${BASE_URL}/category/update/${profileid}`, payload)
        .then(res=>{
            console.log("SaveTransactionPayload Res ===>",profileid,payload,res.data) 
            if(res.data){
                dispatch({ type: UPDATE_CATEGORY_SUCCESS,payload :[ res.data.data] });
                callback(res.data)
            }
           
        })
        .catch(err=>{
            console.log("SaveTransactionPayload Error ===>",err)
            dispatch({ type: UPDATE_CATEGORY_FAIL });
            callback()
            //CustomException(err)
        })
    }
}





export const AddCategory = (payload,callback=()=>{})=>{
   
    return async(dispatch)=>{
        dispatch({ type: ADD_CATEGORY_REQUEST });
        axios.post(`${BASE_URL}/category/create`, payload)
        .then(res=>{
            console.log("/category/create Res ===>",res.data) 
            if(res.data)
              dispatch({ type: ADD_CATEGORY_SUCCESS,payload :[ res.data.data] });

            callback(res.data)  
        })
        .catch(err=>{
            console.log("/category/create Error ===>",err)
            dispatch({ type: ADD_CATEGORY_FAIL });
            callback()  
            //CustomException(err)
        })
    }
}

export const  GetCategoryAction = ()=>{
    return async(dispatch)=>{
        dispatch({ type: GET_CATEGORY_REQUEST });
        axios.get(`${BASE_URL}/category/all`)
        .then(res=>{
            console.log("SaveTransactionPayload Res ===>",res.data) 
            if(res.data)
            
            dispatch({ type: GET_CATEGORY_SUCCESS,payload : res.data.data });
        })
        .catch(err=>{
            console.log("SaveTransactionPayload Error ===>",err)
            dispatch({ type: GET_CATEGORY_FAIL });
            //CustomException(err)
        })
    }
}


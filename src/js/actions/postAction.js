import axios from "axios";
import { ADD_POST_REQUEST,ADD_POST_FAIL,ADD_POST_SUCCESS,GET_POST_REQUEST,GET_POST_FAIL,GET_POST_SUCCESS,DELETE_POST_FAIL,DELETE_POST_SUCCESS,DELETE_POST_REQUEST,UPDATE_POST_FAIL,UPDATE_POST_SUCCESS,UPDATE_POST_REQUEST} from "../types";
import {BASE_URL} from "../../config"
import _ from "lodash";
import store from "../store/store";

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
        axios.get(`${BASE_URL}/post/all`)
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

export const DeletePostAction = (profileid,callback=()=>{})=>{
    return async(dispatch)=>{
        dispatch({ type:DELETE_POST_REQUEST });
        axios.delete(`${BASE_URL}/post/delete/${profileid}`)
        .then(res=>{
            console.log("DeletePostAction Res ===>",profileid,res.data) 
            if(res.data){
                let categoryInfo = store.getState().postReducer.postList.length>0 ? store.getState().postReducer.postList : [];
                let updatedList = _.filter(categoryInfo, function(item) { return item.id !== profileid; });
                
                dispatch({ type: DELETE_POST_SUCCESS,payload:updatedList});
                callback(res.data)
            }
           
        })
        .catch(err=>{
            console.log("SaveTransactionPayload Error ===>",err)
            dispatch({ type: DELETE_POST_FAIL });
            callback()
            //CustomException(err)
        })
    }
}

export const UpdatePostAction = (profileid, payload={},callback=()=>{})=>{
    return async(dispatch)=>{
        dispatch({ type: UPDATE_POST_REQUEST });
        axios.put(`${BASE_URL}/post/update/${profileid}`, payload)
        .then(res=>{
            console.log("UpdatePostAction Res ===>",profileid,payload,res.data) 
           
            if(res.data.data){
                let categoryInfo = store.getState().postReducer.postList.length>0 ? store.getState().postReducer.postList : [];
                let updatedList = _.filter(categoryInfo, function(item) { return item.id !== profileid; });
                updatedList.push(res.data.data)
                dispatch({ type: UPDATE_POST_SUCCESS,payload:updatedList});
                callback(res.data)
            }
           
        })
        .catch(err=>{
            console.log("UpdatePostAction Error ===>",err)
            dispatch({ type: UPDATE_POST_FAIL });
            callback()
            //CustomException(err)
        })
    }
}
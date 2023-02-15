import axios from "axios";
import { ADD_STATE_REQUEST,ADD_STATE_FAIL,ADD_STATE_SUCCESS,
    GET_STATE_FAIL,GET_STATE_SUCCESS,GET_STATE_REQUEST,
    UPDATE_STATE_FAIL,UPDATE_STATE_SUCCESS,UPDATE_STATE_REQUEST,
    DELETE_STATE_SUCCESS,DELETE_STATE_FAIL,DELETE_STATE_REQUEST
} from "../types";
import {BASE_URL} from "../../config"
import _ from "lodash";
import store from "../store/store";


export const DeleteStateAction = (profileid,callback=()=>{})=>{
    return async(dispatch)=>{
        dispatch({ type:DELETE_STATE_REQUEST });
        axios.delete(`${BASE_URL}/location/delete/state/${profileid}`)
        .then(res=>{
            console.log("SaveTransactionPayload Res ===>",profileid,res.data) 
            if(res.data){
                let stateInfo = store.getState().stateReducer.stateList.length>0 ? store.getState().stateReducer.stateList : [];
                let updatedList = _.filter(stateInfo, function(item) { return item.id !== profileid; });
                console.log('updatedList55', updatedList)
                dispatch({ type: DELETE_STATE_SUCCESS,payload:updatedList});
                callback(res.data)
            }
            
           
        })
        .catch(err=>{
            console.log("SaveTransactionPayload Error ===>",err)
            dispatch({ type: DELETE_STATE_FAIL });
            callback()
            //CustomException(err)
        })
    }
}

export const UpdateStateAction = (profileid, payload={},callback=()=>{})=>{
    return async(dispatch)=>{
        dispatch({ type: UPDATE_STATE_REQUEST });
        axios.put(`${BASE_URL}/location/update/state/${profileid}`, payload)
        .then(res=>{
            console.log("SaveTransactionPayload Res ===>",profileid,payload,res.data) 
            if(res.data){
                let stateInfo = store.getState().stateReducer.stateList.length>0 ? store.getState().stateReducer.stateList : [];
                let updatedList = _.filter(stateInfo, function(item) { return item.id !== profileid; });
                updatedList.push(res.data.data)
                console.log('updatedList55', updatedList)
                dispatch({ type: UPDATE_STATE_SUCCESS,payload:updatedList});
                callback(res.data)
            }
            
        })
        .catch(err=>{
            console.log("SaveTransactionPayload Error ===>",err)
            dispatch({ type: UPDATE_STATE_FAIL });
            callback()
            //CustomException(err)
        })
    }
}




export const AddStateAction = (payload,callback=()=>{})=>{
   
    return async(dispatch)=>{
        dispatch({ type: ADD_STATE_REQUEST });
        axios.post(`${BASE_URL}/location/create/state`, payload)
        .then(res=>{
            console.log("location/create/state Res ===>",res.data) 
            if(res.data)
              dispatch({ type: ADD_STATE_SUCCESS,payload :[ res.data.data] });

            callback(res.data)  
        })
        .catch(err=>{
            console.log("location/create/state Error ===>",err)
            dispatch({ type: ADD_STATE_FAIL });
            callback()  
            //CustomException(err)
        })
    }
}

export const  GetStateAction = ()=>{
    return async(dispatch)=>{
        dispatch({ type: GET_STATE_REQUEST });
        axios.get(`${BASE_URL}/location/states`)
        .then(res=>{
            console.log("SaveTransactionPayload Res ===>",res.data) 
            if(res.data)
            
            dispatch({ type: GET_STATE_SUCCESS,payload : res.data.data });
        })
        .catch(err=>{
            console.log("SaveTransactionPayload Error ===>",err)
            dispatch({ type: GET_STATE_FAIL });
            //CustomException(err)
        })
    }
}

//get====> location/states  ,location/create/state    location/update/status/3  location/delete/status/6
//
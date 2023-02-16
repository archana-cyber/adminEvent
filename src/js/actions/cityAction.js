import axios from "axios";
import { ADD_CITY_REQUEST,ADD_CITY_FAIL,ADD_CITY_SUCCESS,
    GET_CITY_FAIL,GET_CITY_SUCCESS,GET_CITY_REQUEST,
    UPDATE_CITY_FAIL,UPDATE_CITY_SUCCESS,UPDATE_CITY_REQUEST,
    DELETE_CITY_SUCCESS,DELETE_CITY_FAIL,DELETE_CITY_REQUEST
} from "../types";
import {BASE_URL} from "../../config"
import _ from "lodash";
import store from "../store/store";


export const DeleteCityAction = (profileid,callback=()=>{})=>{
    return async(dispatch)=>{
        dispatch({ type:DELETE_CITY_REQUEST });
        axios.delete(`${BASE_URL}/location/delete/city/${profileid}`)
        .then(res=>{
            console.log("SaveTransactionPayload Res ===>",profileid,res.data) 
            if(res.data){
                let countryInfo = store.getState().cityReducer.cityList.length>0 ? store.getState().cityReducer.cityList : [];
                let updatedList = _.filter(countryInfo, function(item) { return item.id !== profileid; });
                console.log('updatedList55', updatedList)
                dispatch({ type: DELETE_CITY_SUCCESS,payload:updatedList});
                callback(res.data)
            }
            
           
        })
        .catch(err=>{
            console.log("SaveTransactionPayload Error ===>",err)
            dispatch({ type: DELETE_CITY_FAIL });
            callback()
            //CustomException(err)
        })
    }
}

export const UpdateCityAction = (profileid, payload={},callback=()=>{})=>{
    return async(dispatch)=>{
        dispatch({ type: UPDATE_CITY_REQUEST });
        axios.put(`${BASE_URL}/location/update/city/${profileid}`, payload)
        .then(res=>{
            console.log("SaveTransactionPayload Res ===>",profileid,payload,res.data) 
            if(res.data){
                let countryInfo = store.getState().cityReducer.countryList.length>0 ? store.getState().cityReducer.cityList : [];
                let updatedList = _.filter(countryInfo, function(item) { return item.id !== profileid; });
                console.log('updatedList55', updatedList)
                dispatch({ type: UPDATE_CITY_SUCCESS,payload:[{value:res.data.data.id,label:res.data.data.name},...updatedList]});
                callback(res.data)
            }
            
        })
        .catch(err=>{
            console.log("SaveTransactionPayload Error ===>",err)
            dispatch({ type: UPDATE_CITY_FAIL });
            callback()
            //CustomException(err)
        })
    }
}




export const AddCityAction = (payload,callback=()=>{})=>{
   
    return async(dispatch)=>{
        dispatch({ type: ADD_CITY_REQUEST });
        axios.post(`${BASE_URL}/location/create/city`, payload)
        .then(res=>{
            console.log("location/create/city Res ===>",res.data) 
            if(res.data)
              dispatch({ type: ADD_CITY_SUCCESS,payload :[ res.data.data] });

            callback(res.data)  
        })
        .catch(err=>{
            console.log("location/create/city Error ===>",err)
            dispatch({ type: ADD_CITY_FAIL });
            callback()  
            //CustomException(err)
        })
    }
}

export const  GetCityAction = ()=>{
    return async(dispatch)=>{
        dispatch({ type: GET_CITY_REQUEST });
        axios.get(`${BASE_URL}/location/cities`)
        .then(res=>{
            console.log("SaveTransactionPayload Res ===>",res.data) 
            if(res.data)
            
            dispatch({ type: GET_CITY_SUCCESS,payload : res.data.data });
        })
        .catch(err=>{
            console.log("SaveTransactionPayload Error ===>",err)
            dispatch({ type: GET_CITY_FAIL });
            //CustomException(err)
        })
    }
}

//get====> location/countries  ,location/create/city    location/update/city/3  location/delete/city/6
import axios from "axios";
import { ADD_COUNTRY_REQUEST,ADD_COUNTRY_FAIL,ADD_COUNTRY_SUCCESS,
    GET_COUNTRY_FAIL,GET_COUNTRY_SUCCESS,GET_COUNTRY_REQUEST,
    UPDATE_COUNTRY_FAIL,UPDATE_COUNTRY_SUCCESS,UPDATE_COUNTRY_REQUEST,
    DELETE_COUNTRY_SUCCESS,DELETE_COUNTRY_FAIL,DELETE_COUNTRY_REQUEST
} from "../types";
import {BASE_URL} from "../../config"
import _ from "lodash";
import store from "../store/store";


export const DeleteCountryAction = (profileid,callback=()=>{})=>{
    return async(dispatch)=>{
        dispatch({ type:DELETE_COUNTRY_REQUEST });
        axios.delete(`${BASE_URL}/location/delete/country/${profileid}`)
        .then(res=>{
            console.log("SaveTransactionPayload Res ===>",profileid,res.data) 
            if(res.data){
                let countryInfo = store.getState().countryReducer.countryList.length>0 ? store.getState().countryReducer.countryList : [];
                let updatedList = _.filter(countryInfo, function(item) { return item.value !== profileid; });
                console.log('updatedList55', updatedList)
                dispatch({ type: DELETE_COUNTRY_SUCCESS,payload:updatedList});
                callback(res.data)
            }
            
           
        })
        .catch(err=>{
            console.log("SaveTransactionPayload Error ===>",err)
            dispatch({ type: DELETE_COUNTRY_FAIL });
            callback()
            //CustomException(err)
        })
    }
}

export const UpdateCountryAction = (profileid, payload={},callback=()=>{})=>{
    return async(dispatch)=>{
        dispatch({ type: UPDATE_COUNTRY_REQUEST });
        axios.put(`${BASE_URL}/location/update/country/${profileid}`, payload)
        .then(res=>{
            console.log("SaveTransactionPayload Res ===>",profileid,payload,res.data) 
            if(res.data){
                let countryInfo = store.getState().countryReducer.countryList.length>0 ? store.getState().countryReducer.countryList : [];
                let updatedList = _.filter(countryInfo, function(item) { return item.value !== profileid; });
                console.log('updatedList55', updatedList)
                dispatch({ type: UPDATE_COUNTRY_SUCCESS,payload:[{value:res.data.data.id,label:res.data.data.name},...updatedList]});
                callback(res.data)
            }
            
        })
        .catch(err=>{
            console.log("SaveTransactionPayload Error ===>",err)
            dispatch({ type: UPDATE_COUNTRY_FAIL });
            callback()
            //CustomException(err)
        })
    }
}




export const AddCountryAction = (payload,callback=()=>{})=>{
   
    return async(dispatch)=>{
        dispatch({ type: ADD_COUNTRY_REQUEST });
        axios.post(`${BASE_URL}/location/create/country`, payload)
        .then(res=>{
            console.log("location/create/country Res ===>",res.data) 
            if(res.data)
              dispatch({ type: ADD_COUNTRY_SUCCESS,payload :[{value:res.data.data.id,label:res.data.data.name}] });

            callback(res.data)  
        })
        .catch(err=>{
            console.log("location/create/country Error ===>",err)
            dispatch({ type: ADD_COUNTRY_FAIL });
            callback()  
            //CustomException(err)
        })
    }
}

export const  GetCountryAction = ()=>{
    return async(dispatch)=>{
        dispatch({ type: GET_COUNTRY_REQUEST });
        axios.get(`${BASE_URL}/location/countries`)
        .then(res=>{
            console.log("SaveTransactionPayload Res ===>",res.data) 
            if(res.data)
            
            dispatch({ type: GET_COUNTRY_SUCCESS,payload : res.data.data });
        })
        .catch(err=>{
            console.log("SaveTransactionPayload Error ===>",err)
            dispatch({ type: GET_COUNTRY_FAIL });
            //CustomException(err)
        })
    }
}

//get====> location/countries  ,location/create/country    location/update/country/3  location/delete/country/6
import axios from "axios";
import { ADD_CATEGORY_REQUEST,ADD_CATEGORY_FAIL,ADD_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,GET_CATEGORY_SUCCESS,GET_CATEGORY_REQUEST,
    UPDATE_CATEGORY_FAIL,UPDATE_CATEGORY_SUCCESS,UPDATE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,DELETE_CATEGORY_FAIL,DELETE_CATEGORY_REQUEST
} from "../types";
import {BASE_URL} from "../../config"


export const DeleteCategory = (profileid)=>{
    return async(dispatch)=>{
        dispatch({ type:DELETE_CATEGORY_REQUEST });
        axios.delete(`${BASE_URL}/category/delete/${profileid}`)
        .then(res=>{
            console.log("SaveTransactionPayload Res ===>",profileid,res.data) 
            if(res.data)
            dispatch({ type: DELETE_CATEGORY_SUCCESS});
        })
        .catch(err=>{
            console.log("SaveTransactionPayload Error ===>",err)
            dispatch({ type: DELETE_CATEGORY_FAIL });
            //CustomException(err)
        })
    }
}

export const UpdateCategory = (profileid, payload={})=>{
    return async(dispatch)=>{
        dispatch({ type: UPDATE_CATEGORY_REQUEST });
        axios.put(`${BASE_URL}/category/update/${profileid}`, payload)
        .then(res=>{
            console.log("SaveTransactionPayload Res ===>",profileid,payload,res.data) 
            if(res.data)
            dispatch({ type: UPDATE_CATEGORY_SUCCESS});
        })
        .catch(err=>{
            console.log("SaveTransactionPayload Error ===>",err)
            dispatch({ type: UPDATE_CATEGORY_FAIL });
            //CustomException(err)
        })
    }
}





export const AddCategory = (payload)=>{
    const dumdata={
       
            "id": 17,
            "name": "test",
            "profileImage": null,
            "gender": null,
            "socialMedia": null,
            "email": "carchana2007@gmail.com",
            "password": "$2b$10$SoW8PS/WkvLpvtt1Vcqs4.FqWxjvj3I9XFfcZ8RGIQ6Mk/RRkElTW",
            "googleId": null,
            "facebookId": null,
            "appleId": null,
            "city": null,
            "otp": 8583,
            "country": null,
            "status": true,
            "emailVerified": "2022-12-10T08:39:37.203Z",
            "createdAt": "2022-12-10T08:31:13.806Z",
            "updatedAt": "2022-12-10T08:31:13.806Z",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNywiZW1haWwiOiJjYXJjaGFuYTIwMDdAZ21haWwuY29tIiwiaWF0IjoxNjcwNjYxNTkyLCJleHAiOjE2NzA2Njg3OTJ9.RcNPHZeM5yoFesTkibtFaiU9SYei5XYDSB6_tI5h7Yc"
        
    }
    const headers = {
        // 'Content-Type': 'application/json',
        // 'Token': 'Bearer '+dumdata.token
        'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNywiZW1haWwiOiJjYXJjaGFuYTIwMDdAZ21haWwuY29tIiwiaWF0IjoxNjcwNjY1OTM0LCJleHAiOjE2NzA2NzMxMzR9.PsUZKETFv59CvMBk9NGahLHUMjSGsC374V_MtE1jc5s'
      }
    //   const payload={
    //     "name": "event1",
    //     "status": "false",
    //     "is_sub_category": false
    // }
    return async(dispatch)=>{
        dispatch({ type: ADD_CATEGORY_REQUEST });
        axios.post(`${BASE_URL}/category/create`, payload)
        .then(res=>{
            console.log("/category/create Res ===>",res.data) 
            if(res.data)
            
            dispatch({ type: ADD_CATEGORY_SUCCESS });
        })
        .catch(err=>{
            console.log("/category/create Error ===>",err)
            dispatch({ type: ADD_CATEGORY_FAIL });
            //CustomException(err)
        })
    }
}

export const  GetCategory   = ()=>{
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


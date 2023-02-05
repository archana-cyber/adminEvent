import axios from "axios";
import store from "./js/store/store"


export const BASE_URL = process.env.REACT_APP_BASE_URL;


axios.interceptors.request.use(
    config => {
        if(localStorage.getItem('authData')){
            const data=JSON.parse(atob( localStorage.getItem( "authData")))
            // console.log('configData',data)
          config.headers['token'] = data.token;
        } 
          return config;
      },
      error => {
          return Promise.reject(error);
      }
  );

  axios.interceptors.response.use((response) => {
    if((response.data.status == 500) && response.data.message=='Token expired') {
        //  alert("You are not authorized");
         localStorage.removeItem('authData');
         console.log('Token expired')
         const redirectLink=window.location.origin+'/login'
         window.location.href=redirectLink
    }
    console.log('Token expired 1',response,localStorage.getItem('authData'))
  
    return response;
}, (error) => {
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});
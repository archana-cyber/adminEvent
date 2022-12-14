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
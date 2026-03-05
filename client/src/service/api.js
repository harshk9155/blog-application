import axios from 'axios';

import { API_NOTIFICATION_MESSAGES } from '../constants/config';

import { SERVICE_URLS } from '../constants/config';


const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL : API_URL,
    timeout:1000,
    headers: {
        'content-Type' : 'application/json'    }
})

axiosInstance.interceptors.request.use(
    function(config){
        return config;

    }, 
    function(error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function(response){
        // stop global loader here
        return processresponse(response);
    },

    function(error){
        // stop global leader here
        return Promise.reject(processError(error));
    }
)
    
//////////////////////////
// if success -> return {is Success: true, data: object}
// if error -> return {is Success: false, status: string,msg: string, code: int}
///////////////////////////

const processresponse = (response) => {
    if(response?.status === 200){
        return {issuccess: true, data: response.data}


    }
    else{
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

const processError = (error) => {
    if(error.response){
        // request made and server responded with a status code
        //that falls out of the range of 2xx
        console.log('error response', error.toJSON());
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    }
    else if(error.request){
        // request made  but no response was received
         console.log('error in request', error.toJSON());
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    }
    else if(error.message){
          console.log('error in network', error.toJSON());
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }

    }
}

const API = {};

for(const[key, value] of Object.entries(SERVICE_URLS)){
    API[key] = (body, showUploadProgress, showDownloadProgress) => 
        axiosInstance({
            method: value.method,
            url: value.URL,
            data: body,
            responseType: value.responseType,
            onUploadProgress: function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted = Math.round(progressEvent.loaded*100 / progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function(progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted = Math.round(progressEvent.loaded*100 / progressEvent.total);
                    showDownloadProgress(percentageCompleted);
                }
            },

        })
    }

    
export { API };
import axios from 'axios';
import { API_NOTIFICATION_MESSAGES } from '../constants/config';
import { SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-util';

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    function(config) {
        if (config.TYPE.params) {
            config.params = config.TYPE.params;
        } else if (config.TYPE.query) {
            // FIX: append id to URL
            config.url = config.url + config.TYPE.query;
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function(response) {
        return processresponse(response);
    },
    function(error) {
        return Promise.resolve(processError(error));
    }
);

const processresponse = (response) => {
    if (response?.status >= 200 && response?.status < 300) {
        return { issuccess: true, data: response.data };
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        };
    }
};

const processError = (error) => {
    if (error.response) {
        console.log('error response', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure.message,
            code: error.response.status
        };
    } else if (error.request) {
        console.log('error in request', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure.message,
            code: ""
        };
    } else if (error.message) {
        console.log('error in network', error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError.message,
            code: ""
        };
    }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
           data: (value.method === 'GET' || value.method === 'DELETE') ? undefined : body,  // don't send body on GET or DELETE
            responseType: value.responseType,
            headers: body instanceof FormData
                ? { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${getAccessToken()}` }
                : { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getAccessToken()}` },
            TYPE: getType(value, body),

            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round(
                        progressEvent.loaded * 100 / progressEvent.total
                    );
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round(
                        progressEvent.loaded * 100 / progressEvent.total
                    );
                    showDownloadProgress(percentageCompleted);
                }
            },
        });
}

export { API };
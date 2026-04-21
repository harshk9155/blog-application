
export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: 'loading...',
        message: 'Data is being loaded, please wait'
    },
    success: {
        title: 'success',
        message: 'Data loaded successfully'
    
    },
    responseFailure: {
        title: 'Error',
        message: 'An error occured while receiving data, please try again later'

    },
    requestFailure: {
        title: 'Error',
        message: 'An error occured while sending data, please try again later'
    },
    networkError: {
        title: 'Error',
        message: 'Network error, please check your internet connection'
    }


    }
    // API service calls
    //sample request
    //need service call{ URL : '/signup', method: 'POST', 'GET', 'PUT', 'DELETE', params: {}, query: true/false}
    export const SERVICE_URLS = {
        userSignup: {
        url: '/api/signup',
        method: 'POST'
    },
        userLogin: {
             url: '/api/login',
            method: 'POST'
        },

        uploadFile: {
            url: '/api/uploadFile',
            method: 'POST'
        }
    }
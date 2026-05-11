export const API_NOTIFICATION_MESSAGES = {
    loading: { title: 'loading...', message: 'Data is being loaded, please wait' },
    success: { title: 'success', message: 'Data loaded successfully' },
    responseFailure: { title: 'Error', message: 'An error occured while receiving data, please try again later' },
    requestFailure: { title: 'Error', message: 'An error occured while sending data, please try again later' },
    networkError: { title: 'Error', message: 'Network error, please check your internet connection' }
};

export const SERVICE_URLS = {
    userSignup:     { url: '/api/signup',        method: 'POST' },
    userLogin:      { url: '/api/login',          method: 'POST' },
    uploadFile:     { url: '/api/file/upload',    method: 'POST' },
    createPost:     { url: '/api/posts/create',   method: 'POST' },
    getAllpost:      { url: '/api/posts',          method: 'GET',    params: true },
    getPostById:    { url: '/api/posts/',          method: 'GET',    query: true },
    updatePost:     { url: '/api/posts/',          method: 'PUT',    query: true },
    deletePost:     { url: '/api/posts/',          method: 'DELETE', query: true },
    newComment:     { url: '/api/comments/new',   method: 'POST' },
    getAllComments:  { url: '/api/comments',       method: 'GET',    params: true },
    deleteComment:  { url: '/api/comments/',       method: 'DELETE', query: true }
};
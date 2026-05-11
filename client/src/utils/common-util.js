export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
};

export const addElipse = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
};

export const getType = (value, body) => {
    if (value.params) return { params: body };
    if (value.query) return { query: typeof body === 'object' ? body._id : body };
    return {};
};

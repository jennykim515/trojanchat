export const __DEV__ = process.env.NODE_ENV === 'development';
const apiUrl = __DEV__
    ? 'https://trojanchat.wl.r.appspot.com/api'
    : 'https://trojanchat.wl.r.appspot.com/api'

const constructUrl = (path, params) => {
    let url = `${apiUrl}${path.startsWith('/') ? path : `/${path}`
        }`;

    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            if (url.includes('?')) {
                url += `&${key}=${value}`;
            }
            else {
                url += `?${key}=${value}`;
            }
        }
    });
    return url;
}

const processResponse = async (response) => {
    let returnData = {};
    if (response.ok) {
        returnData = await response.json();
    } else {
        returnData = {
            error: response.statusText,
        };
    }
    returnData.status = response.status;
    return returnData;
};

export const internal_apiGet = async (
    path,
    userId = '',
    uid = '',
    options = {}
) => {
    try {
        const url = constructUrl(path, { userId, uid });
        const response = await fetch(url, {
            ...options,
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return await processResponse(response);
    } catch (error) {
        return {
            error: 'Connection error',
            status: 500,
        };
    }
};

export const internal_apiPost = async (
    path,
    body,
    userId = '',
    uid = '',
    options = {}
) => {
    try {
        const url = constructUrl(path, { userId, uid });
        const response = await fetch(url, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return await processResponse(response);
    } catch (error) {
        return {
            error: 'Connection error',
            status: 500,
        };
    }
};

export const internal_apiPut = async (
    path,
    body,
    userId = '',
    uid = '',
    options = {}
) => {
    try {
        const url = constructUrl(path, { userId, uid });
        const response = await fetch(url, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return await processResponse(response);
    } catch (error) {
        return {
            error: 'Connection error',
            status: 500,
        };
    }
};
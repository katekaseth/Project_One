import axios from 'axios';

import { API, SESSION } from '../stringConstants';

export const bookmarkEndpoint = documentId => {
    return axios({
        method: 'post',
        url: API.URL + API.BOOKMARK + '/' + documentId,
        headers: {
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem(SESSION.SESSION_ID),
        },
    });
};

export const unbookmarkEndpoint = documentId => {
    return axios({
        method: 'delete',
        url: API.URL + API.BOOKMARK + '/' + documentId,
        headers: {
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem(SESSION.SESSION_ID),
        },
    });
};

export const getBookmarksEndpoint = () => {
    return axios({
        method: 'get',
        url: API.URL + API.BOOKMARK,
        headers: {
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem(SESSION.SESSION_ID),
        },
    });
};

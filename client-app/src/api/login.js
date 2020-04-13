import axios from 'axios';

import { API, SESSION } from '../stringConstants';

export const loginApi = (username, password) => {
    return axios({
        method: 'post',
        url: API.URL + API.LOGIN,
        data: {
            userName: username,
            password: password,
        },
        headers: { 'Content-Type': 'application/json' },
    });
};

export const ping = () => {
    return axios({
        method: 'get',
        url: API.URL + API.PING + '/',
        headers: {
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem(SESSION.SESSION_ID),
        },
    });
};

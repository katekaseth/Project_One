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

export const signOutApi = () => {
    return axios({
        method: 'delete',
        url: API.URL + API.SIGN_OUT,
        headers: {
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem(SESSION.SESSION_ID),
        },
    });
};

export const createAccountApi = (username, password, passwordConf) => {
    return axios({
        method: 'post',
        url: API.URL + API.CREATE_ACCOUNT,
        data: {
            userName: username,
            password: password,
            passwordConf: passwordConf,
        },
        headers: { 'Content-Type': 'application/json' },
    });
};

export const pingApi = () => {
    return axios({
        method: 'get',
        url: API.URL + API.PING + '/',
        headers: {
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem(SESSION.SESSION_ID),
        },
    });
};

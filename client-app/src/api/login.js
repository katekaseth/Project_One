import axios from 'axios';

import { API } from '../stringConstants';

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

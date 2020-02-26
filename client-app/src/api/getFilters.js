import axios from 'axios';

import { API } from '../stringConstants';

export const getFiltersApi = () => {
    return axios({
        method: 'get',
        url: API.URL + API.FILTER,
        headers: {
            'Content-Type': 'application/json',
            'authorization': sessionStorage.getItem('sessionId')
        }
    });
}
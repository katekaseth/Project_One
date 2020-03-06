import axios from 'axios';

import { API, SESSION } from '../stringConstants';

export const getFiltersApi = () => {
    return axios({
        method: 'get',
        url: API.URL + API.FILTER,
        headers: {
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem(SESSION.SESSION_ID),
        },
    });
};

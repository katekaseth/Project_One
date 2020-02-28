import axios from 'axios';

import { API, SESSION } from '../stringConstants';

export const getResultEndpoint = (resultId) => {
    return axios({
        method: 'get',
        url: API.URL + API.DOCUMENTS + '/' + resultId,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem(SESSION.SESSION_ID)
        }
    });
}
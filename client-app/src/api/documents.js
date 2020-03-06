import axios from 'axios';

import { API, SESSION } from '../stringConstants';

export const getResultEndpoint = documentId => {
    return axios({
        method: 'get',
        url: API.URL + API.DOCUMENTS + '/' + documentId,
        headers: {
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem(SESSION.SESSION_ID),
        },
    });
};

import axios from 'axios';

import { API, SESSION } from '../stringConstants';

export const getRecentsEndpoint = (recentDocumentIds) => {
    return axios({
        method: 'post',
        url: API.URL + API.DOCUMENTS,
        data: {
            documentIDs: JSON.parse(recentDocumentIds),
        },
        headers: {
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem(SESSION.SESSION_ID),
        },
    });
};

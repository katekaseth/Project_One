import axios from 'axios';

import { API, SESSION } from '../stringConstants';

export const searchEndpoint = (filterState, searchedTerms) => {
    let body = {};
    console.log('/search');
    Object.keys(filterState).forEach(categoryKey => {
        body[categoryKey] = [];
        Object.keys(filterState[categoryKey]).forEach(filterKey => {
            if (filterState[categoryKey][filterKey]) {
                body[categoryKey].push(filterKey);
            }
        });
    });
    body.searchedTerms = searchedTerms;

    return axios({
        method: 'post',
        url: API.URL + API.SEARCH,
        data: body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem(SESSION.SESSION_ID)
        }
    });
};

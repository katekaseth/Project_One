import axios from 'axios';

import { API } from '../stringConstants';

export const loginApi = (username, password, setPage) => {
    axios({
        method: 'post',
        url: API.URL + API.LOGIN,
        data: {
            userName: username,
            password: password
        },
        headers: {'Content-Type': 'application/json' }
    })
    .then(function (response) {
        sessionStorage.setItem('sessionId', response.headers.authorization);
        setPage.home();
    })
    .catch(function (err) {
        console.log(err);
    });
}